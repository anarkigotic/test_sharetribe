const express = require('express');

/**
 * Mi API personalizada - Ejemplo completo
 * Ruta: /api/my-custom-api
 */

// Ejemplo de datos simulados (en producción usarías una base de datos)
let customData = [
  { id: 1, name: 'Producto 1', price: 100, category: 'electronics' },
  { id: 2, name: 'Producto 2', price: 200, category: 'clothing' },
  { id: 3, name: 'Producto 3', price: 150, category: 'books' }
];
let nextId = customData.length + 1;

// Middleware de validación
const validateCustomData = (req, res, next) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, error: 'Faltan campos requeridos: name, price, category' });
  }
  if (typeof name !== 'string' || typeof category !== 'string' || typeof price !== 'number') {
    return res.status(400).json({ success: false, error: 'Tipos de datos inválidos para name, price o category' });
  }
  next();
};

// GET - Obtener todos los elementos
const getCustomData = (req, res) => {
  try {
    // Tu lógica personalizada aquí
    const { category, minPrice, maxPrice } = req.query;
    
    let filteredData = customData;
    
    // Filtrar por categoría si se especifica
    if (category) {
      filteredData = filteredData.filter(item => item.category === category);
    }
    
    // Filtrar por rango de precios
    if (minPrice) {
      filteredData = filteredData.filter(item => item.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filteredData = filteredData.filter(item => item.price <= parseInt(maxPrice));
    }
    
    res.status(200).json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      message: 'Datos obtenidos exitosamente'
    });
    
  } catch (error) {
    console.error('Error en getCustomData:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// POST - Crear nuevo elemento
const createCustomData = (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    // Validaciones
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: name, price, category'
      });
    }
    
    // Crear nuevo elemento
    const newItem = {
      id: customData.length + 1,
      name,
      price: parseFloat(price),
      category,
      createdAt: new Date().toISOString()
    };
    
    customData.push(newItem);
    
    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Elemento creado exitosamente'
    });
    
  } catch (error) {
    console.error('Error en createCustomData:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// PUT - Actualizar elemento
const updateCustomData = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    
    const itemIndex = customData.findIndex(item => item.id === parseInt(id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Elemento no encontrado'
      });
    }
    
    // Actualizar elemento
    if (name) customData[itemIndex].name = name;
    if (price) customData[itemIndex].price = parseFloat(price);
    if (category) customData[itemIndex].category = category;
    customData[itemIndex].updatedAt = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      data: customData[itemIndex],
      message: 'Elemento actualizado exitosamente'
    });
    
  } catch (error) {
    console.error('Error en updateCustomData:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// DELETE - Eliminar elemento
const deleteCustomData = (req, res) => {
  try {
    const { id } = req.params;
    
    const itemIndex = customData.findIndex(item => item.id === parseInt(id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Elemento no encontrado'
      });
    }
    
    const deletedItem = customData.splice(itemIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      data: deletedItem,
      message: 'Elemento eliminado exitosamente'
    });
    
  } catch (error) {
    console.error('Error en deleteCustomData:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// Endpoint para integración con API externa (ejemplo)
const getExternalData = async (req, res) => {
  try {
    // Ejemplo: obtener datos de una API externa
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const externalData = await response.json();
    
    // Procesar los datos como necesites
    const processedData = externalData.map(post => ({
      id: post.id,
      title: post.title,
      content: post.body.substring(0, 100) + '...',
      source: 'external-api'
    }));
    
    res.status(200).json({
      success: true,
      data: processedData,
      message: 'Datos externos obtenidos exitosamente'
    });
    
  } catch (error) {
    console.error('Error en getExternalData:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener datos externos'
    });
  }
};

module.exports = {
  getCustomData,
  createCustomData,
  updateCustomData,
  deleteCustomData,
  getExternalData,
  validateCustomData
};
