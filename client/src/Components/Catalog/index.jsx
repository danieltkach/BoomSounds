import React, { useState, useEffect } from 'react';
import styles from './Catalog.module.css';
import ProductCard from '../ProductCard/ProductCard.component';
import { connect } from 'react-redux';
import { fetch_prod, filterProds } from '../../redux/products/actions.js';
import { fetch_cat } from '../../redux/categories/actions';
import { getLibraryProducts } from './../../redux/cart/actions';

const Catalog = ({
  userId,
  fetch_prod,
  prods,
  fetch_cat,
  cats,
  libraryProducts,
  getLibraryProducts,
}) => {
  // Filtering
  const [searchFilter, setSearchFilter] = useState('');
  const [searchBy, setSearchBy] = useState('');
  let library = [];
  let sinDuplicar = [];

  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };
  const handleSearchBy = (e) => {
    setSearchBy(e.target.value);
  };

  function findByCategory(category) {
    let foundByCategory = [];
    prods.forEach((p) => {
      p.categories.forEach((c) => {
        if (c.name.includes(category)) foundByCategory.push(p);
      });
    });
    return foundByCategory;
  }

  let filtered = findByCategory(searchBy).filter((p) =>
    p.name.includes(searchFilter)
  );

  let uniqueList = new Set(filtered);
  filtered = [...uniqueList];

  useEffect(() => {
    fetch_prod();
    fetch_cat();
    getLibraryProducts(userId);
  }, []);

  return (
    <div className={styles.catalog_container}>
      <div className={styles.search_container}>
        <input
          onChange={handleFilterChange}
          className={styles.searchbox_input}
          value={searchFilter}
          placeholder="Nombre de producto..."
        />
        <select
          className={styles.categoryFilter}
          onChange={handleSearchBy}
          value={searchBy}
        >
          <option value="">Todos</option>
          {cats?.length ? (
            cats.map((category) => {
              return <option value={category.name}>{category.name}</option>;
            })
          ) : (
            <option>No hay categorías...</option>
          )}
        </select>
      </div>

      <div className={styles.product_cards_container}>
        {prods?.length ? (
          <div className={styles.songs_list}>
            {filtered.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        ) : (
          <div>
            <h1>No hay productos.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.users.userID,
    prods: state.products.products,
    cats: state.categories.categories,
    user: state.users,
    libraryProducts: state.productCart.libraryProducts,
  };
};

export default connect(mapStateToProps, {
  fetch_prod,
  filterProds,
  fetch_cat,
  getLibraryProducts,
})(Catalog);
