import React, { Component } from 'react';
import axios from 'axios';

// Components
import Title from './Title';
import UsersTable from './table/UsersTable';

class Users extends Component {

    constructor() {
        super();
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => response.data)
            .then(users => this.setState({ users: users }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-fluid">
                <Title title="Panel de Usuarios" />
                <UsersTable users={ this.state.users.data } />
            </div>
        );
    }
}

export default Users;