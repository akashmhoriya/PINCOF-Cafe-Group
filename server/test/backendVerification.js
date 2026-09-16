const http = require('http');

const BASE_URL = 'http://localhost:5000';

const makeRequest = (path, method = 'GET', body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
};

async function runTests() {
  console.log('====================================================');
  console.log('🧪 PINCOF CAFÉ GROUP BACKEND FULL VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${details ? `(${details})` : ''}`);
      failed++;
    }
  };

  try {
    // 1. Health Check
    console.log('1. Health Check Endpoint');
    const health = await makeRequest('/api/health');
    assert(health.status === 200, 'Health endpoint status 200', `Got ${health.status}`);
    assert(health.body.status === 'online', 'Health body reports online status');
    assert(health.body.service.includes('PINCOF'), 'Service name identifies PINCOF');

    // 2. Menu API - GET all
    console.log('\n2. Menu API — GET /api/menu');
    const menuAll = await makeRequest('/api/menu');
    assert(menuAll.status === 200, 'Menu GET status 200', `Got ${menuAll.status}`);
    assert(menuAll.body.success === true, 'Menu GET success is true');
    assert(Array.isArray(menuAll.body.data), 'Menu data is an array');
    assert(menuAll.body.count >= 20, `Menu count >= 20 (Got ${menuAll.body.count})`);

    const firstItem = menuAll.body.data[0];
    const sampleId = firstItem._id;

    // 3. Menu API - Category Filter
    console.log('\n3. Menu API — Category Filtering');
    const coffeeOnly = await makeRequest('/api/menu?category=Coffee');
    assert(coffeeOnly.status === 200, 'Category Coffee status 200');
    assert(coffeeOnly.body.count > 0, 'Category Coffee returns items');
    assert(coffeeOnly.body.data.every(i => i.category.toLowerCase() === 'coffee'), 'All items have category Coffee');

    // 4. PINCOF Brands API — GET /api/brands
    console.log('\n4. Brands API — Portfolio Listing & Filtering');
    const brandsAll = await makeRequest('/api/brands');
    assert(brandsAll.status === 200, 'Brands GET status 200', `Got ${brandsAll.status}`);
    assert(brandsAll.body.success === true, 'Brands GET success is true');
    assert(Array.isArray(brandsAll.body.data), 'Brands data is an array');
    assert(brandsAll.body.count >= 5, `Brands count >= 5 (Got ${brandsAll.body.count})`);

    // 5. Brands API — Featured & By Slug
    console.log('\n5. Brands API — Featured & Slug Lookups');
    const featuredBrands = await makeRequest('/api/brands/featured');
    assert(featuredBrands.status === 200, 'Featured brands status 200');
    assert(featuredBrands.body.count > 0, 'Featured brands returned');
    assert(featuredBrands.body.data.every(b => b.featured === true), 'All returned brands are marked featured');

    const aurelia = await makeRequest('/api/brands/aurelia-slow-bar');
    assert(aurelia.status === 200, 'Fetch brand by slug "aurelia-slow-bar" returns 200');
    assert(aurelia.body.data.name.includes('Aurelia'), 'Brand name is Aurelia Slow Bar & Roastery');
    assert(aurelia.body.data.locations.length >= 3, 'Aurelia has 3+ flagship locations');

    const nonExistentBrand = await makeRequest('/api/brands/non-existent-concept-slug');
    assert(nonExistentBrand.status === 404, 'Non-existent brand slug returns 404', `Got ${nonExistentBrand.status}`);

    const specialtyCat = await makeRequest('/api/brands/category/Specialty%20Coffee');
    assert(specialtyCat.status === 200, 'Brands category filter status 200');
    assert(specialtyCat.body.count > 0, 'Found specialty coffee brands');

    // 6. Franchise API — Submissions & Validation
    console.log('\n6. Franchise API — Operator Application Submission');
    const validApp = await makeRequest('/api/franchise', 'POST', {
      name: 'Alexander Wright',
      email: 'alex.wright@capitalhospitality.com',
      phone: '+1 415-888-2910',
      city: 'Vancouver',
      country: 'Canada',
      investmentRange: '$600,000 — $1,200,000',
      preferredBrand: 'Aurelia Slow Bar & Roastery',
      message: 'Interested in developing 2 flagship slow bars in downtown Vancouver.',
    });
    assert(validApp.status === 201, 'Franchise application returns 201 Created', `Got ${validApp.status}`);
    assert(validApp.body.success === true, 'Franchise response success is true');
    assert(validApp.body.data._id !== undefined, 'Application saved with MongoDB _id');

    const missingAppFields = await makeRequest('/api/franchise', 'POST', {
      name: 'Missing Info Person',
    });
    assert(missingAppFields.status === 400, 'Missing fields in franchise returns 400 Bad Request');

    const franchiseList = await makeRequest('/api/franchise');
    assert(franchiseList.status === 200, 'Franchise audit GET returns 200 OK');
    assert(franchiseList.body.count > 0, `Franchise applications stored > 0 (Got ${franchiseList.body.count})`);

    // 7. Contact API - Form Submissions & Audit
    console.log('\n7. Contact API — Corporate Inquiries');
    const validContact = await makeRequest('/api/contact', 'POST', {
      name: 'Elena Rostova',
      email: 'elena@archdigest.com',
      phone: '+1 415-555-8822',
      subject: 'Press & Corporate Relations',
      message: 'Requesting an architectural interview regarding the Kanso and Aurelia designs.',
    });
    assert(validContact.status === 201, 'Valid contact submission returns 201 Created', `Got ${validContact.status}`);
    assert(validContact.body.success === true, 'Contact response success is true');

    // 8. Products API — Portfolio Product Offering
    console.log('\n8. Products API — Portfolio Product Offering');
    const productsAll = await makeRequest('/api/products');
    assert(productsAll.status === 200, 'Products GET status 200', `Got ${productsAll.status}`);
    assert(productsAll.body.success === true, 'Products GET success is true');
    assert(Array.isArray(productsAll.body.data), 'Products data is an array');
    assert(productsAll.body.count >= 20, `Products count >= 20 (Got ${productsAll.body.count})`);

    const featuredProducts = await makeRequest('/api/products/featured');
    assert(featuredProducts.status === 200, 'Featured products GET status 200');
    assert(featuredProducts.body.count > 0, 'Featured products returned > 0');
    assert(featuredProducts.body.data.every(p => p.featured === true), 'All returned products are featured');

    const coffeeProducts = await makeRequest('/api/products/category/Coffee');
    assert(coffeeProducts.status === 200, 'Category Coffee products status 200');
    assert(coffeeProducts.body.count > 0, 'Found coffee products');
    assert(coffeeProducts.body.data.every(p => p.category.toLowerCase() === 'coffee'), 'All items category is Coffee');

    const geshaProduct = await makeRequest('/api/products/artisan-gesha-pour-over');
    assert(geshaProduct.status === 200, 'Fetch product by slug "artisan-gesha-pour-over" returns 200');
    assert(geshaProduct.body.data.name === 'Artisan Gesha Pour-Over', 'Product name matches Artisan Gesha Pour-Over');
    assert(geshaProduct.body.data.brandNames.length >= 2, 'Product associated with 2+ PINCOF brands');

    const nonExistentProduct = await makeRequest('/api/products/non-existent-pastry-slug');
    assert(nonExistentProduct.status === 404, 'Non-existent product slug returns 404', `Got ${nonExistentProduct.status}`);

    // 9. Global 404 & Middleware Tests
    console.log('\n9. Global 404 & Middleware Tests');
    const notFoundRes = await makeRequest('/api/nonexistent-endpoint-test');
    assert(notFoundRes.status === 404, 'Nonexistent API endpoint returns 404', `Got ${notFoundRes.status}`);

    console.log('\n====================================================');
    console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');

    process.exit(failed === 0 ? 0 : 1);
  } catch (err) {
    console.error('Test runner caught unexpected error:', err);
    process.exit(1);
  }
}

runTests();
