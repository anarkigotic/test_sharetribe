#!/bin/bash

# 🚀 Script de Setup para Automatización GitHub Actions + Render
# Este script te guía para configurar todo automáticamente

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Configuración de Automatización GitHub Actions + Render${NC}"
echo "================================================================"

# Función para preguntar al usuario
ask() {
    local prompt="$1"
    local var_name="$2"
    echo -e "${YELLOW}$prompt${NC}"
    read -r "$var_name"
}

# Función para validar que una variable no esté vacía
validate_not_empty() {
    local var_value="$1"
    local var_name="$2"
    if [ -z "$var_value" ]; then
        echo -e "${RED}❌ Error: $var_name no puede estar vacío${NC}"
        exit 1
    fi
}

echo -e "${GREEN}📋 Paso 1: Configuración de GitHub Repository${NC}"
echo "=============================================="

ask "📝 ¿Cuál es el nombre de tu repositorio GitHub? (ej: usuario/mi-repo)" GITHUB_REPO
validate_not_empty "$GITHUB_REPO" "GitHub repository"

echo ""
echo -e "${GREEN}📋 Paso 2: Configuración de Render${NC}"
echo "=================================="

ask "🔑 ¿Cuál es tu Render API Key? (Render Dashboard > Account Settings > API Keys)" RENDER_API_KEY
validate_not_empty "$RENDER_API_KEY" "Render API Key"

ask "🌐 ¿Cuál es tu Service ID de Producción? (URL del servicio en Render)" RENDER_SERVICE_ID_PROD
validate_not_empty "$RENDER_SERVICE_ID_PROD" "Render Service ID Production"

echo ""
echo -e "${GREEN}📋 Paso 3: Configuración de Sharetribe${NC}"
echo "======================================="

ask "🔑 ¿Cuál es tu Sharetribe Client ID?" SHARETRIBE_CLIENT_ID
validate_not_empty "$SHARETRIBE_CLIENT_ID" "Sharetribe Client ID"

ask "🔐 ¿Cuál es tu Sharetribe Client Secret?" SHARETRIBE_CLIENT_SECRET
validate_not_empty "$SHARETRIBE_CLIENT_SECRET" "Sharetribe Client Secret"

echo ""
echo -e "${GREEN}📋 Paso 4: Configuración de Servicios Externos${NC}"
echo "=============================================="

ask "💳 ¿Cuál es tu Stripe Publishable Key? (opcional, presiona Enter para omitir)" STRIPE_PUBLISHABLE_KEY
ask "🗺️  ¿Cuál es tu Mapbox Access Token? (opcional, presiona Enter para omitir)" MAPBOX_ACCESS_TOKEN

echo ""
echo -e "${GREEN}📋 Paso 5: Configuración de Marketplace${NC}"
echo "======================================="

ask "🏪 ¿Cuál es el nombre de tu marketplace?" MARKETPLACE_NAME
validate_not_empty "$MARKETPLACE_NAME" "Marketplace Name"

ask "🌐 ¿Cuál es la URL de producción de tu marketplace?" MARKETPLACE_ROOT_URL
validate_not_empty "$MARKETPLACE_ROOT_URL" "Marketplace Root URL"

echo ""
echo -e "${BLUE}📦 Generando configuración...${NC}"

# Crear archivo de configuración
cat > .github/setup-config.md << EOF
# 🔧 Configuración de GitHub Actions

## 📋 Secrets de GitHub
Ve a: \`Settings > Secrets and variables > Actions > New repository secret\`

### 🔐 Repository Secrets:
\`\`\`
RENDER_API_KEY=$RENDER_API_KEY
SHARETRIBE_CLIENT_ID=$SHARETRIBE_CLIENT_ID
SHARETRIBE_CLIENT_SECRET=$SHARETRIBE_CLIENT_SECRET
EOF

if [ -n "$STRIPE_PUBLISHABLE_KEY" ]; then
    echo "STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY" >> .github/setup-config.md
fi

if [ -n "$MAPBOX_ACCESS_TOKEN" ]; then
    echo "MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN" >> .github/setup-config.md
fi

cat >> .github/setup-config.md << EOF
RENDER_SERVICE_ID_PROD=$RENDER_SERVICE_ID_PROD
\`\`\`

## 📊 Variables de Entorno
Ve a: \`Settings > Secrets and variables > Actions > Variables tab\`

### 🌍 Production Environment:
\`\`\`
MARKETPLACE_NAME=$MARKETPLACE_NAME
MARKETPLACE_ROOT_URL=$MARKETPLACE_ROOT_URL
REACT_APP_ENV=production
NODE_ENV=production
REACT_APP_CSP=block
REACT_APP_SHARETRIBE_USING_SSL=true
SERVER_SHARETRIBE_TRUST_PROXY=true
\`\`\`

## 🚀 Comandos para GitHub CLI (opcional)
Si tienes GitHub CLI instalado, puedes ejecutar:

\`\`\`bash
# Configurar secrets
gh secret set RENDER_API_KEY --body "$RENDER_API_KEY"
gh secret set SHARETRIBE_CLIENT_ID --body "$SHARETRIBE_CLIENT_ID"
gh secret set SHARETRIBE_CLIENT_SECRET --body "$SHARETRIBE_CLIENT_SECRET"
gh secret set RENDER_SERVICE_ID_PROD --body "$RENDER_SERVICE_ID_PROD"
EOF

if [ -n "$STRIPE_PUBLISHABLE_KEY" ]; then
    echo "gh secret set STRIPE_PUBLISHABLE_KEY --body \"$STRIPE_PUBLISHABLE_KEY\"" >> .github/setup-config.md
fi

if [ -n "$MAPBOX_ACCESS_TOKEN" ]; then
    echo "gh secret set MAPBOX_ACCESS_TOKEN --body \"$MAPBOX_ACCESS_TOKEN\"" >> .github/setup-config.md
fi

cat >> .github/setup-config.md << EOF

# Configurar variables
gh variable set MARKETPLACE_NAME --body "$MARKETPLACE_NAME"
gh variable set MARKETPLACE_ROOT_URL --body "$MARKETPLACE_ROOT_URL"
gh variable set REACT_APP_ENV --body "production"
gh variable set NODE_ENV --body "production"
\`\`\`

## ✅ Próximos Pasos
1. Configura los secrets y variables en GitHub
2. Haz push de estos cambios
3. ¡El deploy será automático!
EOF

echo ""
echo -e "${GREEN}✅ ¡Configuración completada!${NC}"
echo "================================"
echo -e "${YELLOW}📋 Revisa el archivo: .github/setup-config.md${NC}"
echo -e "${YELLOW}🔧 Sigue las instrucciones para configurar GitHub${NC}"
echo -e "${YELLOW}🚀 Después haz push y el deploy será automático${NC}"

echo ""
echo -e "${BLUE}📋 Resumen de automatización:${NC}"
echo "• ✅ Deploy automático en push a main"
echo "• ✅ Variables dinámicas por ambiente"
echo "• ✅ Health checks automáticos"
echo "• ✅ Testing de API personalizada"
echo "• ✅ Release management"
echo "• ✅ Rollback automático en caso de fallo"

echo ""
echo -e "${GREEN}🎉 ¡Listo para automatizar!${NC}"
