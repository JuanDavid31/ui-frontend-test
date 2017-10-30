import React, {Component} from 'react';
import Producto from './Producto';

class Menu extends Component{

    constructor(props){ 
        super(props);
        this.state = {
            productos:[]
        };
    }

    render(){
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
        fetch("https://apidpizza.herokuapp.com/productos.json/" + this.props.match.params.id)
        .then(this.atenderRespuesta)
        .catch(err => console.log(err))
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
            resp.json()
            .then(json => this.setState({productos:json}));
        }else{
            alert("No existe la sucursal " + this.props.match.params.id)
            this.props.history.push("/");
        }
    }

    adicionarProducto = () =>{
        this.props.history.push("/adicionarProducto/" + this.props.match.params.id);
    }

    darProductos = () =>{
        var productos = this.state.productos.map(producto =>{
            return <Producto key={producto.cId} 
                            id={producto.cId}
                            idSucursal={this.props.match.params.id}
                            nombre={producto.dNombre}
                            nombreCategoria={producto.dNombreCategoria}
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