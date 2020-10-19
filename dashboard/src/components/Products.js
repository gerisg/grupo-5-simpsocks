import React, { Component } from 'react';
import axios from 'axios';

// Components
import Title from './Title';
import ProductsTable from './table/ProductsTable';

class Products extends Component {

    constructor() {
        super();
        this.state = { products: [] }
    }

    componentDidMount() {
        axios.get('/api/products')
            .then(response => response.data)
            .then(products => this.setState({ products: products }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-fluid">
                <Title title="Panel de Productos" />
                <ProductsTable products={ this.state.products.data } />
            </div>
        );
    }
}

export default Products;