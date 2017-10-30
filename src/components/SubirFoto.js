import React, {Component} from 'react';
import $ from 'jquery';

class SubirFoto extends Component{

    constructor(){
        super();
        this.state  = {
            opcion: "1",
            url:""
        };
    }

    render(){
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
        this.enviarUrl();
    }

    enviarUrl = () =>{
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

        fetch("https://apidpizza.herokuapp.com/editarProductoConUrl/" + this.props.match.params.producto, datos)
            .then(this.atenderPut)
            .catch(err => console.log(err));
    }

    darOpcionArchivo = () =>{
        return(
            <form encType="multipart/form-data">
                <div className="file-field input-field">
                    <div className="btn black">
                        <span>Escoger</span>
                        <input type="file" name="foto"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                    <input className="btn teal darken-4" type="submit" onClick={this.subirFoto} value="Subir foto"/>
                </div>
            </form>
        );
    }

    subirFoto = (e) =>{
        e.preventDefault()
        var data = this.darData();
        var datos = {
            method: "POST",
            body: data
        }
        this.bloquearVentana();
    
        fetch("https://apidpizza.herokuapp.com/editarProductoConArchivo/" + this.props.match.params.producto, datos)
        .then(this.atenderPost)
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

    atenderPost = (resp) =>{
        this.desbloquearVentana();
        if(resp.ok){
            resp.text().then(texto => alert(texto));
            this.props.history.push("/sucursal/"+this.props.match.params.id);
        }else{
            resp.text().then(texto => alert(texto));
            this.props.history.push("/");
        }
    }

    atenderPut = (resp) =>{
        if(resp.ok){
            resp.text().then(texto => alert(texto));
            this.props.history.push("/sucursal/"+this.props.match.params.id);
        }else{
            resp.text().then(texto => alert(texto));
            this.props.history.push("/");
        }
    }
}

export default SubirFoto;