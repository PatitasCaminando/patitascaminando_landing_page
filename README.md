# Patitas Caminando - Landing Page 🐾

Bienvenido al repositorio oficial de la Landing Page de **Patitas Caminando**, una organización dedicada a rescatar, cuidar, rehabilitar y buscar hogares responsables para animales de compañía que han sido olvidados, abandonados o maltratados.

![Landing Hero](src/assets/documents/landing_hero.png)

## Descripción del Proyecto

Esta es la primera fase del sitio web oficial (Landing Page), cuyo objetivo es centralizar la información de la organización, permitir a la comunidad conocer a los animales rescatados, facilitar procesos de adopción, recolectar donaciones y habilitar reportes de casos de emergencia.

El proyecto está desarrollado con tecnologías modernas orientadas al rendimiento y accesibilidad, incluyendo funcionalidades de Progressive Web App (PWA).

## Funcionalidades PWA

Esta aplicación cuenta con soporte PWA, lo que permite:
- **Instalación:** La aplicación puede ser instalada en dispositivos móviles y de escritorio para una experiencia nativa.
- **Soporte Offline:** Funcionalidad de caché inteligente mediante Service Workers, permitiendo a los usuarios navegar por contenido visitado previamente incluso sin conexión a internet.
- **Consentimiento de Caché:** Modal integrado de permisos para almacenar recursos en caché optimizando el rendimiento.

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animaciones:** [Lottie React](https://lottiefiles.com/)
- **PWA:** Service Workers, Caching API, y Manifest web.

## Estructura Principal

- `src/app`: Rutas principales de la aplicación.
- `src/components`: Componentes reutilizables agrupados bajo principios de diseño atómico (`atoms`, `molecules`, `organisms`, `sections`, `layout`, `ui`, `pwa`).
- `src/assets`: Recursos estáticos (imágenes, logos, doodles, lotties).
- `src/core`: Lógica de negocio, servicios API, validadores y utilidades.

## Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone git@github.com:PatitasCaminando/patitascaminando_landing_page.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Para probar las funcionalidades PWA y de Service Workers, es recomendable correr el build de producción:
   ```bash
   npm run build
   npm start
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Uso de Marca e Identidad

Los recursos visuales de la fundación (logotipos, imagotipos, doodles y fotografías) están protegidos. Por favor, revisa el archivo [BRAND_NOTICE.md](./BRAND_NOTICE.md) para conocer las políticas y restricciones de uso del material gráfico de Patitas Caminando.

## Licencia

Este proyecto se encuentra bajo la [Licencia MIT](./LICENSE).

---
*Este documento se actualizará conforme avance la integración con el backend y las nuevas funcionalidades.*
