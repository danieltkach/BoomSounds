import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import { connect } from 'react-redux';
import { fetch_cat } from '../../redux/categories/actions';

const Categories = ({ fetch_cat, categ }) => {
  useEffect(() => {
    fetch_cat();
  }, []);

  return (
    <div className="categories-container">
      {categ?.length ? (
        <div>
          {categ.map((cat) => (
            <div>{cat.name}</div>
          ))}
        </div>
      ) : (
        <div>
          <h6>No hay categorías.</h6>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categ: state.categories.categories,
  };
};

export default connect(mapStateToProps, { fetch_cat })(Categories);
