import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetch_cat } from '../../redux/categories/actions';

const arrayId = [];
const ProductForm = ({ fetch_cat, cats }) => {
  const { register, errors, handleSubmit } = useForm();
  const [uploadValue, setUploadValue] = useState(0);
  const [status, setStatus] = useState(false);
  const [songURL, setSongURL] = useState('');

  useEffect(() => {
    fetch_cat();
  }, []);

  const onSubmit = (info, e) => {
    if (status) {
      info.audioUrl = songURL;
      axios
        .post('http://localhost:3001/products/', info)
        .then((res) => {
          arrayId.map((r) => {
            return axios.post(
              `http://localhost:3001/products/${res.data.id}/category/${r}`
            );
          });
        })
        .catch((err) => console.log(err));
      e.target.reset();
    } else alert('Porfavor seleccione un archivo!');
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

  function ClickHandler(id) {
    if (arrayId.length === 0) {
      arrayId.push(id);
    }
    if (arrayId.includes(id) !== true) {
      arrayId.push(id);
    }
  }
  return (
    <div className="container">
      <h2>Formulario Productos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Nombre</p>
        <input
          name="name"
          className="form-control my-2"
          ref={register({
            required: { value: true, message: 'Nombre obligatorio' },
          })}
        />
        <span className="text-danger text-small">
          {errors.name && errors.name.message}
        </span>
        <p>Artista </p>
        <input
          name="artist"
          className="form-control my-2"
          ref={register({
            required: { value: true, message: 'Artista obligatorio' },
          })}
        />
        <span className="text-danger text-small">
          {errors.artist && errors.artist.message}
        </span>
        <p> Descripcion </p>
        <input
          name="description"
          className="form-control my-2"
          ref={register({
            required: { value: false },
          })}
        />
        <p>Categoria</p>

        {cats.map((categories) => (
          <button onClick={() => ClickHandler(categories.id)}>
            {categories.name}
          </button>
        ))}

        <p>Precio </p>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control "
            name="price"
            ref={register({
              required: { value: true, message: 'Precio obligatorio' },
            })}
          />
        </div>
        <span className="text-danger text-small">
          {errors.price && errors.price.message}
        </span>
        <p>URL Imagen </p>
        <input
          name="imgUrl"
          className="form-control my-2"
          ref={register({
            required: { value: false },
          })}
        />
        <p>Seleccionar Archivo</p>
        <div>
          {status ? (
            <div className="songs-list">
              <p>Listo para subir!</p>
            </div>
          ) : (
            <div>
              <input
                id="file"
                type="file"
                onChange={handleOnChange.bind(this)}
              />
            </div>
          )}

          <br />
          <progress value={uploadValue} max="100">
            {uploadValue} %
          </progress>
        </div>
        <br />
        <button className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cats: state.categories.categories,
  };
};

export default connect(mapStateToProps, { fetch_cat })(ProductForm);
