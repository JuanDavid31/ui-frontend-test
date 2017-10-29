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
                    <input id="nombre" type="text" placeholder="Nombre" className="validate" onChange={this.cambiarNombre}></input>
                    <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="input-field">
                    <input id="direccion" maxLength="45" type="text" placeholder="Direccion" className="validate" onChange={this.cambiarDireccion}></input>
                    <label htmlFor="direccion">Nombre</label>
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

        fetch("https://stark-river-37912.herokuapp.com/adicionarSucursal", datos)
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
}

export default AdicionarSucursal;