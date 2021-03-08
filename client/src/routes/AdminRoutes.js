import React from 'react';
import { Route } from 'react-router-dom';
import AdminPanel from './../Admin/AdminPanel/index';
import CategoriesForm from './../Forms/AddCategory/index';
import ProductForm from './../Forms/AddProduct/index';
import ProtectedRoute from "../Components/ProtectedRoute/protectedRoute"


const AdminRoutes = () => {
	return (
		<>
			<Route path="/admin" component={props => <ProtectedRoute {...props} Component={AdminPanel} />} />
		</>
	)
}

export default AdminRoutes;