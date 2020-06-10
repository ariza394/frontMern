import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <Router>
          {/* adentro del switch es lo que cambia en cada pagna, afuera va a estar el header y el footer ese route es para definir donde van las rutas*/}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
            <Route exact path="/proyectos" component={Proyectos} />
          </Switch>
        </Router>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
