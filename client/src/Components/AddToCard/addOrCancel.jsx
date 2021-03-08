import React from 'react';
import Axios from 'axios';

class AddOrCancel extends React.Component {
  constructor() {
    super();
  }
  buy = (e) => {
    e.preventDefault();
    let status = 'completed';
    Axios.put(`http://localhost:3001/Shopcart/setearStatus/${status}/1`);
  };
  cancel = (e) => {
    e.preventDefault();
    let status = 'cancelled';
    Axios.put(`http://localhost:3001/Shopcart/setearStatus/${status}/1`);
  };
  render() {
    return (
      <div>
        <button onClick={this.buy} value="completed">
          Buy
        </button>
        <button onClick={this.cancel} value="canceled">
          cancel
        </button>
      </div>
    );
  }
}
export default AddOrCancel;
