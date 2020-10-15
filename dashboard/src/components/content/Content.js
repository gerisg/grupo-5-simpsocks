import React from 'react';
import Topbar from '../topbar/Topbar';
import './content.css'

function Content() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar />
                { /*<Main />*/ }
            </div>
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <a href="http://simpsocks.com.ar">
                            <span>Copyright &copy; SimpSocks 2020</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Content;