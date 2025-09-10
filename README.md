# 🛒 Proyecto Carrito Mock (Frontend + Backend)

Este proyecto consiste en un **frontend en React con Bootstrap** y un **backend mock en Node.js con Express**, que simulan un flujo de compra de productos con un carrito y recomendaciones inteligentes.

---

## 🚀 Requisitos previos

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 📦 Instalación

1. Clonar este repositorio:

   ```bash
   git clone <url-del-repo>
   cd <nombre-del-repo>
   ```

2. Instalar dependencias del backend:

   ```bash
   cd mock-carrito
   npm install
   ```

3. Instalar dependencias del frontend:
   ```bash
   cd carrito
   npm install
   ```

---

## ▶️ Ejecución del proyecto

### Backend (Express + Mock API)

Desde la carpeta `mock-carrito/` ejecutar:

```bash
npm start
```

Esto levanta el servidor en [http://localhost:3001](http://localhost:3001).

### Frontend (React + Bootstrap)

Desde la carpeta `frontend/` ejecutar:

```bash
npm run dev
```

Esto levanta el frontend en [http://localhost:5173](http://localhost:5173) (Vite).

---

## 🧪 Pruebas

El proyecto usa **node:test**, **assert** y **supertest** para pruebas del backend.

### Ejecutar todas las pruebas:

Desde la carpeta `mock-carrito/`:

```bash
npm test
```

### Ejecutar un archivo de pruebas específico:

```bash
node --test tests/cart.test.js
node --test tests/inventory.test.js
node --test tests/product.test.js
```

---

## 📖 Notas

- Los datos mock (`metafields.json`, `inventory.json`, `cart.json`, `products.json`) se encuentran en la carpeta `src/db/` del backend.
- El frontend se comunica con el backend a través de la ruta base `http://localhost:3001/`.
- El sistema de recomendaciones usa una heurística simple basada en similitud de etiquetas (proporción de etiquetas en común).

---

## ✨ Funcionalidades principales

- **Carrito de compras** mock con persistencia en `cart.json`.
- **Productos con inventario por ciudad**.
- **Selección de metros, color y ciudad** con validaciones de stock.
- **Recomendaciones inteligentes** con similitud de etiquetas.
- **Pruebas unitarias** para endpoints del backend.

---

## 🤖 Recomendaciones "inteligentes" (IA ligera)

Implementamos un sistema de recomendación basado en **similitud de etiquetas**.
Cada producto tiene un conjunto de tags.
La similitud se calcula con la fórmula:

    score = (número de etiquetas en común) / (número total de etiquetas del producto consultado)

Luego se ordenan los productos por mayor score y se muestran los 2–3 más relevantes.
Este enfoque es una heurística local (no usa modelos de Machine Learning)
pero permite sugerir productos complementarios de manera sencilla y rápida.

---

# 📝 Mini ADR (Architectural Decision Record)

## 📌 Contexto

Este proyecto requiere una estructura clara, mantenible y escalable para facilitar el desarrollo y la colaboración.

## ⚡ Decisiones Técnicas Clave

### 1️⃣ Estructura del Proyecto

Se optó por una estructura modular 🗂️, separando componentes, servicios y utilidades para mejorar la organización y facilitar el mantenimiento.

### 2️⃣ Lenguaje y Framework

Se eligió **JavaScript** y **Express** 🚀 para el backend por instrucciones de la prueba.
Para el frontend se decidió usar **TypeScript** con **React** ⚛️ usando **Vite** ⚡ por su popularidad, comunidad activa y rapidez.
Para estilar la aplicación se usó **Bootstrap** 🎨 junto a la librería **React-Bootstrap** 🧩 por su facilidad para construir interfaces de usuario dinámicas.

### 3️⃣ Control de Versiones

Se utiliza **Git** y **GitHub** 🌐 para el control de versiones y la colaboración entre desarrolladores.

4️⃣ Estilo de Código

Se adoptó **ESLint** 🔍 y **Prettier** ✨ para mantener un estilo de código consistente y evitar errores comunes.

5️⃣ Gestión de Dependencias

Se utiliza **npm** 📦 para la gestión de dependencias, asegurando versiones estables y actualizaciones controladas.

---

### ✅ Estado

Estas decisiones pueden revisarse y adaptarse según evolucionen los requerimientos del proyecto.

---

# 🚀 Documentación — Workflow n8n recommendations

Este documento explica cómo importar y probar el workflow de recomendaciones creado en n8n.

El workflow recibe un payload y devuelve un listado de productos recomendados utilizando una heurística simple de similitud de etiquetas.

## 📥 Importar Workflow

1. Abre tu instancia de n8n.

2. Dirígete a **Workflows → Import from File**.

3. Selecciona el archivo `recommendations-workflow.json` (adjunto en este repositorio).

4. Guarda el workflow con el nombre: **Recommendations API**.

## ⚙️ Estructura del Workflow

El flujo contiene 3 nodos principales:

1. Webhook (POST)

   - URL: /recommendations

   - Método: POST

   - Recibe payload JSON con el formato:

```json
{
	"sku": "CANTO-ROBLE-100",
	"quantity": 2,
	"properties": {
		"desired_meters": 250,
		"city": "Bogotá",
		"color": "roble"
	}
}
```

2. Function (calcRecommendations)

   - Aplica la fórmula de similitud:

```ini
score = (número de etiquetas en común) / (número total de etiquetas del producto consultado)
```

- Ordena los productos por score y devuelve los 2–3 más relevantes.

3. Respond to Webhook

   - Devuelve un objeto JSON con el resultado.

   - Ejemplo:

```json
{
	"recommended": [
		{
			"sku": "CANTO-NOGAL-100",
			"tags": ["nogal", "canto", "100m"],
			"score": 0.67
		},
		{ "sku": "PEGANTE-MADERA", "tags": ["adhesivo", "madera"], "score": 0.0 }
	]
}
```

## ▶️ Probar el Workflow

1. Activar el Workflow

   - Haz clic en Activate dentro de n8n.

   - Copia la Webhook URL generada (ejemplo: `https://username.app.n8n.cloud/webhook-test/recommendations`)

2. Configurar la request en Postman

   - **Abre Postman** y crea una nueva petición.

   - **Método:** `POST`

   - **URL:** `https://username.app.n8n.cloud/webhook-test/recommendations`

   - En la pestaña **Body**, selecciona `raw` y el formato `JSON`, luego pega el siguiente payload:

```json
{
	"sku": "CANTO-ROBLE-100",
	"quantity": 2,
	"properties": {
		"desired_meters": 250,
		"city": "Bogotá",
		"color": "roble"
	}
}
```

3. Ejecutar y revisar la respuesta
   - Haz clic en **Send**.
   - La respuesta esperada será similar a:

```json
{
	"recommended": [
		{
			"sku": "CANTO-NOGAL-100",
			"tags": ["nogal", "canto", "100m"],
			"score": 0.67
		},
		{
			"sku": "PEGANTE-MADERA",
			"tags": ["adhesivo", "madera"],
			"score": 0.0
		},
		{
			"sku": "CERA-PROTECTOR",
			"tags": ["acabado", "protector"],
			"score": 0.0
		}
	]
}
```

## 🧪 Validaciones

Si el payload no contiene sku o se produce algún error, la respuesta incluirá un error:

```json
{ "message": "sku is required" }
```

El cálculo de similitud es local, no depende de servicios externos.

## 📌 Notas

- El archivo `products.json` de ejemplo está embebido en el workflow.

- Puedes reemplazarlo con un **HTTP Request Node** para obtener productos desde el backend real.

- Ajusta `slice(0,3)` en el Function node si deseas más o menos recomendaciones.
