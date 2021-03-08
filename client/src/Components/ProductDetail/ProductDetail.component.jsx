import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import PlayPreview from './../../Admin/PlayPreview/PlayPreview.component';

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

  console.log(product.categories);

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
          {/* {product && product.categories?.length ? (
            product.categories((c) => (
              <div className="category-label">{c.name}</div>
            ))
          ) : (
            <span>Producto sin categorías</span>
          )} */}
        </div>
        <div className="pd-purchase-container">
          <span className="pd-price-text">${product.price}</span>
          <button type="button">Comprar</button>
        </div>
      </div>
    </div>
  );
}
