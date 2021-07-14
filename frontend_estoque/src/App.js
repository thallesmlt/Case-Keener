
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import {Home} from './pages/Home/index'
import {CadastrarProdutos} from './pages/Cadastrar/cadastrarProdutos'
import {Login} from './pages/Login/login'
import {Registrar} from './pages/Registrar/registrar'
import {Entrada} from './pages/Acoes/entrada'
import {Saida} from './pages/Acoes/saida'
import {ListarLog } from './pages/Log/log'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/log" component={ListarLog}/>
          <Route path="/saida/:id" component={Saida}/>
          <Route path="/entrada/:id" component={Entrada}/>
          <Route exact path="/" component={Login} />
          <Route exact path="/registrar" component={Registrar} /> 
          <Route exact path="/produtos" component={Home} />
          <Route path="/cadastrar" component={CadastrarProdutos} />
        </Switch>
      </Router>
    </div>    
  );
}

export default App;
