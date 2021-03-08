import React from 'react';
import SideBar from './../Sidebar/index';
import './styles.css';
import { Route } from 'react-router-dom';
import CategoriesForm from './../../Forms/AddCategory/index';
import ProductsList from '../ProductsList/ProductsList.component';
import UsersList from '../UsersList/UsersList.component';
import AddProduct from './../AddProduct/AddProduct.component';
import Dashboard from '../Dashboard/Dashboard.component';
import Orders from '../Orders/Orders.component';
import Settings from './../Settings/Settings.component';
import Find from '../../Forms/AddProduct/FindProductByCategory';
import Status from '../../Components/ShopCart/orders';

const AdminPanel = () => {
  return (
    <>
      <div className="admin-container">
        <div>
          <SideBar />
        </div>

        <div className="data-screen">
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/categories">
            <div className="categories-form">
              <CategoriesForm />
            </div>
            <Find />
          </Route>
          <Route path="/admin/products">
            <ProductsList />
          </Route>
          <Route path="/admin/orders">
            <Status />
          </Route>
          <Route path="/admin/new-product">
            <AddProduct />
          </Route>
          <Route path="/admin/users">
            <UsersList />
          </Route>
        </div>
        <Route path="/admin/orders">
          <Orders />
        </Route>
        <Route path="/admin/settings">
          <Settings />
        </Route>
      </div>
    </>
  );
};

export default AdminPanel;
