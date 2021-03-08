import axios from "axios";
import React from "react";


class AddToCart extends React.Component{
    constructor(){
    super()
    this.state = {
        products : []
    }
    }
    componentDidMount = () => {
       fetch(`http://localhost:3001/products`)
       .then(r => {
           return r.json()
        })
       .then(r => {
           this.setState(r.map(data => this.state.products.push(data)))
       })
       .then(r => {
        this.state.products.map(r => {
             console.log(r.name)
       })
    })
}
    addToCart = () => {
        let Selector = document.getElementById("SelectorProduct").value
        axios.post(`http://localhost:3001/Shopcart/1/product/${Selector}`)
    }
    render(){
        return (
        <div><form onSubmit={this.addToCart}>
        <select id="SelectorProduct">
        <option selected>
            Seleccionar Producto 
        </option>
        {this.state.products.map(r => <option value={r.id}>{r.id}-{r.name}</option>)}
        </select>
            <button type="submit">add to cart</button>
       </form> 
       </div>
        )
    }
}

export default AddToCart;