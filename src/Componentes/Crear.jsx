import React, { useContext} from 'react'
import { insertProducto } from '../FirebaseConfig/firebaseCreate';
import { v4 as uuidv4 } from 'uuid'; //Bibliotecta para gestionar los id automaticos para los productos creados

/*PARA MANEJAR EL TEMA DE VALIDACION DE DATOS */
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from "yup";

import '../App.css';

/*COMPONENTE TIPO CONTEXTO PARA LLAMAR A LOS DATOS */
import { ProductoContext } from '../Context/ProductosProvider';

import Mostrar from './Mostrar';



const schema = object().shape({
  producto: string().required("El producto es obligatorio")
    .test('not-a-number', 'El producto no puede ser un número', value => {
      // Verificar que el valor no sea un número
      return isNaN(value);
    }),
  cantidad: number().typeError("La cantidad es obligatoria!!")
    .min(1, "La cantidad debe ser mayor o igual a 1"),
});


/* COMPONENTE PARA INSERTAR PRODUCTOS EN LA BASE DE DATOS */
function Crear() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fetchData } = useContext( ProductoContext)


  const onSubmit = (data) => {
    handleCrearProducto(data);

    alert("Producto Añadido!!")
    reset();
  }

  const handleCrearProducto = async (data) => {
    try {

      const { producto, cantidad } = data;

      const newProducto = {
        id: uuidv4(),
        producto: producto.trim(),
        cantidad: cantidad
      }

      await insertProducto(newProducto);
      await fetchData();
    } catch (error) {
      console.log("Error inserting producto", error);
    }
  }

  return (

    <div className="container">

      <h1>Altas de Productos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='form-group' >
          <label htmlFor="producto" id='producto' >Producto:</label>
          <input type="text" {...register("producto", { required: true })} className={errors.producto ? 'input-error' : ''} />
          {errors.producto && <span className='message-error' >{errors.producto.message}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="cantidad" id='cantidad' >Cantidad:</label>
          <input type="number" {...register("cantidad", { required: true })} className={errors.cantidad ? 'input-error' : ''} />
          {errors.cantidad && <span className='message-error' > {errors.cantidad.message}</span>}
        </div>
        <button className='button-submit' type='submit '>Enviar</button>
      </form>

    <Mostrar/>
      

    </div>


  )

}

export default Crear