import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Producto extends Component{

    render(){
        return(
            <div className="card">
                <div className="card-image">
                    <img src={this.props.urlImagen || "http://via.placeholder.com/200x150"} alt="Ruta incorrecta"></img>
                    {this.darBotonFlotante()}
                </div>
                <div className="card-content">
                    <h5>{this.props.nombre}</h5>
                    <div>
                        <p>{"$" + this.props.precio}</p>
                    </div>
                    <div>
                        <label>Fecha disponibilidad</label>
                        <p>{this.props.fecha}</p>
                    </div>
                    <div id="ingredientes">
                        <ul>
                            {this.darIngredientes()}
                        </ul>
                    </div>
                </div> 
                <div className="card-action">
                    <button className="btn red lighten-2" type="submit" onClick={this.eliminar}>Eliminar</button>
                </div>
                
            </div>
        );
    }

    eliminar = (e) =>{
        e.preventDefault();
        this.enviarDelete();
    }

    enviarDelete = () =>{
        let datos = {
            method: 'DELETE',
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://stark-river-37912.herokuapp.com/eliminarProducto/" + this.props.id, datos)
        .then(this.atenderRespuesta)
        .catch(err => console.log(err));
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
            this.props.actualizar();
        }else{
            resp.text().then(text => console.log(text));
        }
    }

    darIngredientes = () =>{
        var ingredientes = this.props.ingredientes.split(", ").map( ingrediente =>{
            return <li key={ingrediente}>{ingrediente}</li>
        });
        return ingredientes;
    }

    darBotonFlotante = () =>{
        if(this.props.urlImagen === null || this.props.urlImagen === ""){
            return(
                <Link to={"/foto/" + this.props.idSucursal + "/" + this.props.id} className="btn-floating halfway-fab waves-effect waves-light cyan">
                    <i className="material-icons">add</i>
                </Link>
            ); 
        }
    }
    
}

export default Producto;