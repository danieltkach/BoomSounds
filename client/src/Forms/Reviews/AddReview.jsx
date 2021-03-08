import ReactStars from 'react-rating-stars-component';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetch_users } from '../../redux/users/actions';
import { postReviews } from "../../redux/reviews/actions"
import { useEffect } from 'react';
import './Reviews.css';


const AddReview = ({ userId, productId, reviewState, fetch_users, postReviews }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const descriptionRef = useRef(null);
  const onChangeFunc = (new_rating) => {
    console.log(new_rating)
}

  useEffect(() => {
    fetch_users();
  });


  const validate = () => {
    let descriptionError = '';
    let ratingError = '';

    if (description === '') {
      descriptionError = 'invalid description';
    }
    if (rating < 1 || rating > 5) {
      ratingError = 'invalid rating';
    }

    if (descriptionError) {
      setDescriptionError(descriptionError);
      return false;
    }
    if (ratingError) {
      setRatingError(ratingError);
      return false;
    }
    return true;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (userId !== null) {
        var reviews = {
          description: description.description,
          rating: rating.rating,
          userId,
        };
       //post
       postReviews(productId,reviews)

      } else {
        console.log('userId is ', userId);
      }
    }
  };
  
  
  const OnchangeFunc = (e) => {
    var valor = descriptionRef.current.value;
    if (valor !== '') {
      setDescription({ description: descriptionRef.current.value });
    }
  };
  const ratingChanged = (newRating) => {
    setRating({ rating: newRating });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />{' '}
        <p>{ratingError}</p>
        <textarea
          className="add-review-textarea"
          ref={descriptionRef}
          type="text"
          rows="3"
          placeholder="Your description"
          onChange={OnchangeFunc}
        ></textarea>
        <p>{descriptionError}</p>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.users.userID,
    reviewState: state.reviews.reviews
  };
};

export default connect(mapStateToProps, { fetch_users, postReviews })(AddReview);
