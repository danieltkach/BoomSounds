import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import PlayPreview from './../../Admin/PlayPreview/PlayPreview.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons';

export default function ProductDetail({ productId }) {
  const [product, setProduct] = useState({});

  const link = 'http://localhost:3001/products/id/' + productId;
  useEffect(() => {
    fetch(link)
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <div className="ProductDetail-container">
      <div className="pd-image">
        <img alt="productImage" src={product.imgUrl} />
      </div>

      <div className="pd-basic-info">
        <p className="pd-name">{product.name}</p>
        <p className="pd-artist">{product.artist}</p>
        <p className="pd-description">{product.description}</p>
        {/* <span className="pd-preview-text">Preview: </span> */}
        <div className="pd-play-controls">
          <PlayPreview
            className="playpreview-component"
            audioUrl={product.audioUrl}
          />
        </div>
        
        <div className="pd-categories-container">
        <h5>Categorias : </h5>
          {product.categories?.length ? (
            product.categories.map((c) => (
              <div className="category-label">{c.name}</div>
            ))
          ) : (
            <span>Producto sin categorías</span>
          )} 
        </div>
      </div>
        <div className="pd-tracks-container">
        <h5>Canciones que incluye : </h5>
            {product.categories?.length ? (
              product.tracks.map((t) =>(
                <div className="track-label">{t.name} <FontAwesomeIcon type="icon" icon={faPlay} /></div>
              ))): (<span>Este producto no incluye otras canciones</span>
              )}
        </div>
        <div className="pd-purchase-container">
          <h3 className="pd-price-text">${product.price}</h3>
          <br/>
          <button className="pd-btn-text" type="button">Comprar</button>
        </div>
      
    </div>
  );
}
