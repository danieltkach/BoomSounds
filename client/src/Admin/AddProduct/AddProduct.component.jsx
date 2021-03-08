import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addCategory, fetch_cat } from '../../redux/categories/actions';
import styles from './AddProduct.module.css';
import NewCategory from './../NewCategory/NewCategory.component';
import CategoriesTagBox from './../CategoriesTagBox/CategoriesTagBox.component';

const AddProduct = ({ fetch_cat, cats, product }) => {
  const [datos, setDatos] = useState({
    name: product?.name,
    artist: product?.artist,
    imgUrl: product?.imgUrl,
    price: product?.price,
    description: product?.description,
    audioUrl: product?.audioUrl,
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const [newCategoryPanel, setNewCategoryPanel] = useState(false);
  const { register, handleSubmit } = useForm();
  const [uploadValue, setUploadValue] = useState(0);
  const [status, setStatus] = useState(false);
  const [songURL, setSongURL] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImage, setProductImage] = useState('');

  const [tracksList, setTracksList] = useState([]);
  const [currentTrackName, setCurrentTrackName] = useState('');
  const [currentTrackUrl, setCurrentTrackUrl] = useState('');
  const onTrackName = (e) => {
    setCurrentTrackName(e.target.value);
  };
  const AddTrack = () => {
    const newTrack = { name: currentTrackName, audioUrl: currentTrackUrl };
    setTracksList([...tracksList, newTrack]);
    console.log('tracksList >>> ', tracksList);
  };

  useEffect(() => {
    fetch_cat();
  }, []);

  const onSubmit = (info, e) => {
    console.log('tracksList >> ', tracksList);
    if (status) {
      info.audioUrl = songURL;
      info.tracks = [...tracksList];
      axios
        .post('http://localhost:3001/products/', info)
        .then((res) => {
          selectedCategories.map((c) => {
            return axios
              .post(
                `http://localhost:3001/products/${res.data.id}/category/${c}`
              )
              .then((res) => {
                console.log('<<< axios track >>>', res);
                tracksList.map((t) => {
                  axios({
                    method: 'POST',
                    url: `http://localhost:3001/products/${res.data}/track`,
                    data: t,
                  });
                });
              });
          });
        })

        .catch((err) => console.log(err));
      e.target.reset();
    } else alert('Porfavor seleccione un archivo!');
  };

  const onFirebaseUpload = (e) => {
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
            setCurrentTrackUrl(res);
          });
      }
    );
  };

  function setProductImageHandler(e) {
    setProductImage(e.target.value);
  }

  function toggleCategoryPanels() {
    setNewCategoryPanel(!newCategoryPanel);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.component_container}>
          <div className={styles.left_panel}>
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
                  placeholder="Artista..."
                  type="text"
                  value={datos.artist}
                  onChange={handleInputChange}
                  ref={register({
                    required: { value: true, message: 'Artista obligatorio' },
                  })}
                />
              </div>
              <div className={styles.price_container}>
                <input
                  className={styles.price_input}
                  name="price"
                  placeholder="Precio..."
                  type="text"
                  value={datos.price}
                  onChange={handleInputChange}
                  ref={register({
                    required: { value: true, message: 'Precio obligatorio' },
                  })}
                />
              </div>
              <div className={styles.product_imageUrl}>
                <input
                  name="imgUrl"
                  className={styles.image_input}
                  onChange={setProductImageHandler}
                  type="text"
                  placeholder="URL de la imagen..."
                  value={datos.imgUrl}
                  onChange={handleInputChange}
                  ref={register({
                    required: { value: false },
                  })}
                />
              </div>

              <div className={styles.description_container}>
                <textarea
                  className={styles.description_input}
                  name="description"
                  placeholder="Descripción..."
                  value={datos.description}
                  onChange={handleInputChange}
                  ref={register({
                    required: { value: false },
                  })}
                />
              </div>
            </div>
            <div className={styles.product_image_container}>
              <img
                src={productImage ? productImage : '/cd.jpg'}
                alt="Product cover"
              />
            </div>

            <div className={styles.categories_container}>
              <div className={styles.toolbar}>
                <p>Seleccionar categorías:</p>
                <button
                  className={`${styles.btn_toggle} ${
                    newCategoryPanel ? styles.display_none : ''
                  }`}
                  type="button"
                  onClick={toggleCategoryPanels}
                >
                  nueva...
                </button>
              </div>

              {newCategoryPanel ? (
                <NewCategory togglePanels={toggleCategoryPanels} />
              ) : (
                <CategoriesTagBox
                  cats={cats}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  togglePanels={toggleCategoryPanels}
                />
              )}
            </div>
          </div>

          <div className={styles.right_panel}>
            <progress value={uploadValue} max="100">
              {uploadValue} %
            </progress>
            <input
              id="file"
              type="file"
              onChange={onFirebaseUpload.bind(this)}
            />
            <input
              type="text"
              placeholder="Nombre de la pista..."
              onChange={onTrackName}
              value={currentTrackName}
            />
            <button
              type="button"
              onClick={AddTrack}
              className={styles.btn_add_track}
            >
              Agregar
            </button>

            <div className={styles.track_list_container}>
              {tracksList.length ? (
                <ol className={styles.tracks_list}>
                  {tracksList.map((s) => (
                    <li>{s.name}</li>
                  ))}
                </ol>
              ) : (
                <p>Lista vacía.</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.addProduct_footer_options_container}>
          <button type="submit">Guardar Producto</button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cats: state.categories.categories,
  };
};

export default connect(mapStateToProps, { fetch_cat, addCategory })(AddProduct);
