import axios from 'axios';
import React, { Component } from 'react';
import SimpleCard from './cards/SimpleCard';
import TopCard from './cards/TopCard';
import LastUserCard from './cards/LastUserCard';
import LastProductCard from './cards/LastProductCard';
import Title from './Title'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            simpleMetrics: [],
            topCategories: [],
            lastProduct: {},
            lastUser: {}
        }
    }

    componentDidMount() {

        // Todos los productos, usuarios y categorías
        let productsPromise = axios.get(`/api/products`);
        let categoriesPromise = axios.get(`/api/categories`);
        let usersPromise = axios.get(`/api/users`);
        Promise.all([ productsPromise, categoriesPromise, usersPromise ])
            .then(([responseProds, responseCats, responseUsers]) => {
                let products = responseProds.data;
                let categories = responseCats.data;
                let users = responseUsers.data;
                this.setState({
                    simpleMetrics: [
                        { name: 'Productos', value: products.meta.count, icon: 'fas fa-shopping-cart', color: 'primary' },
                        { name: 'Categorías', value: categories.meta.count, icon: 'fas fa-folder', color: 'success' },
                        { name: 'Usuarios', value: users.meta.count, icon: 'fas fa-users', color: 'warning' },
                    ],
                    topCategories: products.meta.count_by_category.slice(0, 5)
                });
            })
            .catch(error => {
                console.log(error);
            });

        // Latest User
        axios.get(`/api/users/latest`)
            .then( response => {
                this.setState({ lastUser: response.data.data[0] });
            })
            .catch(error => {
                console.log(error);
            });
        
        // Latest Product
        axios.get(`/api/products/latest`)
            .then( response => {
                this.setState({ lastProduct: response.data.data[0] });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const loading = <div className="spinner-border" role="status"><span className="sr-only">Cargando...</span></div>
        
        return (
            <div className="container-fluid">

                <Title title="Panel Principal" />
                
                <div className="row">
                    
                    {/* SIMPLE CARDS */}
                    { this.state.simpleMetrics.length ? 
                        this.state.simpleMetrics.map(
                            (metric, i) => <SimpleCard key={`${i}-metric`} metric={metric} />) : loading
                    }

                    {/* TOP ITEMS CARDS */}
                    { this.state.topCategories.length ? 
                        <TopCard name='categorías' items={ this.state.topCategories } /> : loading
                    }

                    {/* LAST ITEM CARDS */}
                    { this.state.lastUser.id ?
                        <LastUserCard lastItem={ this.state.lastUser } /> : loading
                    }
                    { this.state.lastProduct.id ?
                        <LastProductCard lastItem={ this.state.lastProduct } /> : loading
                    }
                    
                </div>
            </div>
        );
    }
}

export default Home;