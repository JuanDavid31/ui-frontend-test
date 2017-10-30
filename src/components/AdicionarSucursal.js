import React, {Component} from 'react';

class AdicionarSucursal extends Component{

    constructor(){
        super();
        this.state = {nombre:"", direccion:""};
    }

    render(){
        return(
            <form id="adicionar-sucursal" onSubmit={this.adicionarSucursal}>
                <div className="input-field">
                    <input id="nombre" type="text" className="validate" onChange={this.cambiarNombre} required></input>
                    <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="input-field">
                    <input id="direccion" maxLength="45" type="text" className="validate" onChange={this.cambiarDireccion} required></input>
                    <label htmlFor="direccion">Direccion</label>
                </div>
                <button className="btn-large" type="submit">Adicionar sucursal
                    <i className="material-icons right">send</i>
                </button>
            </form>
        );
    }

    cambiarNombre = (e) =>{
        e.preventDefault();
        this.setState({nombre: e.target.value});
    }

    cambiarDireccion = (e) =>{
        e.preventDefault();
        this.setState({direccion: e.target.value});
    }

    adicionarSucursal = (e) =>{
        e.preventDefault();
        this.enviarPost();
    }

    enviarPost = () => {
        let datos = {
            method: 'POST',
            body: JSON.stringify({
                nombre: this.state.nombre,
                direccion: this.state.direccion
            }),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://apidpizza.herokuapp.com/adicionarSucursal", datos)
            .then(this.atenderRespuesta)
            .catch(err => console.log(err));
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
            this.props.actualizar();
            alert("Sucursal adicionada");
		}else if(resp.status === 500){
            alert("Ya existe el nombre de la sucursal");
		}else{
            resp.text().then(text => alert(text));
        }
    }
}

export default AdicionarSucursal;