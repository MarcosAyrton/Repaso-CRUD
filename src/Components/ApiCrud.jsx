import React, { useState } from "react";
import { motion } from "framer-motion";

const ApiCrud = () => {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const apiUrl = "https://api.restful-api.dev/objects";

  const createObject = async () => {
    const newObject = {
      name,
      data: {
        features,
        price: parseFloat(price),
        year: parseInt(year, 10),
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newObject),
      });
      const data = await response.json();
      localStorage.setItem("objectId", data.id);
      setResponseMessage(`Object created successfully: ${JSON.stringify(data)}`);
    } catch (error) {
      setResponseMessage(`Error creating object: ${error.message}`);
    }
  };

  const editObject = async () => {
    const objectId = localStorage.getItem("objectId");
    if (!objectId) return setResponseMessage("No object ID found in localStorage.");

    const updatedObject = {
      name,
      data: {
        features,
        price: parseFloat(price),
        year: parseInt(year, 10),
      },
    };

    try {
      const response = await fetch(`${apiUrl}/${objectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedObject),
      });
      const data = await response.json();
      setResponseMessage(`Object updated successfully: ${JSON.stringify(data)}`);
    } catch (error) {
      setResponseMessage(`Error updating object: ${error.message}`);
    }
  };

  const deleteObject = async () => {
    const objectId = localStorage.getItem("objectId");
    if (!objectId) return setResponseMessage("No object ID found in localStorage.");

    try {
      await fetch(`${apiUrl}/${objectId}`, { method: "DELETE" });
      localStorage.removeItem("objectId");
      setResponseMessage("Object deleted successfully.");
    } catch (error) {
      setResponseMessage(`Error deleting object: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        🛠️ CRUD API REST
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-2xl bg-gray-700 p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="features" className="block text-sm font-medium text-white mb-2">
              Features
            </label>
            <input
              id="features"
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-white mb-2">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-white mb-2">
              Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-full p-2 border-2 border-green-500 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createObject}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
        >
          ➕ Create Object
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={editObject}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
        >
          ✏️ Edit Object
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={deleteObject}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
        >
          🗑️ Delete Object
        </motion.button>

        {responseMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-2 bg-gray-600 rounded-md text-center"
          >
            {responseMessage}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ApiCrud;
