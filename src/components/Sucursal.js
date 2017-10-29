import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'

class Sucursal extends Component{

    constructor(){
        super();
        this.state = {redireccionar: false};
    }

    render(){
        if(this.state.redireccionar){
            return <Redirect to="/" />
        }
        return(
            <div className="sucursal hoverable card-panel">
                <div className="panel-superior">
                    <Link to={"/sucursal/" + this.props.id}>{this.props.nombre}</Link>
                    <p>{this.props.direccion}</p>
                </div>
                <div className="panel-inferior">
                    <Link className="btn teal darken-4" to={"/editarSucursal/" + this.props.id}>Editar</Link>
                    <input className="btn red lighten-2" type="submit" value="Eliminar" onClick={this.eliminar}></input>
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

        fetch("https://stark-river-37912.herokuapp.com/eliminarSucursal/" + this.props.id, datos)
        .then(this.atenderRespuesta)
        .catch(err => console.log(err));
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
            this.props.actualizar();
            this.setState({redireccionar:true});
        }else{
            resp.text().then(text => console.log(text));
        }
    }
}

export default Sucursal;