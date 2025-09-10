# Proyecto Carrito Mock (Frontend + Backend)

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
