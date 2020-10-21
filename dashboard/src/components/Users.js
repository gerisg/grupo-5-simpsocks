import React, { Component } from 'react';
import axios from 'axios';

// Components
import Title from './Title';
import UsersTable from './table/UsersTable';

class Users extends Component {

    constructor() {
        super();
        this.state = { 
            users: [],
            pagination: {}
        }
    }

    fetchUsers = async (page) => {
        const params = new URLSearchParams([['page', page]]);
        axios.get('/api/users', { params })
            .then(response => response.data)
            .then(response =>
                {
                    this.setState({ 
                        users: response.data,
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
        this.fetchUsers(1);
    }

    render() {
        return (
            <div className="container-fluid">
                <Title title="Panel de Usuarios" />
                <nav aria-label="Navigation User Table">
                    <ul className="pagination justify-content-center">
                    <li className={`page-item ${this.state.pagination.prev ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => this.fetchUsers(this.state.pagination.prev)}>Anterior</button>
                        </li>
                        <li className="page-item active">
                            <button className="page-link" onClick={() => this.fetchUsers(this.state.pagination.curr)}>{this.state.pagination.curr}</button>
                        </li>
                        <li className={`page-item ${this.state.pagination.next ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => this.fetchUsers(this.state.pagination.next)}>Siguiente</button>
                        </li>
                    </ul>
                </nav>
                <UsersTable users={ this.state.users } />
            </div>
        );
    }
}

export default Users;