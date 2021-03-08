import React from 'react';
import { Route } from "react-router-dom";
import Catalog from "../Components/Catalog";
import Categories from "../Components/Categories";
import LogIn from "../Forms/LogIn";
import Home from "../Components/Home";
import ShopCart from '../Components/ShopCart';
import Find from "../Forms/AddProduct/FindProductByCategory"
import ProductDetailPage from './../Pages/ProductDetailPage/ProductDetail.page';
import ResetPassword from "../Forms/ResetPassword";
import MyLibrary from './../Components/MyLibrary/MyLibrary';
import UserProfile from '../Components/UserProfile/UserProfile.component';
import UserResetPass from '../Components/UserResetPass/UserResetPass.component';
import InfoMusician from '../Pages/InfoMusician/InfoMusician.component';

const VisitorRoutes = () => {
	return (
		<>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/catalog">
				<Catalog />
			</Route>
			<Route path="/categories">
				<Categories />
			</Route>
			<Route path="/login">
				<LogIn></LogIn>
			</Route>
			<Route path="/shopCart">
				<ShopCart />
			</Route>
			<Route
				path="/products/:id"
				render={({ match }) => <ProductDetailPage productId={match.params.id} />}
			/>
			<Route path="/filtrarporcategoria">
				<Find />
			</Route>
			<Route path='/my-library'>
				<MyLibrary />
			</Route>
			<Route path="/forgot">
				<ResetPassword />
			</Route>
			<Route path='/user-profile'>
				<UserProfile />
			</Route>
			<Route path='/users/reset'>
				<UserResetPass />
			</Route>
			<Route path='/info-musician'>
				<InfoMusician />
			</Route>
		</>
	)
}

export default VisitorRoutes;