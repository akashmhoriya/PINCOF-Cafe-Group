import axios from 'axios';
import { FALLBACK_MENU } from '../data/fallbackMenu';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import { FALLBACK_PRODUCTS } from '../data/fallbackProducts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ============================================================
   PINCOF BRANDS API
   ============================================================ */

export const getBrands = async (params = {}) => {
  try {
    const response = await apiClient.get('/brands', { params });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetch for brands failed, falling back to local dataset:', error.message);
    }
    let brands = [...FALLBACK_BRANDS];
    if (params.category && params.category !== 'All') {
      brands = brands.filter(
        (b) => b.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    if (params.featured !== undefined) {
      brands = brands.filter((b) => b.featured === (params.featured === true || params.featured === 'true'));
    }
    return brands;
  }
};

export const getBrandBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/brands/${slug}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for brand ${slug} failed, checking fallback:`, error.message);
    }
    return FALLBACK_BRANDS.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
};

export const getFeaturedBrands = async () => {
  try {
    const response = await apiClient.get('/brands/featured');
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetch for featured brands failed:', error.message);
    }
    return FALLBACK_BRANDS.filter((b) => b.featured);
  }
};

export const getBrandsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/brands/category/${category}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for brand category ${category} failed:`, error.message);
    }
    if (!category || category.toLowerCase() === 'all') return FALLBACK_BRANDS;
    return FALLBACK_BRANDS.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
  }
};

/* ============================================================
   FRANCHISE PARTNERSHIP API
   ============================================================ */

export const submitFranchiseApplication = async (formData) => {
  try {
    const response = await apiClient.post('/franchise', formData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to submit your franchise application. Please try again.';
    throw new Error(errorMessage);
  }
};

/* ============================================================
   MENU ITEMS API (Preserved for Brand-Specific Menus)
   ============================================================ */

export const getMenuItems = async (params = {}) => {
  try {
    const response = await apiClient.get('/menu', { params });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetch failed, falling back to local dataset:', error.message);
    }
    let items = [...FALLBACK_MENU];
    if (params.category && params.category !== 'All') {
      items = items.filter(
        (i) => i.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    if (params.featured !== undefined) {
      items = items.filter((i) => i.featured === (params.featured === true || params.featured === 'true'));
    }
    return items;
  }
};

export const getMenuItem = async (id) => {
  try {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for menu item ${id} failed:`, error.message);
    }
    return FALLBACK_MENU.find((i) => i._id === id) || null;
  }
};

export const getMenuItemsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/menu/category/${category}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for category ${category} failed:`, error.message);
    }
    if (category === 'All') return FALLBACK_MENU;
    return FALLBACK_MENU.filter(
      (i) => i.category.toLowerCase() === category.toLowerCase()
    );
  }
};

/* ============================================================
   PINCOF PRODUCT OFFERING API
   ============================================================ */

export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetch for products failed, falling back to local dataset:', error.message);
    }
    let products = [...FALLBACK_PRODUCTS];
    if (params.category && params.category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    if (params.featured !== undefined) {
      products = products.filter((p) => p.featured === (params.featured === true || params.featured === 'true'));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q))
      );
    }
    return products;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/products/${slug}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for product ${slug} failed:`, error.message);
    }
    return FALLBACK_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await apiClient.get('/products/featured');
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetch for featured products failed:', error.message);
    }
    return FALLBACK_PRODUCTS.filter((p) => p.featured);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetch for product category ${category} failed:`, error.message);
    }
    if (!category || category === 'All') return FALLBACK_PRODUCTS;
    return FALLBACK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
};

/* ============================================================
   CORPORATE CONTACT API
   ============================================================ */

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to submit your message. Please try again.';
    throw new Error(errorMessage);
  }
};

export default apiClient;
