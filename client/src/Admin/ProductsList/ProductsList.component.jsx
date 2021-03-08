import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import styles from './ProductsList.module.css';
import { Link } from 'react-router-dom';
import store from './../../redux/store/index';
import { useEffect } from 'react';
import { fetch_prod, delete_Prod } from './../../redux/products/actions';
import {
  delete_catProd,
  add_catProd,
  fetch_cat,
} from './../../redux/categories/actions';
import { setAudioUrl, changeStatus } from './../../redux/playPreview/actions';
import ConfigCategories from '../ConfigCategories';

const ProductsList = ({
  products,
  fetch_prod,
  fetch_cat,
  setAudioUrl,
  changeStatus,
  isPlaying,
  audioUrl,
  delete_Prod,
}) => {
  const [modal, setModal] = useState(false);
  const [prod, setProd] = useState(undefined);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  useEffect(() => {
    fetch_prod();
    fetch_cat();
  }, []);

  const modalActivo = (id) => {
    setModal(true);
    setProd(id);
  };

  store.subscribe(() => {
    store.getState();
  });

  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value.toLowerCase());
  };
  const handleSearchBy = (e) => {
    setSearchBy(e.target.value);
  };
  let filtered = products.filter((p) =>
    p[searchBy].toLowerCase().includes(searchFilter)
  );

  function deleteProductHandler(idProd) {
    delete_Prod(idProd);
  }

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchbar}>
          <input
            className={styles.plc_input}
            type="text"
            onChange={handleFilterChange}
            value={searchFilter}
          />
          <select
            className={styles.plc_input}
            name="options"
            onChange={handleSearchBy}
          >
            <option value="name">Nombre</option>
            <option value="artist">Artista</option>
          </select>
        </div>
        <div className={styles.toolbar_options}>
          <Link to="/admin/new-product">
            <button className={styles.button_new}>+ Nuevo</button>
          </Link>
        </div>
      </div>

      <div className={styles.products_table}>
        {products?.length ? (
          <table>
            <tr>
              <th>Tapa</th>
              <th>Nombre</th>
              <th>Artista</th>
              <th>Precio</th>
              <th>Opciones</th>
              <th>Preview</th>
              <th>Borrar</th>
            </tr>
            {filtered.map((p, index) => (
              <tr key={p.id}>
                <td>
                  <img
                    className={styles.thumbnail}
                    src={p.imgUrl}
                    alt="album cover"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.artist}</td>
                <td>${p.price}</td>
                <td>
                  <button key={p.id} onClick={() => modalActivo(p)}>
                    Modificar prducto
                  </button>
                </td>

                <td className={styles.preview_col}>
                  {' '}
                  {isPlaying && audioUrl == p.audioUrl ? (
                    <button
                      onClick={() => {
                        setAudioUrl(null);
                        changeStatus(false);
                      }}
                    >
                      <FontAwesomeIcon type="icon" icon={faStop} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAudioUrl(p.audioUrl);
                        changeStatus(true);
                      }}
                    >
                      <FontAwesomeIcon type="icon" icon={faPlay} />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductHandler(p.id)}>
                    <FontAwesomeIcon className="icon" icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <div>
            <p>Elements not found.</p>
          </div>
        )}
      </div>
      <Modal className={styles.modal} isOpen={modal} ariaHideApp={false}>
        <ConfigCategories producto={prod} />

        <button onClick={() => setModal(false)} className="btn_close_modal">
          Cerrar
        </button>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    isPlaying: state.playReducer.isPlaying,
    audioUrl: state.playReducer.audioUrl,
  };
};

export default connect(mapStateToProps, {
  fetch_prod,
  delete_catProd,
  add_catProd,
  fetch_cat,
  setAudioUrl,
  changeStatus,
  delete_Prod,
})(ProductsList);
