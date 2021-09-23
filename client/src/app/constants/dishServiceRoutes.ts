import baseUrl from './baseUrl';

const dishServiceRoutes = {
  getDishesByCategoryId: baseUrl + 'dishes/select/',
  getAllDishes: baseUrl + 'dishes',
  updateDish: baseUrl + 'dishes/',
  addDish: baseUrl + 'dishes/add',
  deleteDish: baseUrl + 'dishes/',
};

export default dishServiceRoutes;
