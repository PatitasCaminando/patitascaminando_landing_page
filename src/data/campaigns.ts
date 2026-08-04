import { Campaign } from '../types';

export const featuredCampaigns: Campaign[] = [
  {
    id: '1',
    category: 'Adopciones',
    title: 'Feria de Adopción Navideña',
    description: 'Acompáñanos este fin de semana en nuestra feria de adopción especial. Dale un hogar a quien más lo necesita.',
    dateOrStatus: 'Próximo sábado, 10:00 AM'
  },
  {
    id: '2',
    category: 'Donaciones',
    title: 'Campaña de Alimento 2026',
    description: 'Nuestras reservas están bajas. Necesitamos tu ayuda para llegar a nuestra meta de 1 tonelada de alimento.',
    dateOrStatus: 'Activa'
  },
  {
    id: '3',
    category: 'Salud',
    title: 'Jornada Veterinaria Solidaria',
    description: 'Brigada médica para esterilización y vacunación a bajo costo en sectores vulnerables de la ciudad.',
    dateOrStatus: '15 de Julio, 2026'
  }
];
