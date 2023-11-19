// import logo from './logo.svg';
import Crear from './Componentes/Crear';
import Menu from './Componentes/Menu';
import Mostrar from './Componentes/Mostrar';

import ProductosProvider from './Context/ProductosProvider';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <ProductosProvider>
        <BrowserRouter>
          <Menu>
            {/* <Crear /> */}
            {/* <Mostrar /> */}
          </Menu>
        </BrowserRouter>

      </ProductosProvider>

    </div>
  );
}

export default App;
