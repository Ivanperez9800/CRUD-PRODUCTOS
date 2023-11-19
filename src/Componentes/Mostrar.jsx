import React, { useContext } from 'react'
import '../App.css'
import { ProductoContext } from '../Context/ProductosProvider';
import { borrarProducto } from '../FirebaseConfig/firebaseCreate';
// import { ProductoContext } from '../Context/ProductosProvider.js';

import { Link } from "react-router-dom";


function Mostrar() {

    const {listaProductos,fetchData } = useContext( ProductoContext);

    const handleDeleteProducto = async(id) =>{
        // console.log("Producto:",id);
        await borrarProducto(id)
        alert("Producto borrado");
        await fetchData();
        
    }

    // console.log(props)
    return (

        <div className='tabla-productos' >
            <h2>Mostrar Productos</h2>
            { listaProductos.length > 0 ?
            
            <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th colSpan="2" >Opciones</th>
                </tr>
            </thead>
            <tbody>
                {listaProductos.map((producto) => (
                    <tr key={producto.id}>
                        <td>{producto.producto}</td>
                        <td>{producto.cantidad}</td>
                        <td className='opcion editar'><Link to={`/editar/${producto.id}`}>Editar</Link></td>
                        <td className='opcion borrar' onClick={() => handleDeleteProducto(producto.id)} >Borrar</td>
                    </tr>
                ))}
            </tbody>
        </table>
           : <p>Sin Productos</p> }
        </div>
    )

}

export default Mostrar