import React, { Component } from 'react';
import axios from 'axios';

const phrases = [
    { phrase: "Hmmmm... algo no está bien por aquí..." },
    { phrase: "Te juro que la tenía... <br>¡pero no la encuentro!" },
    { phrase: "¿La página? <br>Se la comió el perro 🐶" },
    { phrase: "¿La página? <br>Recién se fue... no la alcanzaste por un pelín..." },
    { phrase: "La página que buscas no existe y probablemente no deba existir" },
    { phrase: "¿Página? <br> No hay ningúna página 🥄" },
    { phrase: "🎶 Mi vieja página... <br>ya no es lo que era... <br>ya no es lo que era " }
]

let api_key = 'Wfv8Wdg1gq5KoaQq0Q5JDnwfQmoGrpf5';

class NotFound extends Component {

    constructor() {
        super();
        this.state = { error: { message: '', image: { title: '', url: '' }}}
    }

    componentDidMount() {
        axios.get('https://api.giphy.com/v1/gifs/search', { params: { api_key, q: 'not found', limit: 25 } })
            .then(response => {
                let random = Math.floor(Math.random() * response.data.data.length);
                let gif = response.data.data[random];
                let index = Math.floor(Math.random() * phrases.length);
                this.setState({
                    error: {
                        message: phrases[index].phrase, 
                        image: { 
                            title: gif.title, 
                            url: gif.images.original.url
                        }  
                    }
                });
            })
            .catch(error => console.log(error));
    }

    render() {

        return (
            <div className="page-404">
                <div className="left">
                    <h1>404 <span role="img" aria-label="not found">🤷</span></h1>
                    <h2>{ this.state.error.message }</h2>
                </div>
                <div className="right">
                    <figure>
                        <img src={ this.state.error.image.url } alt={ this.state.error.image.title } />
                    </figure>
                </div>
            </div>
        );
    }
}

export default NotFound;