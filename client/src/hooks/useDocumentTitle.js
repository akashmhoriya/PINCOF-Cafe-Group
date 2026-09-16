import { useEffect } from 'react';

export const useDocumentTitle = (title, description) => {
  useEffect(() => {
    const baseTitle = 'AURELIA Specialty Coffee & Slow Bar';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
  }, [title, description]);
};

export default useDocumentTitle;
