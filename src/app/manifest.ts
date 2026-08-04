import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Patitas Caminando',
    short_name: 'Patitas',
    description: 'Web pública e institucional de la Organización Patitas Caminando.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F1',
    theme_color: '#F4A261',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
