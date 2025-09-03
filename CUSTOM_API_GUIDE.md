# 🚀 Guía Completa: Crear API Personalizada en Sharetribe

Esta guía documenta paso a paso cómo agregar tu propia API personalizada con operaciones CRUD completas en Sharetribe Web Template.

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Crear el Backend API](#paso-1-crear-el-backend-api)
3. [Paso 2: Registrar las Rutas](#paso-2-registrar-las-rutas)
4. [Paso 3: Crear el Frontend](#paso-3-crear-el-frontend)
5. [Paso 4: Agregar la Ruta de Navegación](#paso-4-agregar-la-ruta-de-navegación)
6. [Paso 5: Testing y Deployment](#paso-5-testing-y-deployment)
7. [APIs Disponibles](#apis-disponibles)
8. [Troubleshooting](#troubleshooting)

---

## 📋 Requisitos Previos

- Sharetribe Web Template configurado y funcionando
- Node.js v16.18.1 o superior
- Yarn instalado
- Conocimientos básicos de JavaScript/React

---

## 🔧 Paso 1: Crear el Backend API

### 1.1 Crear el archivo principal de la API

**Archivo:** `server/api/my-custom-api.js`

```javascript
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
  getExternalData
};
```

### 1.2 Instalar dependencias necesarias

```bash
yarn add node-fetch
```

---

## 🛣️ Paso 2: Registrar las Rutas

### 2.1 Modificar el archivo `server/apiRouter.js`

**Cambios a realizar:**

1. **Importar tu API personalizada** (línea ~23):

```javascript
// Importar mi API personalizada
const { 
  getCustomData, 
  createCustomData, 
  updateCustomData, 
  deleteCustomData, 
  getExternalData 
} = require('./api/my-custom-api');
```

2. **Agregar middleware para JSON** (línea ~37):

```javascript
// Parse JSON bodies for regular API calls
router.use(bodyParser.json());
```

3. **Registrar las rutas** (al final del archivo, antes de `module.exports`):

```javascript
// ================ MIS APIs PERSONALIZADAS ================ //

// CRUD endpoints para mis datos personalizados
router.get('/my-custom-data', getCustomData);          // GET /api/my-custom-data
router.post('/my-custom-data', createCustomData);      // POST /api/my-custom-data
router.put('/my-custom-data/:id', updateCustomData);   // PUT /api/my-custom-data/1
router.delete('/my-custom-data/:id', deleteCustomData); // DELETE /api/my-custom-data/1

// Endpoint para datos externos
router.get('/external-data', getExternalData);         // GET /api/external-data
```

---

## 🎨 Paso 3: Crear el Frontend

### 3.1 Crear el componente React principal

**Archivo:** `src/containers/MyCustomPage/MyCustomPage.js`

```javascript
import React, { useState, useEffect } from 'react';
import { Page, LayoutComposer } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './MyCustomPage.module.css';

const MyCustomPage = () => {
  // Estados para manejar datos y UI
  const [customData, setCustomData] = useState([]);
  const [externalData, setExternalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  });

  // Función para obtener datos de mi API personalizada
  const fetchCustomData = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Construir query parameters
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/my-custom-data${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setCustomData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error conectando con la API');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener datos externos
  const fetchExternalData = async () => {
    try {
      const response = await fetch('/api/external-data');
      const result = await response.json();
      
      if (result.success) {
        setExternalData(result.data);
      }
    } catch (err) {
      console.error('Error obteniendo datos externos:', err);
    }
  };

  // Función para crear nuevo elemento
  const createNewItem = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/my-custom-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Limpiar formulario
        setFormData({ name: '', price: '', category: '' });
        // Recargar datos
        fetchCustomData();
        alert('¡Elemento creado exitosamente!');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Error creando elemento');
    }
  };

  // Función para eliminar elemento
  const deleteItem = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    
    try {
      const response = await fetch(`/api/my-custom-data/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchCustomData();
        alert('Elemento eliminado exitosamente');
      } else {
        alert('Error eliminando elemento');
      }
    } catch (err) {
      alert('Error eliminando elemento');
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchCustomData();
    fetchExternalData();
  }, []);

  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page
      title="Mi API Personalizada - Demo"
      description="Demostración de API personalizada en Sharetribe"
    >
      <LayoutComposer areas={layoutAreas} className={css.layout}>
        {props => {
          const { Topbar, Main, Footer } = props;
          return (
            <>
              <Topbar as="header" className={css.topbar}>
                <TopbarContainer />
              </Topbar>
              <Main as="main" className={css.main}>
                <div className={css.content}>
                  <h1>🚀 Mi API Personalizada</h1>
                  <p>Ejemplo completo de cómo integrar tu propia API en Sharetribe</p>

                  {/* Sección: Crear nuevo elemento */}
                  <div className={css.apiSection}>
                    <h2>➕ Crear Nuevo Elemento</h2>
                    <form onSubmit={createNewItem} className={css.form}>
                      <div className={css.formGroup}>
                        <label>Nombre:</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className={css.formGroup}>
                        <label>Precio:</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required
                        />
                      </div>
                      <div className={css.formGroup}>
                        <label>Categoría:</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          required
                        >
                          <option value="">Selecciona una categoría</option>
                          <option value="electronics">Electrónicos</option>
                          <option value="clothing">Ropa</option>
                          <option value="books">Libros</option>
                        </select>
                      </div>
                      <div className={css.buttonGroup}>
                        <button type="submit" className={css.submitButton}>
                          Crear Elemento
                        </button>
                        <button 
                          type="button" 
                          onClick={() => fetchCustomData()}
                          className={css.clearButton}
                        >
                          Recargar Datos
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Sección: Mis datos personalizados */}
                  <div className={css.apiSection}>
                    <h2>📊 Mis Datos Personalizados</h2>
                    
                    {loading && <div className={css.loading}>Cargando datos...</div>}
                    {error && <div className={css.error}>Error: {error}</div>}
                    
                    <div className={css.dataGrid}>
                      {customData.map(item => (
                        <div key={item.id} className={css.dataCard}>
                          <h3>{item.name}</h3>
                          <p><strong>Precio:</strong> ${item.price}</p>
                          <p><strong>Categoría:</strong> {item.category}</p>
                          <button 
                            onClick={() => deleteItem(item.id)}
                            style={{
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              marginTop: '0.5rem'
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sección: Datos externos */}
                  <div className={css.apiSection}>
                    <h2>🌐 Datos de API Externa</h2>
                    <div className={css.dataGrid}>
                      {externalData.map(item => (
                        <div key={item.id} className={css.dataCard}>
                          <h3>{item.title}</h3>
                          <p>{item.content}</p>
                          <p><small>Fuente: {item.source}</small></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filtros dinámicos */}
                  <div className={css.apiSection}>
                    <h2>🔍 Filtros Dinámicos</h2>
                    <div className={css.buttonGroup}>
                      <button 
                        onClick={() => fetchCustomData({ category: 'electronics' })}
                        className={css.customButton}
                      >
                        Solo Electrónicos
                      </button>
                      <button 
                        onClick={() => fetchCustomData({ minPrice: 150 })}
                        className={css.customButton}
                      >
                        Precio > $150
                      </button>
                      <button 
                        onClick={() => fetchCustomData()}
                        className={css.clearButton}
                      >
                        Todos
                      </button>
                    </div>
                  </div>
                </div>
              </Main>
              <Footer>
                <FooterContainer />
              </Footer>
            </>
          );
        }}
      </LayoutComposer>
    </Page>
  );
};

export default MyCustomPage;
```

### 3.2 Crear los estilos CSS

**Archivo:** `src/containers/MyCustomPage/MyCustomPage.module.css`

```css
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.topbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main {
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.customButton {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin: 1rem 0;
  transition: background-color 0.2s ease;
}

.customButton:hover {
  background-color: #ff5252;
}

.apiSection {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dataGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.dataCard {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
}

.dataCard h3 {
  margin: 0 0 0.5rem 0;
  color: #343a40;
}

.dataCard p {
  margin: 0.25rem 0;
  color: #6c757d;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  margin: 1rem 0;
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
}

.formGroup label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #343a40;
}

.formGroup input,
.formGroup select {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 16px;
}

.formGroup input:focus,
.formGroup select:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.buttonGroup {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.submitButton {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.submitButton:hover {
  background-color: #218838;
}

.clearButton {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.clearButton:hover {
  background-color: #5a6268;
}
```

---

## 🛣️ Paso 4: Agregar la Ruta de Navegación

### 4.1 Modificar el archivo `src/routing/routeConfiguration.js`

1. **Importar el componente** (línea ~43):

```javascript
// Mi página personalizada con API propia
const MyCustomPage = loadable(() => import(/* webpackChunkName: "MyCustomPage" */ '../containers/MyCustomPage/MyCustomPage'));
```

2. **Agregar la ruta** (antes del `preview` endpoint):

```javascript
// Mi página personalizada con API propia
{
  path: '/mi-api',
  name: 'MyCustomPage',
  component: MyCustomPage,
},
```

---

## 🧪 Paso 5: Testing y Deployment

### 5.1 Testing Local

```bash
# Iniciar el servidor de desarrollo
yarn dev

# En otra terminal, probar las APIs:

# GET - Obtener todos los datos
curl http://localhost:3500/api/my-custom-data

# POST - Crear nuevo elemento
curl -X POST http://localhost:3500/api/my-custom-data \
  -H "Content-Type: application/json" \
  -d '{"name": "iPhone 15", "price": 999, "category": "electronics"}'

# GET - Filtrar por categoría
curl "http://localhost:3500/api/my-custom-data?category=electronics"

# DELETE - Eliminar elemento
curl -X DELETE http://localhost:3500/api/my-custom-data/1

# GET - API externa
curl http://localhost:3500/api/external-data
```

### 5.2 Acceder a la página

- **Local**: `http://localhost:3000/mi-api`
- **Producción**: `https://tu-app.onrender.com/mi-api`

### 5.3 Deployment

```bash
# Commit y push de cambios
git add -A
git commit -m "Add custom API with CRUD operations"
git push

# El deployment en Render será automático
```

---

## 📖 APIs Disponibles

### Endpoints CRUD

| Método | URL | Descripción | Body |
|--------|-----|-------------|------|
| `GET` | `/api/my-custom-data` | Obtener todos los elementos | - |
| `GET` | `/api/my-custom-data?category=electronics` | Filtrar por categoría | - |
| `GET` | `/api/my-custom-data?minPrice=100&maxPrice=500` | Filtrar por rango de precio | - |
| `POST` | `/api/my-custom-data` | Crear nuevo elemento | `{"name": "...", "price": 100, "category": "..."}` |
| `PUT` | `/api/my-custom-data/:id` | Actualizar elemento | `{"name": "...", "price": 200}` |
| `DELETE` | `/api/my-custom-data/:id` | Eliminar elemento | - |
| `GET` | `/api/external-data` | Obtener datos de API externa | - |

### Ejemplos de Respuesta

**GET Success:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15",
      "price": 999,
      "category": "electronics",
      "createdAt": "2025-09-03T12:45:26.333Z"
    }
  ],
  "total": 1,
  "message": "Datos obtenidos exitosamente"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Elemento no encontrado"
}
```

---

## 🔧 Troubleshooting

### Problemas Comunes

1. **Error: `Cannot find module 'node-fetch'`**
   ```bash
   yarn add node-fetch
   ```

2. **Error: `require() of ES Module not supported`**
   - Usar dynamic import: `const fetch = (await import('node-fetch')).default;`

3. **Error: `JSON body not parsed`**
   - Verificar que `router.use(bodyParser.json());` esté agregado

4. **Error: `404 Not Found`**
   - Verificar que las rutas estén registradas en `apiRouter.js`
   - Verificar que el componente esté importado en `routeConfiguration.js`

5. **Puerto 3000 ocupado**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

### Logs Útiles

```bash
# Ver logs del servidor API
# Los logs aparecen en la terminal donde ejecutas yarn dev
# Buscar por: "[1] API server listening on 3500"

# Verificar que las rutas estén cargadas
# Buscar por: "Loading env from file:.env.development"
```

---

## 🚀 Próximos Pasos

### Para Producción

1. **Conectar Base de Datos Real**
   - MongoDB Atlas
   - PostgreSQL en Supabase
   - MySQL en PlanetScale

2. **Agregar Autenticación**
   ```javascript
   // Middleware de autenticación
   const authenticateUser = (req, res, next) => {
     // Verificar JWT token
     // ...
   };
   ```

3. **Validaciones Robustas**
   ```javascript
   const Joi = require('joi');
   
   const schema = Joi.object({
     name: Joi.string().min(3).required(),
     price: Joi.number().positive().required(),
     category: Joi.string().valid('electronics', 'clothing', 'books').required()
   });
   ```

4. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutos
     max: 100 // límite de 100 requests por IP
   });
   ```

### Para Desarrollo

1. **Testing Automatizado**
   ```javascript
   // tests/api.test.js
   const request = require('supertest');
   const app = require('../server/app');
   
   describe('Custom API', () => {
     test('GET /api/my-custom-data', async () => {
       const response = await request(app)
         .get('/api/my-custom-data')
         .expect(200);
       
       expect(response.body.success).toBe(true);
     });
   });
   ```

2. **Documentación Automática**
   ```javascript
   /**
    * @swagger
    * /api/my-custom-data:
    *   get:
    *     summary: Obtiene todos los elementos
    *     responses:
    *       200:
    *         description: Lista de elementos
    */
   ```

---

## 📚 Recursos Adicionales

- [Sharetribe Developer Docs](https://www.sharetribe.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 📝 Notas

- Esta guía documenta la implementación exacta realizada
- Los datos se almacenan en memoria (para producción usar base de datos)
- La API externa es solo un ejemplo (usar tus APIs reales)
- Todos los archivos están listos para personalización según tu negocio

---

**¡Tu API personalizada está lista! 🎉**

Ahora puedes agregar cualquier lógica de negocio que necesites siguiendo este mismo patrón.
