export const getSupabaseMediaUrl = (path?: string): string => {
  if (!path) return '';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjxrfmmwukafovfzdjlq.supabase.co';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Handle paths that already include the bucket name 'media-assets'
  if (cleanPath.startsWith('media-assets/')) {
    return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
  }

  // Handle direct pending or nested paths that don't include the bucket
  return `${supabaseUrl}/storage/v1/object/public/media-assets/${cleanPath}`;
};
