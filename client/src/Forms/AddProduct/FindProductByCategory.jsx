import React, { Component } from "react";

class Find extends Component {
    constructor(){
    super()
    this.state = {
        categories:[],
        categoriesIds: [],
        productos:[],
        productosIds:[]
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
        }
         getFiltrarCategoria = (e) => {
             e.preventDefault()
            var selector = document.getElementById("categoriesSelector").value
            fetch(`http://localhost:3001/products/categoria/${selector}`)
            .then(r => {
                return r.json()
            })
            .then(res => {
                this.setState({
                    productos: res.map(data => {
                     return this.state.productosIds.push({producto: data.name})
                 })
                })
            })
            this.setState({productosIds: []})
            
        }
    render(){
        
        return (
        <div>
        <form onSubmit={this.getFiltrarCategoria}><h1>filtrar Categoria a Producto</h1>
        <select className="form-control my-2" id="categoriesSelector">
        <option selected>Seleccionar categoria</option>
        {this.state.categoriesIds.map(r => {
            return <option key={r.id} value={r.name}>{r.id}-{r.name}</option>
        })}
        </select>
        <button type="submit">Filtrar</button>
        {this.state.productosIds.map(r =>{
           return( <h3>{r.producto}</h3> )
        })}
        
        </form>
        </div>
        )
    }
}
export default Find