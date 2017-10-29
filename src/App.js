import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import DPizza from './components/DPizza';
import AdicionarProducto from './components/AdicionarProducto';
import EditarSucursal from './components/EditarSucursal';
import SubirFoto from './components/SubirFoto';
import Menu from './components/Menu';
import './stylesheets/App.css';

class App extends Component{

    render(){
        return(
            <div id="rutas">
                <DPizza/>
                <Switch>
                    <Route path="/editarSucursal/:id" component={EditarSucursal} />
                    <Route path="/adicionarProducto/:id" component={AdicionarProducto} />
                    <Route path="/sucursal/:id" component={Menu} />
                    <Route path="/foto/:id/:producto" component={SubirFoto} />
                </Switch>
            </div>
        );
    }
}

export default App;