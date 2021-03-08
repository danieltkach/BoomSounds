import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Categories from '../../Components/Categories';
import { addCategory } from '../../redux/categories/actions';
import { connect } from 'react-redux';

const CategoriesForm = ({addCategory}) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (info, e) => {
    addCategory(info)
    axios
      .post('http://localhost:3001/categories', info)
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Agregar categoría</h1>
          <input
            className="form-control my-2"
            placeholder="name"
            type="text"
            name="name"
            ref={register({
              required: { value: true, message: 'Enter name' },
            })}
          />
          <span className="text-danger text-small">
            {errors.name && errors.name.message}
          </span>
        </div>
        <div>
          <input
            className="form-control my-2"
            placeholder="description"
            type="text"
            name="description"
            ref={register({ required: { value: false } })}
          />
        </div>
        <button type="submit" className="btn add-button">
          Agregar
        </button>
      </form>

      <div className="categories-list">
        <p>Categerías disponibles:</p>
        <Categories />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    cats : state.categories.categories
  }
}

export default connect(mapStateToProps, {addCategory})(CategoriesForm)
