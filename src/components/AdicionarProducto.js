import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Input} from 'react-materialize';

class AdicionarProducto extends Component{

    constructor(){
        super();
        this.state = {
            categorias: [],
            nombre: "",
            ingredientes:"",
            precio:0,
            fecha:"",
            idCategoria:-1,
            redireccionar:false
        }
    }

    render(){
        if(this.state.redireccionar){
            return <Redirect to={"/sucursal/" + this.props.match.params.id}/>
        }
        return(
            <form id="adicionar-producto" onSubmit={this.adicionarProducto}>
                <div className="input-field">
                    <input id="nombre" type="text" className="validate" value={this.state.nombre} placeholder="Nombre" onChange={this.cambiarNombre} required></input>
                </div>
                <div className="input-field">
                    <input id="precio" type="number" min="0" step="1" className="validate" value={this.state.precio} placeholder="Precio" onChange={this.cambiarPrecio} required></input>
                </div>
                <div >
                    <Input name='on' type='date' value={this.state.fecha} placeholder="Fecha" onChange={this.cambiarFecha}/>
                </div>
                <div>
                    <label>Categoria</label>
                    <select className="browser-default" onChange={this.cambiarCategoria}>
                        {this.darCombo()}
                    </select>
                </div>
                <div className="input-field">
                    <textarea id="ingredientes" className="materialize-textarea" value={this.state.ingredientes} placeholder="Ingredientes separados por comas (,)" onChange={this.cambiarIngredientes} required></textarea>
                </div>
                <button className="btn-large" type="submit">Adicionar producto
                    <i className="material-icons right">send</i>
                </button>
                <button className="btn black" onClick={() =>{this.props.history.goBack()}}> 
                    <i className="material-icons left">arrow_back</i>
                </button>
            </form>
        );
    }

    componentDidMount(){   
        fetch("https://stark-river-37912.herokuapp.com/categorias.json")
        .then(resp => resp.json())
        .then(json => this.setState({categorias:json, idCategoria:json[0].cId}))
        .catch(err => console.log(err))
    }

    darCombo = () =>{
        var categorias = this.state.categorias.map(categoria => {
            return <option key={categoria.cId} value={categoria.cId} >{categoria.dNombre}</option>
        })

        return categorias;
    }

    cambiarNombre = (e) =>{
        e.preventDefault();
        this.setState({nombre:e.target.value});
    }

    cambiarIngredientes = (e) =>{
        e.preventDefault();
        this.setState({ingredientes:e.target.value});
    }

    cambiarPrecio = (e) =>{
        e.preventDefault();
        this.setState({precio:e.target.value});
    }

    cambiarFecha = (e) =>{
        e.preventDefault();
        this.setState({fecha:e.target.value});
    }

    cambiarCategoria = (e) =>{
        e.preventDefault();
        this.setState({idCategoria:e.target.value});
    }

    adicionarProducto = (e) =>{
        e.preventDefault();
        this.enviarPost();
    }

    enviarPost = () =>{
        let datos = {
            method: 'POST',
            body: JSON.stringify({
                nombre: this.state.nombre,
                precio: this.state.precio,
                fecha: this.state.fecha,
                ingredientes: this.state.ingredientes
            }),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://stark-river-37912.herokuapp.com/adicionarProducto/" + this.props.match.params.id + "/" + this.state.idCategoria, datos)
            .then(this.atenderRespuesta)
            .catch(err => console.log(err));
    }
    
    atenderRespuesta = (resp) =>{
        if(resp.ok){ console.log("Producto adicionado"); //Usar un redirect
			this.setState({redireccionar:true});
		}else{
			resp.text().then(text => console.log(text));
		}
    }
}

export default AdicionarProducto;