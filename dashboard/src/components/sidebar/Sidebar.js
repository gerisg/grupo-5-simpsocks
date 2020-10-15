import React from 'react';
import SideItem from './SideItem.js';
import './sidebar.css';

function Sidebar() {
    return (
        <ul id="accordionSidebar" className="navbar-nav bg-dark sidebar sidebar-dark accordion">

            {/* LOGO */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <img src="/images/logo.png" alt="logo simpsocks"/>
                </div>
                <div className="sidebar-brand-text mx-3">simp<span className="ultra">socks</span></div>
            </a>

            {/* SIDE MENU */}
            <hr className="sidebar-divider my-0" />
            <SideItem name='Panel' icon='fas fa-fw fa-tachometer-alt' active='true' />
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Secciones</div>
            <SideItem name='Usuarios' icon='fas fa-user' />
            <SideItem name='Productos' icon='fas fa-shopping-cart' />
            <SideItem name='Categorías' icon='fas fa-folder' />
            
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    );
}

export default Sidebar;