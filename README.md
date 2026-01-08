# TicketMonster 👹🎫
Sistema de Venta de Boletos para Eventos (Full Stack MERN)

Este proyecto es una aplicación web completa para la gestión y venta de boletos para eventos, desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js).

## 🚀 Instalación y Ejecución (Cómo correrlo en otra PC)

Sigue estos pasos EXACTOS para clonar y ejecutar el proyecto en cualquier computadora:

### 1. Clonar el repositorio
Abre una terminal y ejecuta:
```bash
git clone https://github.com/Tiboryeah/TicketMonster.git
cd TicketMonster
```

### 2. Instalar Dependencias
Debes instalar las librerías tanto del servidor (Backend) como del cliente (Frontend).
Abre el proyecto en Visual Studio Code y usa dos terminales, o ejecuta uno por uno:

**Terminal 1 (Backend):**
```bash
cd server
npm install
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
```

### 3. Configurar Variables de Entorno (IMPORTANTE ⚠️)
Por seguridad, las contraseñas de la base de datos no se suben a GitHub. Debes crear el archivo manualmente.
1. Ve a la carpeta `server`.
2. Crea un archivo nuevo llamado `.env`.
3. Pega el siguiente contenido (Son las claves reales de la base de datos en la nube):

```env
PORT=5000
MONGODB_URI=mongodb+srv://cliente:cliente123@cluster0.tgbudpw.mongodb.net/ticket-system?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecretkey123
```

*(Nota: Esta conexión está configurada con un usuario de acceso restringido exclusivamente a la base de datos de TicketMonster).*

### 4. Arrancar el Proyecto
Necesitas mantener dos terminales abiertas corriendo simultáneamente:

**Terminal 1 (Backend - Servidor):**
```bash
cd server
node index.js
```
*(Debe decir: "✅ MongoDB Connected")*

**Terminal 2 (Frontend - Interfaz):**
```bash
cd client
npm run dev
```
*(Te dará un link, ábrelo en tu navegador, usualmente http://localhost:5173/)*

---

## ✨ Características Principales

### 👤 Usuario (Cliente)
*   **Autenticación**: Registro y Login seguro.
*   **Catálogo**: Búsqueda, filtros y vista de eventos "Próximos".
*   **Compras**: Selección avanzada (varios tipos de boletos a la vez), Carrito de Compras y Pasarela de Pago simulada (detecta Visa/Mastercard, valida fechas).
*   **Perfil**: Historial de compras ("Mis Boletos") y descarga de comprobantes.

### 🛠️ Administrador (Backend)
*   **Dashboard**: Estadísticas reales (Ventas totales, Ingresos, Compradores Únicos).
*   **Gestión de Eventos**: Crear, Editar y Eliminar eventos con imágenes.
*   **Control de Stock**: Inventario de boletos en tiempo real.
*   **Reportes**: Lista de asistentes por evento.

---

## 🛠️ Tecnologías Usadas
*   **Frontend**: React + Vite, Framer Motion (Animaciones), Lucide React (Iconos).
*   **Backend**: Node.js, Express.
*   **Base de Datos**: MongoDB Atlas (Nube).
*   **Estilos**: CSS (Glassmorphism Design).
