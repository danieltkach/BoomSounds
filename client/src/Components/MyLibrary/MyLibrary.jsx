import React from 'react';
import styles from './MyLibrary.module.css';
import { getLibraryProducts } from './../../redux/cart/actions';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

const MyLibrary = ({ userId, libraryProducts, getLibraryProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(libraryProducts[0]);

  // useEffect(() => {
  //   getLibraryProducts(userId);
  // }, []);

  console.log(libraryProducts);

  const selectProductHandler = (product) => {
    setSelectedProduct(product);
    console.log('selected product >>> ', product);
  };

  return (
    <div className={styles.my_library_container}>
      <div className={styles.tool_bar}>
        <input type="text" className={styles.searchbox} />
        <select name="searchby" id="" className={styles.searchby}>
          <option value="name">Nombre</option>
          <option value="artist">Artista</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div className={styles.products_container}>
        <div className={styles.products}>
          {libraryProducts?.length ? (
            libraryProducts.map((p) => (
              <div
                key={p.id}
                className={`${styles.product} ${
                  p.id === selectedProduct.id ? styles.selected_product : ''
                }`}
                onClick={() => selectProductHandler(p)}
              >
                <p className={styles.product_name}>{p.name}</p>
                <img src={p.imgUrl} alt="product cover picture" />
              </div>
            ))
          ) : (
            <div>No hay productos en tu Musiteca.</div>
          )}
        </div>

        <div className={styles.tracks_container}>
          <p className={styles.table_title}>Pistas:</p>

          <table className={styles.tracks_table}>
            <tr>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>

            {selectedProduct ? (
              selectedProduct.tracks.map((t) => (
                <>
                  <tr>
                    <td>{t.name}</td>
                    <td>
                      <a href={t.audioUrl}>Descargar</a>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <p>Selecciona un producto para ver su contenido.</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.users.userID,
    libraryProducts: state.productCart.libraryProducts,
  };
};

export default connect(mapStateToProps, { getLibraryProducts })(MyLibrary);
