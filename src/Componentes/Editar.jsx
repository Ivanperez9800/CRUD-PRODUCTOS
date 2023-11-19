import React, { useContext, useEffect, useState } from 'react'
/*PARA MANEJAR EL TEMA DE RUTAS */
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

/*PARA MANEJAR EL TEMA DE VALIDACION DE DATOS */
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from "yup";

/*PARA MANEJAR EL TEMA DE LOS DATOS */
import { buscarProducto, editarProducto } from '../FirebaseConfig/firebaseCreate';
import { ProductoContext } from '../Context/ProductosProvider';



const schema = object().shape({
  producto: string().required("El producto es obligatorio")
    .test('not-a-number', 'El producto no puede ser un número', value => {
      // Verificar que el valor no sea un número
      return isNaN(value);
    }),
  cantidad: number().typeError("La cantidad es obligatoria!!")
    .min(1, "La cantidad debe ser mayor o igual a 1"),
});



function Editar() {
  const { id } = useParams();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fetchData } = useContext(ProductoContext)
  const navigate = useNavigate();



  const onSubmit = (data) => {
    // handleCrearProducto(data);
    // console.log(data)
    const productos = [{ ...producto, ...data }]
    // console.log(productos[0].cantidad)
    handleEditarProducto(productos);


    // reset();
  }

  const [producto, setProductoEditado] = useState([]);


  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productoEncontrado = await buscarProducto(id);
        setProductoEditado(productoEncontrado); // Actualiza el estado después de obtener el producto
      } catch (error) {
        // Manejar el error según sea necesario
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, [id]);


  // console.log(id);
  const handleEditarProducto = async (data) => {
    await editarProducto(data, id);
    alert("Producto Editado!!")

    await fetchData();
    // return redirect("/");
    // history.push("/");
    navigate("/");
  }
  return (
    <div>

      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='form-group' >
          <label htmlFor='producto' id='producto' >Producto:</label>
          <input
            type="text"
            {...register("producto", { required: true })}
            className={errors.producto ? 'input-error' : ''}
            id='producto'
            placeholder={producto.producto}
          />
         <span className={errors.producto ? 'message-error' : ''}>{errors.producto && errors.producto.message}</span>
        </div>
        <div className='form-group'>
          <label htmlFor='cantidad' id='cantidad' >Cantidad:</label>
          <input 
          type="number" 
          {...register("cantidad", { required: true })} 
          className={errors.cantidad ? 'input-error' : ''} 
          id='cantidad'
          placeholder={producto.cantidad} />
          {errors.cantidad && <span className='message-error' > {errors.cantidad.message}</span>}
        </div>
        <button className='button-submit' type='submit '>Editar</button>
      </form>
      <Link to="/">ir a Lista de Productos</Link>
    </div>
  )
}
export default Editar