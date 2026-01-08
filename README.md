# TicketSync - Sistema de Venta de Boletos

Este es un proyecto completo de sistema de boletos con roles de Cliente y Administrador.

## Tecnologías Utilizadas
- **Frontend**: React (Vite), Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer, JWT.
- **Estética**: Diseño moderno con Glassmorphism y gradientes vibrantes.

## Pasos para Levantar el Proyecto

### 1. Requisitos
- Node.js instalado.
- MongoDB instalado localmente o una cuenta en MongoDB Atlas.

### 2. Configuración del Backend
1. Entra a la carpeta `server`: `cd server`
2. Instala dependencias: `npm install`
3. Configura el archivo `.env`:
   - Cambia `MONGODB_URI` por tu cadena de conexión (ya está configurada para MongoDB local por defecto).
   - El secreto de JWT ya tiene un valor por defecto.
4. (Opcional) Carga datos iniciales: `node seed.js`
5. Inicia el servidor: `node index.js` (o usa `nodemon` si lo tienes instalado).

### 3. Configuración el Frontend
1. Entra a la carpeta `client`: `cd client`
2. Instala dependencias: `npm install`
3. Inicia el cliente: `npm run dev`
4. Abre el navegador en la URL indicada (usualmente `http://localhost:5173`).

## Funcionalidades Implementadas
- **Clientes**: Registro, Login, Ver Catálogo, Detalle de Evento, Compra Simulada, Perfil con "Mis Boletos".
- **Administrador**: Dashboard Estadístico, CRUD completo de Eventos (Crear, Editar, Eliminar, Listar), Control de Inventario y Precios por tipo de boleto.
