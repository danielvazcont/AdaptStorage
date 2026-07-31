<?php
/**
 * PLANTILLA de configuración. Copia este archivo como `config.php`
 * y rellena con tus datos reales. `config.php` está en .gitignore
 * para NO subir credenciales a GitHub.
 */

// --- Base de datos MySQL ---
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'tu_usuario');
define('DB_PASS', getenv('DB_PASS') ?: 'tu_password');
define('DB_NAME', getenv('DB_NAME') ?: 'tu_base_de_datos');

// --- URL pública del backend (con / al final) ---
define('BASE_URL', getenv('BASE_URL') ?: 'https://tu-dominio/');
