import { db } from "../FirebaseConfig/firebase";

import { collection, addDoc, getDocs, doc, deleteDoc, query, where, getDoc, updateDoc } from "firebase/firestore";


const productoCollection = collection(db, "productos");

/*Inserta Producto */
export const insertProducto = async (productos) => {
    try {

        const docRef = await addDoc(productoCollection, productos)
        // console.log("Se creo un nuevo producto con ID:", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


/*Trae productos */
export const mostrarProducto = async () => {
    const querySnapshot = await getDocs(productoCollection);
    const productos = [];
    querySnapshot.forEach((doc) => {
        productos.push(doc.data());
    });
    return productos;
};

/*BORRA PRODUCTO */


export const borrarProducto = async (id) => {
    const queryCondition = where("id", "==", id);
    const q = query(productoCollection, queryCondition);

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Solo borrar el primer documento encontrado (asumiendo que hay uno)
            const firstDoc = querySnapshot.docs[0];
            await deleteDoc(doc(productoCollection, firstDoc.id));
            // console.log("Documento borrado:", firstDoc.id);

        } else {
            console.log("No se encontraron documentos coincidentes.");
        }
        // await deleteDoc(doc(productoCollection), id);
    } catch (error) {
        console.error(error);
    }
};

/*BUSCAR PRODUCTO */

export const buscarProducto = async (id) => {
    const queryCondition = where("id", "==", id);
    const q = query(productoCollection, queryCondition);

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0].data();
            // console.log("Documento a editar:", firstDoc);
            return firstDoc;

        } else {
            console.log("No se encontraron documentos coincidentes.");
        }
    } catch (error) {
        console.log(error);
    }
}

/* EDITA PRODUCTO */

export const editarProducto = async (prodEditado, id) => {
    const queryCondition = where("id", "==", id);
    const q = query(productoCollection, queryCondition);

    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // querySnapshot.forEach(async (documento) => {
                const documento = querySnapshot.docs[0];
                const documentoRef = doc(productoCollection, documento.id);
            //     // const existingData = documento.data();
            //     await updateDoc(documentoRef, {
            //         producto: prodEditado[0].producto,
            //         cantidad: prodEditado[0].cantidad
            //     });
            //    console.log("Documento actualizado:", prodEditado[0].cantidad);
            // });
            await updateDoc(documentoRef, {
                producto: prodEditado[0].producto,
                cantidad: prodEditado[0].cantidad
              });

              

        } else {
            console.log("No se encontraron documentos coincidentes.");
        }
    } catch (error) {
        console.error(error);
    }
};