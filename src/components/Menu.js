import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Producto from './Producto';

class Menu extends Component{

    constructor(props){ 
        super(props);
        this.state = {
            productos:[],
            redireccionar:false
        };
    }

    render(){//Un cargando... y no existen los productos
        if(this.state.redireccionar){
            return <Redirect to={"/adicionarProducto/" + this.props.match.params.id} />
        }
        return(
            <div id="menu">
                <button className="btn-large" type="submit" onClick={this.adicionarProducto}>Añadir Producto</button>
                <div id="productos">
                    {this.darProductos()}
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.actualizar();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.actualizar();
        }
    }

    actualizar = () =>{
        fetch("https://stark-river-37912.herokuapp.com/productos.json/" + this.props.match.params.id)
        .then(resp => resp.json())//Un cargando... y no existen los productos, la sucursal no existe
        .then(json => this.setState({productos:json}))
        .catch(err => console.log(err))
    }

    adicionarProducto = () =>{
        this.setState({redireccionar:true});
    }

    darProductos = () =>{
        var productos = this.state.productos.map(producto =>{
            return <Producto key={producto.cId} 
                            id={producto.cId}
                            idSucursal={this.props.match.params.id}
                            nombre={producto.dNombre}
                            precio={producto.nPrecio}
                            fecha={producto.fLimite}
                            urlImagen={producto.dUrlFoto}
                            ingredientes={producto.aIngredientes}
                            actualizar={this.actualizar}/>
        })
        return productos;
    }
}

export default Menu;