import React, { Component, useRef } from "react";
import axios from "axios";

class Select extends Component {
    constructor(){
    super()
    this.state = {
        categories: [],
        products: [],
        categoriesIds: [],
        productsIds: []
    }
    }
    componentDidMount =() => {
    const categoriaMapArray = []
    fetch("http://localhost:3001/categories")
    .then(r => {
      return r.json()
      })
      .then(data => {
        this.setState({
        
        categories: data.map(r => this.state.categoriesIds.push({id: r.id ,name: r.name}))
        })
       categoriaMapArray.push(data.map(r => r.name));
      })
    fetch("http://localhost:3001/products")
    .then(r => {
      return r.json()
      })
      .then(data => {
        this.setState({
            products: data.map(r => this.state.productsIds.push({name: r.name,idProduct:r.id}))
        })
      })
    }
     
    
    render(){
        const postAproduct_category = () => {
        var productSelector = document.getElementById("productSelector").value
        var categoriesSelector = document.getElementById("categoriesSelector").value
        axios.post(`http://localhost:3001/products/${productSelector}/category/${categoriesSelector}`)
        .then(ok => console.log(ok))
        .catch(err => console.log(err))
        }
        return (
        <div>
        <form onSubmit={postAproduct_category}><h1>Añadir Categoria a Producto</h1>
        <select className="form-control my-2" id="categoriesSelector">
        <option selected>Seleccionar categoria</option>
        {this.state.categoriesIds.map(r => {
            return <option key={r.id} value={r.id}>{r.id}-{r.name}</option>
        })}
        </select>
        <select className="form-control my-2" name="" id="productSelector">
        <option selected>Seleccionar producto</option>
        {this.state.productsIds.map(r => {
            return <option key={r.idProduct} value={r.idProduct}>{r.name}</option>
        })}
        </select>
        <button className="btn add-button" style={{padding:5}} type="submit" >Agregar</button>
        </form>
        </div>
        )
    }
}
export default Select