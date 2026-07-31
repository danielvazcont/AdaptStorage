# AdaptStorage

Sistema de almacenamiento y gestión de archivos en la nube con niveles de seguridad por usuario. Proyecto de la materia **Ingeniería de Software y Mejores Prácticas**.

🔗 **Demo en producción:** https://adapt-storage.page.gd/

## Características

- Autenticación de usuarios con niveles de acceso (roles / tipos de usuario).
- Subida de archivos (PDF, DOCX, TXT, imágenes, audio, etc.) con extracción de texto de documentos.
- Biblioteca con búsqueda, ordenamiento y paginación.
- Administración de usuarios.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 17 (Create React App), React Router 5, Axios |
| Backend | PHP 8 (mysqli), Composer (`smalot/pdfparser`) |
| Base de datos | MySQL |

## Estructura

```
AdaptStorage/
├── AdaptStorageReact/   # Frontend React
└── PHPDocumentos/       # Backend PHP + API
```

## Puesta en marcha (local)

### Frontend
```bash
cd AdaptStorageReact
npm install
npm start
```
Configura la URL del backend en `AdaptStorageReact/.env`:
```
REACT_APP_SERVER_URL=http://localhost:8000/
```

### Backend
1. Copia `PHPDocumentos/config.example.php` como `PHPDocumentos/config.php` y rellena tus credenciales de MySQL.
2. Instala dependencias PHP:
   ```bash
   cd PHPDocumentos
   composer install
   ```
3. Importa el esquema de la base de datos en tu servidor MySQL.
4. Sirve el backend (por ejemplo con el servidor embebido de PHP):
   ```bash
   php -S localhost:8000
   ```

## Despliegue

El proyecto está desplegado en **InfinityFree** (frontend + backend en el mismo dominio para evitar problemas de CORS). El build de React (`npm run build`) y los archivos PHP conviven en `htdocs`.

> ⚠️ `config.php` (credenciales) no se versiona: está en `.gitignore`. Usa `config.example.php` como referencia.

## Autores

- José Daniel Vázquez Franco
- Carlos Alberto Conchas Montañés
- Juan Guillermo Uribe Parra
