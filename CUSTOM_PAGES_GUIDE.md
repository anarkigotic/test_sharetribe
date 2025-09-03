# 🎨 Guía Completa: Crear Páginas Personalizadas en Sharetribe

Esta guía documenta paso a paso cómo crear páginas completamente personalizadas en Sharetribe Web Template, desde páginas simples hasta páginas complejas con lógica personalizada.

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Conceptos Básicos](#conceptos-básicos)
3. [Ejemplo 1: Página Simple (Estática)](#ejemplo-1-página-simple-estática)
4. [Ejemplo 2: Página con Estado (Dinámica)](#ejemplo-2-página-con-estado-dinámica)
5. [Ejemplo 3: Página con API](#ejemplo-3-página-con-api)
6. [Ejemplo 4: Página con Formularios](#ejemplo-4-página-con-formularios)
7. [Ejemplo 5: Página con Autenticación](#ejemplo-5-página-con-autenticación)
8. [Estructura de Archivos](#estructura-de-archivos)
9. [Componentes Reutilizables](#componentes-reutilizables)
10. [Estilos y CSS](#estilos-y-css)
11. [Navegación y Enlaces](#navegación-y-enlaces)
12. [SEO y Meta Tags](#seo-y-meta-tags)
13. [Testing](#testing)
14. [Best Practices](#best-practices)

---

## 📋 Requisitos Previos

- Sharetribe Web Template configurado
- Conocimientos básicos de React
- Conocimientos básicos de CSS/JavaScript

---

## 💡 Conceptos Básicos

### Estructura de una Página en Sharetribe

```javascript
// Estructura básica de una página
const MyPage = () => {
  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page title="Mi Página" description="Descripción de mi página">
      <LayoutComposer areas={layoutAreas} className={css.layout}>
        {props => {
          const { Topbar, Main, Footer } = props;
          return (
            <>
              <Topbar as="header">
                <TopbarContainer />
              </Topbar>
              <Main as="main">
                {/* Tu contenido aquí */}
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
```

### Componentes Esenciales

- **Page**: Componente base para SEO y meta tags
- **LayoutComposer**: Maneja el layout de la página
- **TopbarContainer**: Barra de navegación superior
- **FooterContainer**: Pie de página

---

## 📄 Ejemplo 1: Página Simple (Estática)

Vamos a crear una página "Acerca de Nosotros" básica.

### 1.1 Crear el Componente

**Archivo:** `src/containers/AboutPage/AboutPage.js`

```javascript
import React from 'react';
import { Page, LayoutComposer } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './AboutPage.module.css';

const AboutPage = () => {
  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page
      title="Acerca de Nosotros"
      description="Conoce más sobre nuestra empresa y misión"
      schema={{
        '@type': 'AboutPage',
      }}
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
                <div className={css.container}>
                  <div className={css.hero}>
                    <h1 className={css.title}>Acerca de Nosotros</h1>
                    <p className={css.subtitle}>
                      Conectamos personas a través de un marketplace innovador
                    </p>
                  </div>

                  <section className={css.section}>
                    <h2>Nuestra Misión</h2>
                    <p>
                      Crear un espacio digital donde las personas puedan compartir, 
                      intercambiar y descubrir productos y servicios de manera segura 
                      y confiable.
                    </p>
                  </section>

                  <section className={css.section}>
                    <h2>Nuestra Visión</h2>
                    <p>
                      Ser el marketplace líder que transforma la manera en que las 
                      personas se conectan y hacen negocios en línea.
                    </p>
                  </section>

                  <section className={css.section}>
                    <h2>Nuestros Valores</h2>
                    <div className={css.values}>
                      <div className={css.value}>
                        <h3>🤝 Confianza</h3>
                        <p>Construimos relaciones basadas en la transparencia</p>
                      </div>
                      <div className={css.value}>
                        <h3>🚀 Innovación</h3>
                        <p>Siempre buscamos nuevas formas de mejorar</p>
                      </div>
                      <div className={css.value}>
                        <h3>🌍 Comunidad</h3>
                        <p>Creemos en el poder de la colaboración</p>
                      </div>
                    </div>
                  </section>
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

export default AboutPage;
```

### 1.2 Crear los Estilos

**Archivo:** `src/containers/AboutPage/AboutPage.module.css`

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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.subtitle {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.9;
}

.section {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
}

.section p {
  line-height: 1.6;
  color: #666;
}

.values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.value h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.value p {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  .values {
    grid-template-columns: 1fr;
  }
}
```

### 1.3 Registrar la Ruta

**En:** `src/routing/routeConfiguration.js`

```javascript
// 1. Importar el componente
const AboutPage = loadable(() => import(/* webpackChunkName: "AboutPage" */ '../containers/AboutPage/AboutPage'));

// 2. Agregar la ruta en el array de rutas
{
  path: '/acerca-de',
  name: 'AboutPage',
  component: AboutPage,
},
```

---

## 🔄 Ejemplo 2: Página con Estado (Dinámica)

Vamos a crear una página de contador con estado.

### 2.1 Crear el Componente

**Archivo:** `src/containers/CounterPage/CounterPage.js`

```javascript
import React, { useState, useEffect } from 'react';
import { Page, LayoutComposer, Button } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './CounterPage.module.css';

const CounterPage = () => {
  // Estados del componente
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [autoIncrement, setAutoIncrement] = useState(false);

  // Efecto para auto incremento
  useEffect(() => {
    let interval;
    if (autoIncrement) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoIncrement]);

  // Funciones del componente
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    addToHistory('Incremento', newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    addToHistory('Decremento', newCount);
  };

  const reset = () => {
    setCount(0);
    addToHistory('Reset', 0);
    setAutoIncrement(false);
  };

  const addToHistory = (action, value) => {
    const timestamp = new Date().toLocaleTimeString();
    setHistory(prev => [...prev, { action, value, timestamp }].slice(-10));
  };

  const toggleAutoIncrement = () => {
    setAutoIncrement(prev => !prev);
    if (!autoIncrement) {
      addToHistory('Auto incremento iniciado', count);
    } else {
      addToHistory('Auto incremento detenido', count);
    }
  };

  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page
      title="Contador Interactivo"
      description="Página de ejemplo con estado y funcionalidades dinámicas"
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
                <div className={css.container}>
                  <h1 className={css.title}>🔢 Contador Interactivo</h1>
                  
                  <div className={css.counterSection}>
                    <div className={css.display}>
                      <span className={css.count}>{count}</span>
                    </div>
                    
                    <div className={css.controls}>
                      <Button onClick={decrement} className={css.button}>
                        ➖ Decrementar
                      </Button>
                      <Button onClick={reset} className={css.resetButton}>
                        🔄 Reset
                      </Button>
                      <Button onClick={increment} className={css.button}>
                        ➕ Incrementar
                      </Button>
                    </div>

                    <div className={css.autoSection}>
                      <Button 
                        onClick={toggleAutoIncrement}
                        className={autoIncrement ? css.activeButton : css.button}
                      >
                        {autoIncrement ? '⏸️ Detener Auto' : '▶️ Auto Incremento'}
                      </Button>
                    </div>

                    <div className={css.stats}>
                      <div className={css.stat}>
                        <strong>Valor actual:</strong> {count}
                      </div>
                      <div className={css.stat}>
                        <strong>Estado:</strong> {autoIncrement ? 'Auto incrementando' : 'Manual'}
                      </div>
                      <div className={css.stat}>
                        <strong>Signo:</strong> {count > 0 ? 'Positivo' : count < 0 ? 'Negativo' : 'Cero'}
                      </div>
                    </div>
                  </div>

                  <div className={css.historySection}>
                    <h2>📋 Historial de Acciones</h2>
                    <div className={css.history}>
                      {history.length === 0 ? (
                        <p className={css.noHistory}>No hay acciones registradas</p>
                      ) : (
                        history.slice().reverse().map((entry, index) => (
                          <div key={index} className={css.historyEntry}>
                            <span className={css.action}>{entry.action}</span>
                            <span className={css.value}>Valor: {entry.value}</span>
                            <span className={css.timestamp}>{entry.timestamp}</span>
                          </div>
                        ))
                      )}
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

export default CounterPage;
```

### 2.2 Crear los Estilos

**Archivo:** `src/containers/CounterPage/CounterPage.module.css`

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.title {
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.counterSection {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.display {
  margin-bottom: 2rem;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  font-family: 'Courier New', monospace;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 3px solid #e9ecef;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: #007bff;
  color: white;
  transition: all 0.3s ease;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.resetButton {
  composes: button;
  background: #dc3545;
}

.resetButton:hover {
  background: #c82333;
}

.activeButton {
  composes: button;
  background: #28a745;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
  100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
}

.autoSection {
  margin-bottom: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  text-align: left;
}

.stat {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.historySection {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.historySection h2 {
  margin-top: 0;
  color: #333;
}

.history {
  max-height: 300px;
  overflow-y: auto;
}

.noHistory {
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.historyEntry {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
}

.historyEntry:last-child {
  border-bottom: none;
}

.action {
  font-weight: 600;
  color: #333;
}

.value {
  color: #007bff;
  font-weight: 500;
}

.timestamp {
  color: #6c757d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .button, .resetButton, .activeButton {
    width: 200px;
  }
  
  .count {
    font-size: 3rem;
  }
  
  .historyEntry {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

---

## 🌐 Ejemplo 3: Página con API

Vamos a crear una página que consume APIs externas.

### 3.1 Crear el Componente

**Archivo:** `src/containers/NewsPage/NewsPage.js`

```javascript
import React, { useState, useEffect } from 'react';
import { Page, LayoutComposer, Button } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './NewsPage.module.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');

  // Categorías disponibles
  const categories = [
    { id: 'general', name: '📰 General', color: '#007bff' },
    { id: 'technology', name: '💻 Tecnología', color: '#28a745' },
    { id: 'business', name: '💼 Negocios', color: '#ffc107' },
    { id: 'entertainment', name: '🎬 Entretenimiento', color: '#dc3545' },
    { id: 'health', name: '🏥 Salud', color: '#6f42c1' },
    { id: 'science', name: '🔬 Ciencia', color: '#20c997' }
  ];

  // Función para obtener noticias
  const fetchNews = async (selectedCategory = category) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulamos una API de noticias (en producción usar una API real)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      // Datos de ejemplo (en producción vendría de una API real)
      const mockNews = [
        {
          id: 1,
          title: `Última hora en ${categories.find(c => c.id === selectedCategory)?.name || 'Noticias'}`,
          description: 'Esta es una noticia de ejemplo que muestra cómo integrar APIs externas en tu página personalizada.',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: 'News API'
        },
        {
          id: 2,
          title: 'Cómo crear páginas dinámicas en Sharetribe',
          description: 'Guía completa para desarrolladores sobre la creación de páginas personalizadas con estado y APIs.',
          url: '#',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: 'Tech Blog'
        },
        {
          id: 3,
          title: 'Mejores prácticas para React Hooks',
          description: 'Descubre las mejores prácticas para usar useState, useEffect y otros hooks en tus componentes.',
          url: '#',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: 'React News'
        }
      ];
      
      setNews(mockNews);
      
    } catch (err) {
      setError('Error al cargar las noticias');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Función para cambiar categoría
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    fetchNews(newCategory);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page
      title="Centro de Noticias"
      description="Mantente al día con las últimas noticias y tendencias"
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
                <div className={css.container}>
                  <div className={css.header}>
                    <h1 className={css.title}>📰 Centro de Noticias</h1>
                    <p className={css.subtitle}>
                      Mantente informado con las últimas noticias
                    </p>
                  </div>

                  {/* Filtros de categoría */}
                  <div className={css.categories}>
                    <h2>Categorías</h2>
                    <div className={css.categoryButtons}>
                      {categories.map(cat => (
                        <Button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={category === cat.id ? css.activeCategoryButton : css.categoryButton}
                          style={{ 
                            backgroundColor: category === cat.id ? cat.color : '#f8f9fa',
                            color: category === cat.id ? 'white' : '#333'
                          }}
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Botón de recarga */}
                  <div className={css.controls}>
                    <Button 
                      onClick={() => fetchNews()}
                      disabled={loading}
                      className={css.refreshButton}
                    >
                      {loading ? '🔄 Cargando...' : '🔄 Actualizar Noticias'}
                    </Button>
                  </div>

                  {/* Contenido principal */}
                  <div className={css.content}>
                    {loading && (
                      <div className={css.loading}>
                        <div className={css.spinner}></div>
                        <p>Cargando noticias...</p>
                      </div>
                    )}

                    {error && (
                      <div className={css.error}>
                        <h3>😞 Error</h3>
                        <p>{error}</p>
                        <Button onClick={() => fetchNews()} className={css.retryButton}>
                          Intentar de nuevo
                        </Button>
                      </div>
                    )}

                    {!loading && !error && news.length > 0 && (
                      <div className={css.newsGrid}>
                        {news.map(article => (
                          <article key={article.id} className={css.newsCard}>
                            <div className={css.cardHeader}>
                              <h3 className={css.newsTitle}>{article.title}</h3>
                              <span className={css.source}>{article.source}</span>
                            </div>
                            <p className={css.description}>{article.description}</p>
                            <div className={css.cardFooter}>
                              <span className={css.date}>
                                {formatDate(article.publishedAt)}
                              </span>
                              <a href={article.url} className={css.readMore}>
                                Leer más →
                              </a>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {!loading && !error && news.length === 0 && (
                      <div className={css.empty}>
                        <h3>📭 No hay noticias</h3>
                        <p>No se encontraron noticias para esta categoría.</p>
                      </div>
                    )}
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

export default NewsPage;
```

### 3.2 Crear los Estilos

**Archivo:** `src/containers/NewsPage/NewsPage.module.css`

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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.categories {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.categories h2 {
  margin: 0 0 1rem 0;
  color: #333;
}

.categoryButtons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.categoryButton {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  background: #f8f9fa;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.categoryButton:hover {
  border-color: #007bff;
  background: #e7f3ff;
}

.activeCategoryButton {
  composes: categoryButton;
  border-color: transparent;
  transform: scale(1.05);
}

.controls {
  text-align: center;
  margin-bottom: 2rem;
}

.refreshButton {
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.refreshButton:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
}

.refreshButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.content {
  min-height: 400px;
}

.loading {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 12px;
  border: 1px solid #f5c6cb;
}

.error h3 {
  margin-top: 0;
}

.retryButton {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

.empty {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #6c757d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.newsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.newsCard {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.newsCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.newsTitle {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.4;
  flex: 1;
  margin-right: 1rem;
}

.source {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #495057;
  white-space: nowrap;
}

.description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.cardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.date {
  font-size: 0.85rem;
  color: #6c757d;
}

.readMore {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.readMore:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .categoryButtons {
    justify-content: center;
  }
  
  .newsGrid {
    grid-template-columns: 1fr;
  }
  
  .cardHeader {
    flex-direction: column;
  }
  
  .newsTitle {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
```

---

## 📝 Ejemplo 4: Página con Formularios

Vamos a crear una página de contacto con formulario completo.

### 4.1 Crear el Componente

**Archivo:** `src/containers/ContactPage/ContactPage.js`

```javascript
import React, { useState } from 'react';
import { Page, LayoutComposer, Button } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './ContactPage.module.css';

const ContactPage = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  // Estados de UI
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Categorías disponibles
  const categories = [
    { value: 'general', label: 'Consulta General' },
    { value: 'support', label: 'Soporte Técnico' },
    { value: 'business', label: 'Consulta Comercial' },
    { value: 'partnership', label: 'Asociaciones' },
    { value: 'press', label: 'Prensa' }
  ];

  // Función para manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En producción, aquí harías la llamada real a tu API:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log('Formulario enviado:', formData);
      setSubmitted(true);
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });

    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
    setErrors({});
    setSubmitted(false);
  };

  const layoutAreas = `
    topbar
    main
    footer
  `;

  return (
    <Page
      title="Contacto"
      description="Ponte en contacto con nosotros. Estamos aquí para ayudarte"
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
                <div className={css.container}>
                  <div className={css.header}>
                    <h1 className={css.title}>📞 Contáctanos</h1>
                    <p className={css.subtitle}>
                      Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
                    </p>
                  </div>

                  <div className={css.content}>
                    {/* Información de contacto */}
                    <div className={css.contactInfo}>
                      <h2>📍 Información de Contacto</h2>
                      <div className={css.infoGrid}>
                        <div className={css.infoItem}>
                          <h3>📧 Email</h3>
                          <p>contacto@mimarketplace.com</p>
                        </div>
                        <div className={css.infoItem}>
                          <h3>📱 Teléfono</h3>
                          <p>+1 (555) 123-4567</p>
                        </div>
                        <div className={css.infoItem}>
                          <h3>🕒 Horario</h3>
                          <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
                        </div>
                        <div className={css.infoItem}>
                          <h3>🌍 Ubicación</h3>
                          <p>Ciudad, País</p>
                        </div>
                      </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div className={css.formSection}>
                      <h2>✉️ Envíanos un Mensaje</h2>
                      
                      {submitted && (
                        <div className={css.successMessage}>
                          <h3>🎉 ¡Mensaje enviado con éxito!</h3>
                          <p>Gracias por contactarnos. Te responderemos pronto.</p>
                          <Button onClick={resetForm} className={css.newMessageButton}>
                            Enviar otro mensaje
                          </Button>
                        </div>
                      )}

                      {!submitted && (
                        <form onSubmit={handleSubmit} className={css.form}>
                          <div className={css.formRow}>
                            <div className={css.formGroup}>
                              <label htmlFor="name" className={css.label}>
                                Nombre *
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`${css.input} ${errors.name ? css.inputError : ''}`}
                                placeholder="Tu nombre completo"
                              />
                              {errors.name && (
                                <span className={css.errorMessage}>{errors.name}</span>
                              )}
                            </div>

                            <div className={css.formGroup}>
                              <label htmlFor="email" className={css.label}>
                                Email *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`${css.input} ${errors.email ? css.inputError : ''}`}
                                placeholder="tu@email.com"
                              />
                              {errors.email && (
                                <span className={css.errorMessage}>{errors.email}</span>
                              )}
                            </div>
                          </div>

                          <div className={css.formGroup}>
                            <label htmlFor="category" className={css.label}>
                              Categoría
                            </label>
                            <select
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className={css.select}
                            >
                              {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className={css.formGroup}>
                            <label htmlFor="subject" className={css.label}>
                              Asunto *
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className={`${css.input} ${errors.subject ? css.inputError : ''}`}
                              placeholder="Breve descripción del tema"
                            />
                            {errors.subject && (
                              <span className={css.errorMessage}>{errors.subject}</span>
                            )}
                          </div>

                          <div className={css.formGroup}>
                            <label htmlFor="message" className={css.label}>
                              Mensaje *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              className={`${css.textarea} ${errors.message ? css.inputError : ''}`}
                              placeholder="Escribe tu mensaje aquí..."
                              rows={5}
                            />
                            {errors.message && (
                              <span className={css.errorMessage}>{errors.message}</span>
                            )}
                            <div className={css.charCount}>
                              {formData.message.length} caracteres
                            </div>
                          </div>

                          <div className={css.formActions}>
                            <Button
                              type="button"
                              onClick={resetForm}
                              className={css.resetButton}
                              disabled={submitting}
                            >
                              🔄 Limpiar
                            </Button>
                            <Button
                              type="submit"
                              className={css.submitButton}
                              disabled={submitting}
                            >
                              {submitting ? '📤 Enviando...' : '📨 Enviar Mensaje'}
                            </Button>
                          </div>
                        </form>
                      )}
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

export default ContactPage;
```

### 4.2 Crear los Estilos

**Archivo:** `src/containers/ContactPage/ContactPage.module.css`

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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
}

.contactInfo {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.contactInfo h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1.5rem;
}

.infoGrid {
  display: grid;
  gap: 1.5rem;
}

.infoItem h3 {
  margin: 0 0 0.5rem 0;
  color: #007bff;
  font-size: 1rem;
}

.infoItem p {
  margin: 0;
  color: #666;
}

.formSection {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.formSection h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1.5rem;
}

.successMessage {
  text-align: center;
  padding: 2rem;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  color: #155724;
}

.successMessage h3 {
  margin-top: 0;
  color: #155724;
}

.newMessageButton {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

.form {
  display: grid;
  gap: 1.5rem;
}

.formRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}

.input,
.select,
.textarea {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.inputError {
  border-color: #dc3545;
}

.inputError:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.errorMessage {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.charCount {
  text-align: right;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.formActions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.resetButton {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.resetButton:hover:not(:disabled) {
  background: #5a6268;
}

.submitButton {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submitButton:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
}

.resetButton:disabled,
.submitButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 968px) {
  .content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .formRow {
    grid-template-columns: 1fr;
  }
  
  .formActions {
    flex-direction: column;
  }
  
  .resetButton,
  .submitButton {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 0.5rem;
  }
  
  .contactInfo,
  .formSection {
    padding: 1.5rem;
  }
}
```

---

## 🔐 Ejemplo 5: Página con Autenticación

Vamos a crear una página que requiera autenticación.

### 5.1 Crear el Componente

**Archivo:** `src/containers/DashboardPage/DashboardPage.js`

```javascript
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Page, LayoutComposer, Button } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './DashboardPage.module.css';

const DashboardPage = () => {
  // Obtener usuario actual del estado global
  const currentUser = useSelector(state => state.user.currentUser);
  
  // Estados locales
  const [userStats, setUserStats] = useState({
    totalListings: 0,
    totalTransactions: 0,
    totalEarnings: 0,
    totalReviews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario
  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos (en producción sería una llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo
      setUserStats({
        totalListings: 12,
        totalTransactions: 34,
        totalEarnings: 2450.50,
        totalReviews: 28
      });

      setRecentActivity([
        {
          id: 1,
          type: 'listing',
          title: 'Nueva publicación creada',
          description: 'Bicicleta de montaña',
          date: new Date(Date.now() - 3600000).toISOString(),
          icon: '📝'
        },
        {
          id: 2,
          type: 'transaction',
          title: 'Venta completada',
          description: 'Cámara fotográfica digital',
          date: new Date(Date.now() - 7200000).toISOString(),
          icon: '💰'
        },
        {
          id: 3,
          type: 'review',
          title: 'Nueva reseña recibida',
          description: '5 estrellas por excelente servicio',
          date: new Date(Date.now() - 86400000).toISOString(),
          icon: '⭐'
        }
      ]);
      
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const layoutAreas = `
    topbar
    main
    footer
  `;

  // Si el usuario no está autenticado, mostrar mensaje
  if (!currentUser) {
    return (
      <Page title="Acceso Requerido">
        <LayoutComposer areas={layoutAreas} className={css.layout}>
          {props => {
            const { Topbar, Main, Footer } = props;
            return (
              <>
                <Topbar as="header" className={css.topbar}>
                  <TopbarContainer />
                </Topbar>
                <Main as="main" className={css.main}>
                  <div className={css.container}>
                    <div className={css.noAuth}>
                      <h1>🔐 Acceso Requerido</h1>
                      <p>Necesitas iniciar sesión para acceder a tu dashboard.</p>
                      <Button className={css.loginButton}>
                        Iniciar Sesión
                      </Button>
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
  }

  return (
    <Page
      title="Mi Dashboard"
      description="Panel de control personal del usuario"
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
                <div className={css.container}>
                  {/* Header del dashboard */}
                  <div className={css.header}>
                    <div className={css.welcome}>
                      <h1 className={css.title}>
                        👋 ¡Hola, {currentUser.attributes?.profile?.displayName || 'Usuario'}!
                      </h1>
                      <p className={css.subtitle}>
                        Bienvenido a tu dashboard personal
                      </p>
                    </div>
                    <div className={css.actions}>
                      <Button onClick={loadUserData} className={css.refreshButton}>
                        🔄 Actualizar
                      </Button>
                    </div>
                  </div>

                  {loading ? (
                    <div className={css.loading}>
                      <div className={css.spinner}></div>
                      <p>Cargando datos...</p>
                    </div>
                  ) : (
                    <>
                      {/* Estadísticas */}
                      <div className={css.statsGrid}>
                        <div className={css.statCard}>
                          <div className={css.statIcon}>📋</div>
                          <div className={css.statContent}>
                            <h3>Publicaciones</h3>
                            <p className={css.statNumber}>{userStats.totalListings}</p>
                          </div>
                        </div>
                        
                        <div className={css.statCard}>
                          <div className={css.statIcon}>🤝</div>
                          <div className={css.statContent}>
                            <h3>Transacciones</h3>
                            <p className={css.statNumber}>{userStats.totalTransactions}</p>
                          </div>
                        </div>
                        
                        <div className={css.statCard}>
                          <div className={css.statIcon}>💰</div>
                          <div className={css.statContent}>
                            <h3>Ganancias</h3>
                            <p className={css.statNumber}>{formatCurrency(userStats.totalEarnings)}</p>
                          </div>
                        </div>
                        
                        <div className={css.statCard}>
                          <div className={css.statIcon}>⭐</div>
                          <div className={css.statContent}>
                            <h3>Reseñas</h3>
                            <p className={css.statNumber}>{userStats.totalReviews}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actividad reciente */}
                      <div className={css.section}>
                        <h2 className={css.sectionTitle}>📈 Actividad Reciente</h2>
                        <div className={css.activityList}>
                          {recentActivity.map(activity => (
                            <div key={activity.id} className={css.activityItem}>
                              <div className={css.activityIcon}>
                                {activity.icon}
                              </div>
                              <div className={css.activityContent}>
                                <h4>{activity.title}</h4>
                                <p>{activity.description}</p>
                                <span className={css.activityDate}>
                                  {formatDate(activity.date)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Acciones rápidas */}
                      <div className={css.section}>
                        <h2 className={css.sectionTitle}>⚡ Acciones Rápidas</h2>
                        <div className={css.quickActions}>
                          <Button className={css.actionButton}>
                            ➕ Nueva Publicación
                          </Button>
                          <Button className={css.actionButton}>
                            📊 Ver Estadísticas
                          </Button>
                          <Button className={css.actionButton}>
                            💬 Mensajes
                          </Button>
                          <Button className={css.actionButton}>
                            ⚙️ Configuración
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
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

export default DashboardPage;
```

### 5.2 Crear los Estilos

**Archivo:** `src/containers/DashboardPage/DashboardPage.module.css`

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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.welcome h1 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 2rem;
}

.subtitle {
  margin: 0;
  color: #666;
}

.refreshButton {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refreshButton:hover {
  background: #0056b3;
}

.loading {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.statCard {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.statCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.statIcon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 12px;
}

.statContent h3 {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.statNumber {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.sectionTitle {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.activityList {
  display: grid;
  gap: 1rem;
}

.activityItem {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.activityIcon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
}

.activityContent {
  flex: 1;
}

.activityContent h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
}

.activityContent p {
  margin: 0 0 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.activityDate {
  font-size: 0.8rem;
  color: #6c757d;
}

.quickActions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.actionButton {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: center;
}

.actionButton:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
  transform: translateY(-2px);
}

.noAuth {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.noAuth h1 {
  color: #333;
  margin-bottom: 1rem;
}

.noAuth p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.loginButton {
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .welcome h1 {
    font-size: 1.5rem;
  }
  
  .statsGrid {
    grid-template-columns: 1fr;
  }
  
  .quickActions {
    grid-template-columns: 1fr;
  }
  
  .activityItem {
    flex-direction: column;
    text-align: center;
  }
}
```

### 5.3 Registrar Ruta con Autenticación

En `src/routing/routeConfiguration.js`:

```javascript
// Importar el componente
const DashboardPage = loadable(() => import(/* webpackChunkName: "DashboardPage" */ '../containers/DashboardPage/DashboardPage'));

// Agregar la ruta con autenticación requerida
{
  path: '/dashboard',
  name: 'DashboardPage',
  component: DashboardPage,
  auth: true,  // Esto requiere autenticación
  authPage: 'LoginPage', // Página de redirección si no está autenticado
},
```

---

## 📁 Estructura de Archivos Recomendada

```
src/containers/MiPagina/
├── MiPagina.js                 ← Componente principal
├── MiPagina.module.css         ← Estilos específicos
├── MiPagina.test.js           ← Tests (opcional)
├── components/                 ← Subcomponentes (si es necesario)
│   ├── Header.js
│   └── Footer.js
└── utils/                      ← Utilidades específicas
    ├── helpers.js
    └── constants.js
```

---

## 🔗 Navegación y Enlaces

### Crear Enlaces a tus Páginas

```javascript
// En cualquier componente
import { NamedLink } from '../components';

// Enlace simple
<NamedLink name="AboutPage">
  Acerca de Nosotros
</NamedLink>

// Enlace con clases CSS
<NamedLink name="ContactPage" className={css.navLink}>
  Contacto
</NamedLink>

// Enlace con parámetros
<NamedLink name="UserProfile" params={{ userId: '123' }}>
  Ver Perfil
</NamedLink>
```

### Agregar Enlaces al Menú Principal

En `src/containers/TopbarContainer/TopbarContainer.js`:

```javascript
// Agregar tus páginas al menú de navegación
const navigation = [
  { name: 'LandingPage', label: 'Inicio' },
  { name: 'SearchPage', label: 'Buscar' },
  { name: 'AboutPage', label: 'Acerca de' },      // ← Tu página
  { name: 'ContactPage', label: 'Contacto' },     // ← Tu página
  { name: 'NewsPage', label: 'Noticias' },        // ← Tu página
];
```

---

## 📈 SEO y Meta Tags

### Configurar SEO en tus Páginas

```javascript
<Page
  title="Mi Página Personalizada"
  description="Descripción detallada para motores de búsqueda"
  schema={{
    '@type': 'WebPage',
    '@id': 'https://miapp.com/mi-pagina',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': 'https://miapp.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Mi Página' }
      ]
    }
  }}
  socialSharing={{
    title: 'Mi Página Personalizada',
    description: 'Descripción para redes sociales',
    image: 'https://miapp.com/images/social-share.jpg'
  }}
>
```

---

## 🧪 Testing de Páginas

### Ejemplo de Test

**Archivo:** `src/containers/AboutPage/AboutPage.test.js`

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import AboutPage from './AboutPage';

// Mock store
const mockStore = createStore(() => ({
  user: { currentUser: null },
  marketplaceData: { entities: {} }
}));

const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('AboutPage', () => {
  test('renders page title', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByText('Acerca de Nosotros')).toBeInTheDocument();
  });

  test('renders mission section', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByText('Nuestra Misión')).toBeInTheDocument();
  });

  test('renders values section', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByText('🤝 Confianza')).toBeInTheDocument();
    expect(screen.getByText('🚀 Innovación')).toBeInTheDocument();
    expect(screen.getByText('🌍 Comunidad')).toBeInTheDocument();
  });
});
```

---

## ✨ Best Practices

### 1. **Performance**
```javascript
// Lazy loading de componentes
const MiPagina = loadable(() => import('./MiPagina'));

// Memoización de componentes pesados
const ComponentePesado = React.memo(({ data }) => {
  // ... componente pesado
});

// useCallback para funciones
const handleClick = useCallback(() => {
  // ... lógica
}, [dependency]);
```

### 2. **Accesibilidad**
```javascript
// Usar elementos semánticos
<main>
  <article>
    <header>
      <h1>Título Principal</h1>
    </header>
    <section>
      <h2>Sección</h2>
    </section>
  </article>
</main>

// Labels para formularios
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Alt text para imágenes
<img src="imagen.jpg" alt="Descripción de la imagen" />
```

### 3. **Estado Global vs Local**
```javascript
// Estado local para UI
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({});

// Estado global para datos compartidos
const currentUser = useSelector(state => state.user.currentUser);
const listings = useSelector(state => state.marketplaceData.entities.listings);
```

### 4. **Manejo de Errores**
```javascript
const [error, setError] = useState(null);

try {
  const data = await fetchData();
  setData(data);
} catch (err) {
  setError('Error cargando datos');
  console.error('Error:', err);
}

// Error boundary para errores de renderizado
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}
```

---

## 🚀 Deployment

### 1. **Testing Local**
```bash
# Ejecutar en desarrollo
yarn dev

# Visitar: http://localhost:3000/tu-pagina
```

### 2. **Build y Deploy**
```bash
# Commit de cambios
git add -A
git commit -m "Add new custom page: MiPagina"
git push

# Deploy automático en Render
```

### 3. **Verificación**
- ✅ La página carga correctamente
- ✅ Los estilos se aplican bien
- ✅ La navegación funciona
- ✅ Los formularios validan
- ✅ Las APIs responden
- ✅ SEO meta tags están presentes

---

## 📚 Recursos Adicionales

- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [CSS Modules Guide](https://github.com/css-modules/css-modules)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**¡Tus páginas personalizadas están listas! 🎉**

Con esta guía puedes crear cualquier tipo de página personalizada en Sharetribe, desde páginas simples hasta complejas aplicaciones con estado, APIs y autenticación.
