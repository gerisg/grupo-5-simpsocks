import React, { Component } from 'react';
import axios from 'axios';

// Components
import Title from './Title';
import ProductsTable from './table/ProductsTable';

class Products extends Component {

    constructor() {
        super();
        this.state = { 
            products: [],
            pagination: {}
        }
    }

    fetchProducts = async (page) => {
        const params = new URLSearchParams([['page', page]]);
        axios.get('/api/products', { params })
            .then(response => response.data)
            .then(response =>
                {
                    this.setState({ 
                        products: response.data,
                        pagination: {
                            curr: response.meta.page.current ? response.meta.page.current : '',
                            prev: response.meta.page.prev ? response.meta.page.prev : '',
                            next: response.meta.page.next ? response.meta.page.next : ''
                        }
                    });
                }
            )
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchProducts(1);
    }

    render() {
        return (
            <div className="container-fluid">
                <Title title="Panel de Productos" />
                <nav aria-label="Navigation Products Table">
                    <ul className="pagination justify-content-center">
                    <li className={`page-item ${this.state.pagination.prev ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => this.fetchProducts(this.state.pagination.prev)}>Anterior</button>
                        </li>
                        <li className="page-item active">
                            <button className="page-link" onClick={() => this.fetchProducts(this.state.pagination.curr)}>{this.state.pagination.curr}</button>
                        </li>
                        <li className={`page-item ${this.state.pagination.next ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => this.fetchProducts(this.state.pagination.next)}>Siguiente</button>
                        </li>
                    </ul>
                </nav>
                <ProductsTable products={ this.state.products } />
            </div>
        );
    }
}

export default Products;