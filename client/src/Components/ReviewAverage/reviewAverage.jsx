import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import React, { useState, useEffect } from 'react';

const ReviewAverage = ({ productId }) => {
  const [average, setAverage] = useState([]);
  const [error, setErrot] = useState(['']);
  const onChangeFunc = (new_rating) => {
    console.log(new_rating);
  };
  useEffect(() => {
    (async () => {
      let revs = await axios.get(
        `http://localhost:3001/products/${productId}/review`
      );

      if (revs.data !== undefined && revs.data[0]?.user.email !== undefined) {
        setAverage([
          revs.data
            .map((r) => r.rating)
            .reduce((acc, el) => {
              return acc + el;
            }) / revs.data.map((a) => a.rating).length,
        ]);
      } else {
        setAverage([0]);
      }
    })();
  }, []);
  console.log(average);

  return (
    <div>
      {average.map((r) => {
        return (
          <div>
            <h1>Promedio</h1>
            <ReactStars
              isHalf={true}
              edit={false}
              value={average}
              onChange={onChangeFunc}
              size={58}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAverage;
