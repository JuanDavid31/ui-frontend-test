import React, { Component } from 'react';

class AdicionarCategoria extends Component{

    constructor(){
        super();
        this.state = {nombre:""}
    }

    render(){
        return(
            <div>
                <form onSubmit={this.guardarCategoria}>
                    <input type="text" placeholder="Categoria" onChange={this.cambiar}></input>
                    <input type="submit" value="Guardar"></input>
                </form>
            </div> 
        );
    }

    cambiar = (e) =>{
        this.setState({nombre:e.target.value});
    }

    guardarCategoria = (e) =>{
        e.preventDefault();
        this.enviarPost(this.state.nombre);
    }

    enviarPost = (nomb) =>{
        let datos = {
            method: 'POST',
            body: JSON.stringify({nombre: nomb}),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://apidpizza.herokuapp.com/adicionarCategoria", datos)
            .then(this.actualizar)
            .catch(err => console.log(err));
    }

    actualizar = (resp) =>{
        if(resp.ok){
			resp.text().then(text => console.log(text));
		}else{
			resp.text().then(text => console.log(text));
		}
    }    
}

export default AdicionarCategoria;