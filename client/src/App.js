// react
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// routes
import VisitorRoutes from './routes/VisitorRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';

// components
import NavBar from './Components/NavBar';
import './App.css';
import PlayPreview from './Admin/PlayPreview/PlayPreview.component';
// redux
import { connect } from 'react-redux';
import { fetch_prod } from './redux/products/actions';
import { fetch_cat } from './redux/categories/actions';
import {
  fetch_users,
  setUser,
  setUserShopcart,
  setUserRole,
  fetch_user
} from './redux/users/actions';
import { getLibraryProducts } from './redux/cart/actions'

//Firebase
import { useUser } from 'reactfire';

function App({
  fetch_prod,
  fetch_users,
  fetch_cat,
  setUser,
  setUserShopcart,
  setUserRole,
  getLibraryProducts,
  fetch_user
}) {
  const user = useUser();


  useEffect(() => {
    fetch_prod();
    fetch_cat();
    fetch_users();
    
  }, []);

  useEffect(() => {
    if (user?.data) {
      setUser(user.data.uid);
      setUserShopcart(user.data.uid);
      setUserRole(user.data.uid);
      getLibraryProducts(user.data.uid)
      fetch_user(user.data.uid)

    }
  }, [user]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <PlayPreview></PlayPreview>
      <Switch>
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/" component={VisitorRoutes} />
      </Switch>
    </div>
  );
}

export default connect(null, {
  fetch_cat,
  fetch_prod,
  fetch_users,
  setUser,
  setUserShopcart,
  setUserRole,

  getLibraryProducts,
  fetch_user
})(App);
