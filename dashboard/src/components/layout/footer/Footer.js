import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <a href="http://simpsocks.com.ar">
                        <span>Copyright &copy; SimpSocks 2020</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;