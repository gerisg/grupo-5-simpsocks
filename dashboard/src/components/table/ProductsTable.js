import React from 'react';

function ProductsTable(props) {

    let rows = props.products;

    if (!rows || !rows.length) {
        return ( <div className="spinner-border" role="status"><span className="sr-only">Cargando...</span></div> );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Categorías</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { rows.map((row, i) => (
                        <tr key={`${i}-prod`}>
                            <td>{row.name }</td>
                            <td>{row.description}</td>
                            <td>{ row.categories ? row.categories.map((cat, i) => <span key={`${i}-prod-cat`} className="badge badge-info">{cat.name}</span>) : '' }</td>
                            <td><button type="button" className="btn btn-primary btn-sm"><i className="fas fa-search"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;