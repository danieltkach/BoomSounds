import React from 'react';
import ProductDetail from './../../Components/ProductDetail/ProductDetail.component';
import ReviewsList from './../../Forms/Reviews/ReviewsList';
import AddReview from './../../Forms/Reviews/AddReview';
import ReviewAverage from '../../Components/ReviewAverage/reviewAverage';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId }) => {
  return (
    <div className="product_detail_page">
      <div className="page-product-detail-container">
        <ProductDetail productId={productId} />
      </div>

      <div className="page-reviews-container">
        <p className="reviews-section-title">
          Agregá tu opinión sobre este producto:
        </p>

        <AddReview productId={productId} />
        <ReviewAverage productId={productId} />
      </div>

      <div className="page-reviews-list">
        <ReviewsList productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
