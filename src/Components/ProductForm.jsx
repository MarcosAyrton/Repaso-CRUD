import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";

function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const agregarProducto = () => {
    if (!nombre || !precio || !stock) return alert("Todos los campos son obligatorios");

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
    };


    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        ➕ Agregar Producto
      </motion.h1>

      <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white mb-2">Nombre del Producto</label>
                <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
                />
            </div>
            
            <div>
                <label htmlFor="precio" className="block text-sm font-medium text-white mb-2">Precio</label>
                <input
                id="precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
                />
            </div>
            
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-white mb-2">Stock</label>
                <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
                />
            </div>
        </div>


        <Button color="primary" className="mt-4 w-full" onClick={agregarProducto}>
          📦 Agregar Producto
        </Button>
      </div>
    </div>
  );
}

export default ProductForm;
