# 🚀 Guía Completa de Automatización CI/CD

Esta guía te explica cómo configurar un sistema de automatización completo con GitHub Actions y Render que:

- ✅ **Deploy automático** en cada push
- ✅ **Variables dinámicas** por ambiente
- ✅ **Testing automático** de tu API
- ✅ **Health checks** post-deploy
- ✅ **Release management** automático
- ✅ **Rollback** en caso de fallo

## 🎯 **Configuración Rápida**

### 1. Ejecutar Script de Setup
```bash
./scripts/setup-automation.sh
```

### 2. Configurar GitHub Secrets
Ve a `Settings > Secrets and variables > Actions` en tu repo y configura:

#### 🔐 **Secrets** (datos sensibles):
- `RENDER_API_KEY` - Tu API key de Render
- `SHARETRIBE_CLIENT_ID` - Tu client ID de Sharetribe
- `SHARETRIBE_CLIENT_SECRET` - Tu client secret de Sharetribe
- `STRIPE_PUBLISHABLE_KEY` - Tu publishable key de Stripe (opcional)
- `MAPBOX_ACCESS_TOKEN` - Tu access token de Mapbox (opcional)
- `RENDER_SERVICE_ID_PROD` - ID de tu servicio de producción en Render

#### 📊 **Variables** (por ambiente):
- `MARKETPLACE_NAME` - Nombre de tu marketplace
- `MARKETPLACE_ROOT_URL` - URL de tu marketplace
- `REACT_APP_ENV` - Ambiente (production/staging/development)
- `NODE_ENV` - Node environment

### 3. Crear Ramas para Ambientes
```bash
# Crear rama de staging
git checkout -b staging
git push -u origin staging

# Crear rama de desarrollo
git checkout -b develop
git push -u origin develop

# Volver a main
git checkout main
```

## 🔄 **Flujo de Trabajo**

### 📊 **Ambientes Automáticos**
- **main** → 🚀 **Producción** (deploy automático)
- **staging** → 🧪 **Staging** (testing)
- **develop** → 🔧 **Desarrollo** (features)

### 🚀 **Deploy Triggers**
```bash
# Deploy a producción
git push origin main

# Deploy a staging
git push origin staging

# Deploy a desarrollo
git push origin develop

# Deploy manual (cualquier ambiente)
# Ve a Actions > Deploy to Render > Run workflow
```

### 📦 **Release Management**
```bash
# Crear release automático (bump version)
# Ve a Actions > Release Management > Run workflow
# Selecciona: patch/minor/major

# O crear tag manualmente
git tag v1.0.0
git push origin v1.0.0
```

## 🔧 **Configuración de Ambientes**

### 🌍 **Variables por Ambiente**

#### Production:
```yaml
MARKETPLACE_NAME: "Mi Marketplace"
MARKETPLACE_ROOT_URL: "https://mi-marketplace.onrender.com"
REACT_APP_ENV: "production"
NODE_ENV: "production"
REACT_APP_CSP: "block"
```

#### Staging:
```yaml
MARKETPLACE_NAME: "Mi Marketplace - Staging"
MARKETPLACE_ROOT_URL: "https://staging-marketplace.onrender.com"
REACT_APP_ENV: "staging"
NODE_ENV: "production"
REACT_APP_CSP: "report"
```

#### Development:
```yaml
MARKETPLACE_NAME: "Mi Marketplace - Dev"
MARKETPLACE_ROOT_URL: "https://dev-marketplace.onrender.com"
REACT_APP_ENV: "development"
NODE_ENV: "development"
REACT_APP_CSP: "off"
```

## 🧪 **Testing Automático**

### ✅ **Tests que se ejecutan automáticamente**:
1. **Build test** - Verifica que la app compile
2. **Health check** - Verifica que el servicio responda
3. **API test** - Verifica que tu API personalizada funcione
4. **Dependencies check** - Verifica vulnerabilidades

### 🔍 **Health Checks**:
```bash
# Se verifican automáticamente:
GET /_health           # Salud general
GET /api/my-custom-data # Tu API personalizada
```

## 📋 **Comandos Útiles**

### 🔧 **GitHub CLI** (opcional):
```bash
# Instalar GitHub CLI
brew install gh

# Configurar secrets automáticamente
gh secret set RENDER_API_KEY --body "tu_api_key"
gh secret set SHARETRIBE_CLIENT_ID --body "tu_client_id"

# Configurar variables automáticamente
gh variable set MARKETPLACE_NAME --body "Mi Marketplace"
```

### 🚀 **Deploy Manual**:
```bash
# Trigger deploy vía API
curl -X POST \
  "https://api.render.com/v1/services/TU_SERVICE_ID/deploys" \
  -H "Authorization: Bearer TU_API_KEY"
```

## 🔍 **Monitoreo**

### 📊 **Dashboard de GitHub Actions**:
- Ve a: `Actions` tab en tu repository
- Monitorea todos los deploys en tiempo real
- Ve logs detallados de cada paso

### 🚨 **Notificaciones**:
- ✅ Deploy exitoso → Comentario en commit
- ❌ Deploy fallido → Email + issue automático
- 🔄 Rollback automático en caso de fallo

## 🛠️ **Troubleshooting**

### ❌ **Deploy Falla**:
1. Ve a Actions tab
2. Click en el workflow fallido
3. Revisa los logs detallados
4. Verifica secrets y variables

### 🔧 **Variables Faltantes**:
```bash
# Verificar variables configuradas
gh variable list

# Verificar secrets configurados
gh secret list
```

### 🚀 **Rollback Manual**:
```bash
# Via Render Dashboard
# O via GitHub: revert el commit y push
```

## 📈 **Próximos Pasos**

### 🔮 **Mejoras Futuras**:
- [ ] **Slack/Discord notifications**
- [ ] **Automated testing suite**
- [ ] **Performance monitoring**
- [ ] **Database migrations**
- [ ] **Blue-green deployments**

### 🏗️ **Multi-servicios**:
- [ ] **Frontend y Backend separados**
- [ ] **Database service**
- [ ] **CDN para assets**
- [ ] **Background jobs**

## 🎉 **¡Listo!**

Con esta configuración tienes:
- ✅ **CI/CD completamente automatizado**
- ✅ **Variables dinámicas por ambiente**
- ✅ **Testing automático**
- ✅ **Monitoreo en tiempo real**
- ✅ **Release management**
- ✅ **Sin hardcoding de variables**

**¡Haz push y disfruta del deploy automático!** 🚀
