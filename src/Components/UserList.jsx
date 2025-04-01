import React, { Fragment } from "react";
import { motion } from "framer-motion";

const UserList = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
                <h1 className="text-3xl font-bold">Cargando...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mt-30 py-3 text-3xl md:text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
            >
                👥 Lista de Usuarios
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-gray-700 p-6"
            >
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="py-4 px-6 text-lg border-b border-gray-600 hover:bg-green-500 transition-all duration-300 rounded-md"
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default UserList;