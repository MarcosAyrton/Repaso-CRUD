import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { Link } from "react-router-dom";

// Productos iniciales
const productosIniciales = [
  { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
  { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
  { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
];

// Obtener productos desde localStorage
const getStoredProducts = () => {
  const storedProducts = localStorage.getItem("productos");
  return storedProducts ? JSON.parse(storedProducts) : productosIniciales;
};

function Home() {
  const [productos, setProductos] = useState(getStoredProducts());

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Eliminar un producto individualmente
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  // Eliminar todos los productos y restaurar los iniciales después de recargar
  const eliminarTodos = () => {
    setProductos([]);
    localStorage.removeItem("productos"); // Evita guardar una lista vacía
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4">
      {/* Título animado */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        📦 Inventario de Productos
      </motion.h1>

      {/* Botón para añadir un nuevo producto */}
      <Link to="/ProductForm">
        <Button color="primary" variant="shadow" className="mb-4">
          ➕ Agregar Producto
        </Button>
      </Link>

      {/* Tabla de productos */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-gray-700"
      >
        <Table aria-label="Lista de productos" removeWrapper className="w-full border-collapse">
          <TableHeader>
            <TableColumn className="py-3 px-6 bg-blue-400 text-white text-lg font-semibold">PRODUCTO</TableColumn>
            <TableColumn className="py-3 px-6 bg-blue-400 text-white text-lg font-semibold">PRECIO ($)</TableColumn>
            <TableColumn className="py-3 px-6 bg-blue-400 text-white text-lg font-semibold">STOCK</TableColumn>
            <TableColumn className="py-3 px-6 bg-blue-400 text-white text-lg font-semibold">ACCIONES</TableColumn>
          </TableHeader>

          <TableBody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <TableRow key={producto.id} className="hover:bg-green-500 transition-all duration-300">
                  <TableCell className="py-4 px-6 text-lg border-b border-gray-600 text-center">
                    {producto.nombre}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-lg border-b border-gray-600 text-center">
                    ${producto.precio}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-lg border-b border-gray-600 text-center">
                    {producto.stock}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-lg border-b border-gray-600 text-center">
                    <Button color="danger" onClick={() => eliminarProducto(producto.id)}>
                      ❌ Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-4 px-6 text-lg border-b border-gray-600 text-center">
                  ❌ No hay productos en la lista
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Botón para eliminar todos */}
      {productos.length > 0 && (
        <Button color="danger" className="mt-4" onClick={eliminarTodos}>
          🗑️ Eliminar Todos
        </Button>
      )}
    </div>
  );
}

export default Home;