import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  deleteCategoryProduct,
  AddCategoryProduct,
} from '../../redux/products/actions';
import firebase from 'firebase/app';
import 'firebase/storage';
import styles from '../AddProduct/AddProduct.module.css';
import './ConfigCategories.css';

const ConfigCategories = ({ producto, cats }) => {
  const [uploadValue, setUploadValue] = useState(0);
  const [status, setStatus] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [songURL, setSongURL] = useState('');
  const [pass, setPass] = useState(false);
  const { register, handleSubmit } = useForm();
  const [productImage, setProductImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [datos, setDatos] = useState({
    name: producto.name,
    artist: producto.artist,
    imgUrl: producto.imgUrl,
    price: producto.price,
    description: producto.description,
    audioUrl: producto.audioUrl,
  });

  if (pass === false) {
    producto.categories.map((cat) => {
      !selectedCategories.includes(cat.id) &&
        setSelectedCategories([...selectedCategories, cat.id]);
    });
  }

  function toggleCategoryHandler(cat) {
    if (selectedCategories.includes(cat.id)) {
      const newCategories = selectedCategories.filter((c) => c !== cat.id);
      setSelectedCategories(newCategories);
      axios.delete(
        `http://localhost:3001/products/${producto.id}/deleteCategory/${cat.id}`
      );
      setPass(true);
    } else {
      setSelectedCategories([...selectedCategories, cat.id]);
      axios.post(
        `http://localhost:3001/products/${producto.id}/category/${cat.id}`
      );
      setPass(true);
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  function setProductImageHandler(e) {
    setProductImage(e.target.value);
  }

  function toggleModalHandler() {
    setShowModal(!showModal);
  }

  const onSubmit = (e) => {
    if (status) {
      datos.audioUrl = songURL;
    }
    axios
      .put(`http://localhost:3001/products/${producto.id}`, datos)
      .then(() => {
        alert('Producto modificado!');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`test/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      'state_changed',
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        // Upload complete
        firebase
          .storage()
          .ref('/test')
          .child(file.name)
          .getDownloadURL()
          .then((res) => {
            setSongURL(res);
            setStatus(true);
          });
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="cc_component_container">
          <div className="left_panel">
            <div className={styles.name_artist_price_image}>
              <div className={styles.name_container}>
                <input
                  className={styles.name_input}
                  name="name"
                  placeholder="Nombre..."
                  type="text"
                  value={datos.name}
                  onChange={handleInputChange}
                  ref={register({
                    required: { value: true, message: 'Nombre obligatorio' },
                  })}
                />
              </div>
              <div className={styles.artist_container}>
                <input
                  className={styles.artist_input}
                  name="artist"
                  value={datos.artist}
                  onChange={handleInputChange}
                  placeholder="Artista..."
                  type="text"
                  ref={register({
                    required: { value: true, message: 'Artista obligatorio' },
                  })}
                />
              </div>
              <div className={styles.price_container}>
                <input
                  className={styles.price_input}
                  name="price"
                  value={datos.price}
                  onChange={handleInputChange}
                  placeholder="Precio..."
                  type="text"
                  ref={register({
                    required: { value: true, message: 'Precio obligatorio' },
                  })}
                />
              </div>
              <div className={styles.product_imageUrl}>
                <input
                  className={styles.image_input}
                  name="imgUrl"
                  value={datos.imgUrl}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="URL de la imagen..."
                  ref={register({
                    required: { value: false },
                  })}
                />
              </div>
              <div className="product-image-container">
                <img src={datos.imgUrl} alt="Product cover" />
              </div>
            </div>

            <div className={styles.description_container}>
              <textarea
                className={styles.description_input}
                name="description"
                value={datos.description}
                onChange={handleInputChange}
                placeholder="Descripción..."
                ref={register({
                  required: { value: false },
                })}
              />
            </div>
          </div>
          <div className="categories-container">
            <div className="toolbar">
              <p>Seleccionar categorías:</p>
            </div>
            <div>
              <div className="box">
                {cats.map((c) => (
                  <button
                    type="button"
                    className={`category-tag ${
                      selectedCategories.includes(c.id) ? 'selected-tag' : ''
                    }`}
                    key={c.id}
                    onClick={() => toggleCategoryHandler(c)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn_guardar_producto" type="submit">
              Guardar Producto
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    cats: state.categories.categories,
  };
};

export default connect(mapStateToProps, {
  deleteCategoryProduct,
  AddCategoryProduct,
})(ConfigCategories);
