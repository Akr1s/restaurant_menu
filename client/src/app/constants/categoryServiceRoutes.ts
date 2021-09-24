import baseUrl from './baseUrl';

const categoryServiceRoutes = {
  getAllCategories: baseUrl + 'categories',
  getPrimaryCategories: baseUrl + 'categories/primary',
  getNonPrimaryCategories: baseUrl + 'categories/nonprimary',
  getCategoryById: baseUrl + 'categories/',
  updateCategory: baseUrl + 'categories/',
  addCategory: baseUrl + 'categories/add',
  deleteCategory: baseUrl + 'categories/',
};

export default categoryServiceRoutes;
