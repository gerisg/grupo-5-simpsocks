import React from 'react';

function UsersTable(props) {
    
    let rows = props.users;

    if (!rows || !rows.length) {
        return ( <div className="spinner-border" role="status"><span className="sr-only">Cargando...</span></div> );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { rows.map((row, i) => (
                        <tr key={`${i}-row`}>
                            <td>{row.firstname}</td>
                            <td>{row.lastname}</td>
                            <td>{row.email}</td>
                            <td>{row.phone ? row.phone : '-'}</td>
                            <td><button type="button" className="btn btn-primary btn-sm"><i className="fas fa-search"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;