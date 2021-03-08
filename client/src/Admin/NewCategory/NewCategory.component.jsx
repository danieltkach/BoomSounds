import React from 'react';
import axios from 'axios';
import styles from './NewCategory.module.css';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addCategory } from '../../redux/categories/actions';

const NewCategory = ({ togglePanels, addCategory }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (info, e) => {
    addCategory(info);
    togglePanels();
    axios
      .post('http://localhost:3001/categories', info)
      .then((r) => {
        alert('Category added.');
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  return (
    <>
      <div className={styles.newcat_form_container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.left_panel}>
            <input
              className={styles.nc_input}
              name="name"
              type="text"
              placeholder="Nombre..."
              ref={register({
                required: { value: true, message: 'Enter name' },
              })}
            />
            <textarea
              className={styles.nc_input}
              name="description"
              type="text"
              placeholder="Descripción..."
              ref={register({ required: { value: false } })}
            />
          </div>
          <div className={styles.right_panel}>
            <button>agregar</button>
            <button className={styles.btn_close_panel} onClick={togglePanels}>
              x
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps, { addCategory })(NewCategory);
