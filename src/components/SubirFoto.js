import React, {Component} from 'react';
import {Redirect} from 'react-router';
import $ from 'jquery';

class SubirFoto extends Component{

    constructor(){
        super();
        this.state  = {
            opcion: "1",
            url:"",
            redireccionar:""
        };
    }

    render(){
        if(this.state.redireccionar){
            return <Redirect to={this.state.redireccionar} />
        }
        return(
            <div id="subir-foto">
                <select className="browser-default" onChange={this.cambiarSelect}>
                    <option value="1">Url imagen</option>
                    <option value="2">Subir archivo</option>
                </select>
                {this.darOpcion()}
            </div>
        );
    }

    cambiarSelect = (e) =>{
        e.preventDefault();
        this.setState({opcion:e.target.value});
    }

    darOpcion = () =>{
        if(this.state.opcion === "1"){
            return this.darOpcionUrl();
        }
        return this.darOpcionArchivo();
    }

    darOpcionUrl = () =>{
        return(
            <form onSubmit={this.adicionarFoto}>
                <div className="input-field">
                    <input type="text" placeholder="Url imagen" onChange={this.cambiarUrl}></input>
                </div>
                <input type="submit" className="btn teal darken-4" value="Añadir"></input>
            </form>
        );
    }

    cambiarUrl = (e) =>{
        e.preventDefault();
        this.setState({url:e.target.value});
    }

    adicionarFoto = (e) =>{
        e.preventDefault();
        this.subirFoto();
    }

    subirFoto = () =>{
        let datos = {
            method: 'PUT',
            body: JSON.stringify({
                url:this.state.url
            }),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://stark-river-37912.herokuapp.com/editarProductoConUrl/" + this.props.match.params.producto, datos)
            .then(this.atenderRespuesta)
            .catch(err => console.log(err));
    }

    darOpcionArchivo = () =>{
        return(
            <form encType="multipart/form-data">
                <div className="file-field input-field">
                    <div className="btn black">
                        <span>Escoger</span>
                        <input type="file" name="cancion"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                    <input className="btn teal darken-4" type="submit" onClick={this.subirCancion} value="Subir cancion"/>
                </div>
            </form>
        );
    }

    subirCancion = (e) =>{
        e.preventDefault()
        var data = this.darData();
        var datos = {
            method: "POST",
            body: data
        }
        this.bloquearVentana();
    
        fetch("https://stark-river-37912.herokuapp.com/editarProductoConArchivo/" + this.props.match.params.producto, datos)
        .then(this.atenderRespuesta)
        .catch(err => console.log(err));
    }

    darData = () =>{
        var data = new FormData();
        var datosArchivo = document.querySelector('input[type="file"]').files[0];
        data.append("data", datosArchivo);
        return data;
    }

    bloquearVentana = () =>{
        $(window).on('beforeunload', function() {
            return 'Se esta subiendo la foto';
        });
    }

    desbloquearVentana = () =>{
        $(window).unbind('beforeunload');
    }

    atenderRespuesta = (resp) =>{
        this.desbloquearVentana();
        if(resp.ok){
            console.log("cancion subida");
            this.setState({redireccionar:"/sucursal/"+this.props.match.params.id});
        }else{
            console.log("No sé, un error");
            this.setState({redireccionar:"/"});
        }
    }
}

export default SubirFoto;