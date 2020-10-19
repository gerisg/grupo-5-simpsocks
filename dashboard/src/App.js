import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

// Componentes
import Topbar from './components/layout/topbar/Topbar';
import Footer from './components/layout/footer/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Users from './components/Users';
import NotFound from './components/NotFound';

// Assets
import './assets/css/bootstrap-min.css';
import './App.css';

function App() {
    return (
        <div id="wrapper">
            <ul id="accordionSidebar" className="navbar-nav bg-dark sidebar sidebar-dark accordion">
                
                {/* LOGO */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img src="/images/logo.png" alt="logo simpsocks" />
                    </div>
                    <div className="sidebar-brand-text mx-3">simp<span className="ultra">socks</span></div>
                </a>
                <hr className="sidebar-divider my-0" />

                {/* SIDE MENU */}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" exact to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Panel</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider" />
                
                <div className="sidebar-heading">Secciones</div>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="/users">
                        <i className="fas fa-users"></i>
                        <span>Usuarios</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="/products">
                        <i className="fas fa-shopping-cart"></i>
                        <span>Productos</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider d-none d-md-block" />

            </ul>

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route path="/products" component={ Products } />
                        <Route path="/users" component={ Users } />
                        <Route component={ NotFound } />
                    </Switch>
                </div>
                <Footer /> 
            </div>
        </div>
    );
}

export default App;