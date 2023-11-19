import React, { createContext, useEffect, useState } from 'react';
import { mostrarProducto } from '../FirebaseConfig/firebaseCreate';

const ProductoContext = createContext();

function ProductosProvider({ children }) {
  const [listaProductos, setListaProductos] = useState([]);

  const fetchData = async () => {
    try {
      const productos = await mostrarProducto();
      setListaProductos(productos);
      console.log(productos);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <ProductoContext.Provider value={{ fetchData, listaProductos }}>
      {children}
    </ProductoContext.Provider>
  );
}

export default ProductosProvider;
export { ProductoContext };