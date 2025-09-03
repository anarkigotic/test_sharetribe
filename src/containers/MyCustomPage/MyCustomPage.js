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
      // En desarrollo, usar el puerto del servidor API directamente
      // En producción, usar la URL base actual
      const apiPort = process.env.REACT_APP_DEV_API_SERVER_PORT || '3500';
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? `http://localhost:${apiPort}` 
        : '';
      const url = `${baseUrl}/api/my-custom-data${queryParams ? `?${queryParams}` : ''}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      if (result.success) {
        setCustomData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error en fetchCustomData:', err);
      setError('Error conectando con la API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

    // Función para obtener datos externos
  const fetchExternalData = async () => {
    try {
      // En desarrollo, usar el puerto del servidor API directamente
      const apiPort = process.env.REACT_APP_DEV_API_SERVER_PORT || '3500';
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? `http://localhost:${apiPort}` 
        : '';
      const url = `${baseUrl}/api/external-data`;
      
      const response = await fetch(url);
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
      // En desarrollo, usar el puerto del servidor API directamente
      const apiPort = process.env.REACT_APP_DEV_API_SERVER_PORT || '3500';
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? `http://localhost:${apiPort}` 
        : '';
      const url = `${baseUrl}/api/my-custom-data`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category
        }),
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
      console.error('Error creando elemento:', err);
      alert('Error creando elemento: ' + err.message);
    }
  };

    // Función para eliminar elemento
  const deleteItem = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

    try {
      // En desarrollo, usar el puerto del servidor API directamente
      const apiPort = process.env.REACT_APP_DEV_API_SERVER_PORT || '3500';
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? `http://localhost:${apiPort}` 
        : '';
      const url = `${baseUrl}/api/my-custom-data/${id}`;
      
      const response = await fetch(url, {
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
      console.error('Error eliminando elemento:', err);
      alert('Error eliminando elemento: ' + err.message);
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
