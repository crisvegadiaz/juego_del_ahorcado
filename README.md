# Juego del Ahorcado

Un clásico juego del ahorcado desarrollado con tecnologías web para que puedas jugar directamente en tu navegador.

## Descripción

Este proyecto es una implementación del popular juego de adivinar palabras "El Ahorcado". El jugador debe adivinar una palabra oculta letra por letra. Por cada letra incorrecta, se dibuja una parte del cuerpo del ahorcado. El juego termina cuando el jugador adivina la palabra o cuando se completa el dibujo del ahorcado.

## Tabla de Contenidos

- [Cómo Jugar](#cómo-jugar)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue](#despliegue)
- [Construido con](#construido-con)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Cómo Jugar

Para jugar, solo necesitas un navegador web. Sigue estos pasos para ejecutar el juego en tu máquina local.

### Prerrequisitos

No necesitas instalar ningún software adicional. Solo asegúrate de tener un navegador web moderno como:
* Google Chrome
* Mozilla Firefox
* Microsoft Edge

### Instalación

1. Clona el repositorio
    ```sh
    git clone https://github.com/tu_usuario/juego_del_ahorcado.git
    ```
2. Navega al directorio del proyecto.
    ```sh
    cd juego_del_ahorcado
    ```
3. **Para jugar directamente desde los archivos:** Abre el archivo `page/index.html` en tu navegador web.
4. **Para jugar usando Docker (recomendado para desarrollo/servir):**
    Asegúrate de tener Docker y Docker Compose instalados. Luego, desde el directorio raíz del proyecto, ejecuta:
    ```sh
    docker-compose up -d
    ```
    Y abre `http://localhost:9090` en tu navegador.

## Uso

Una vez que abras el juego en tu navegador:
1. El juego seleccionará una palabra al azar y mostrará guiones bajos por cada letra.
2. Usa el teclado en pantalla o tu teclado físico para seleccionar letras.
3. Si la letra está en la palabra, se revelará en su posición correcta.
4. Si la letra no está, se dibujará una parte del ahorcado y perderás un intento.
5. Ganas si adivinas la palabra completa antes de que se agoten tus intentos. ¡Pierdes si se dibuja el ahorcado completo!

## Estructura del Proyecto

La estructura del proyecto es simple y se organiza de la siguiente manera:
```plaintext
juego_del_ahorcado/
├── docker-compose.yaml         # Configuración para levantar el entorno con Docker
├── page/                      # Carpeta principal de la aplicación web
│   ├── estilo.css             # Estilos principales del juego
│   ├── fonts/                 # Fuentes utilizadas en la interfaz
│   │   └── Texaz-gxXAq.ttf
│   ├── img/                   # Imágenes y recursos gráficos
│   │   ├── baquero.svg
│   │   ├── flower-butterfly-pattern-publicdomain.jpg
│   │   ├── logo-pestaña.svg
│   │   ├── logo.svg
│   │   └── vecteezy_wild-west-modern-minimal-flat-background_.jpg
│   ├── index.html             # Página principal del juego
│   ├── juego.js               # Lógica principal del juego en JavaScript
│   └── reset.css              # Estilos para normalizar la apariencia entre navegadores
└── README.md                  # Documentación del proyecto
```

## Despliegue

Para desplegar el juego en un servidor web, puedes usar cualquier servidor estático. Aquí hay un ejemplo usando Nginx:
1. Crea un archivo `nginx.conf` con la siguiente configuración:
    ```nginx
    server {
        listen 80;
        server_name tu_dominio.com; # Cambia esto por tu dominio
        root /ruta/a/tu/proyecto/page; # Cambia esto por la ruta a tu proyecto
        index index.html;
        location / {
            try_files $uri $uri/ =404;
        }
    }
    ```
2. Construye la imagen de Docker:
    ```sh
    docker build -t juego-del-ahorcado .
    ```
3. Corre el contenedor:
    ```sh
    docker run -d -p 80:80 juego-del-ahorcado
    ```

## Construido con

- HTML5
- CSS3
- JavaScript
- Docker (opcional para despliegue)

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
