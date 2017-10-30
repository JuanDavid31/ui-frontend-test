import React, {Component} from 'react';
import Sucursal from './Sucursal';
import AdicionarSucursal from './AdicionarSucursal';

class DPizza extends Component{

    constructor(){
        super();
        this.state = {sucursales:[]}
    }

    render(){
        return(
            <div id="dpizza">
                <AdicionarSucursal actualizar={this.actualizar}/>
                <div id="sucursales">
                    {this.state.sucursales}
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.actualizar();
    }

    componentDidUpdate(){
        this.actualizar();
    }

    actualizar = () =>{
        fetch("https://apidpizza.herokuapp.com/sucursales.json")
        .then(resp => resp.json())
        .then(this.adicionarSucursales)
        .catch(err => console.log(err));
    }

    adicionarSucursales = (json) =>{
        var actuales = json.map( sucursal =>{ 
            return <Sucursal key={sucursal.cId} 
                    id={sucursal.cId} 
                    nombre={sucursal.dNombre} 
                    direccion={sucursal.aDireccion} 
                    actualizar={this.actualizar}/>
        })
        this.setState({sucursales:actuales});
    }

}

export default DPizza;