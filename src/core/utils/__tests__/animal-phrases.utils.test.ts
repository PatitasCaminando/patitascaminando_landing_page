import { describe, it, expect } from 'vitest';
import { getAnimalEmotionalPhrase } from '../animal-phrases.utils';

describe('Animal Phrases Utils', () => {
  describe('getAnimalEmotionalPhrase', () => {
    it('should return a valid phrase for a singular available animal (macho)', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Rocky', sex: 'Macho', status: 'disponible' });
      expect(phrase).toBeTruthy();
      expect(phrase).toContain('Rocky');
    });

    it('should return a valid phrase for a singular available animal (hembra)', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Luna', sex: 'Hembra', status: 'disponible' });
      expect(phrase).toBeTruthy();
      expect(phrase).toContain('Luna');
      // Probamos que use formas femeninas si cae en esas frases
      expect(phrase.includes('amiga') || phrase.includes('compañera') || phrase.includes('le das') || phrase.includes('héroe')).toBeTruthy();
    });

    it('should return a plural phrase for "ambos"', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Rocky y Luna', sex: 'Ambos', status: 'disponible' });
      expect(phrase).toBeTruthy();
      // Verificamos que no contiene palabras singulares típicas
      expect(phrase).not.toContain(' le das ');
      expect(phrase).not.toContain('Bríndale a ');
    });

    it('should return a plural phrase for names starting with "Los" or "Las"', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Los Hermanos', status: 'disponible' });
      expect(phrase).toBeTruthy();
      expect(phrase).not.toContain(' le das ');
      expect(phrase).not.toContain('Bríndale a ');
    });

    it('should return consistent phrases for the same animal id and name (deterministic pseudo-randomness)', () => {
      const phrase1 = getAnimalEmotionalPhrase({ id: '123', name: 'Toby', sex: 'Macho', status: 'disponible' });
      const phrase2 = getAnimalEmotionalPhrase({ id: '123', name: 'Toby', sex: 'Macho', status: 'disponible' });
      expect(phrase1).toBe(phrase2);
    });

    it('should return correct phrase for en_proceso status', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Max', status: 'en_proceso' });
      expect(phrase).toBe('Max ya se encuentra en proceso de adopción, una nueva oportunidad que puede cambiar su vida.');
    });

    it('should return correct phrase for adoptado status', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Max', status: 'adoptado' });
      expect(phrase).toBe('Max ya encontró un hogar, y su historia nos recuerda que cada adopción responsable cambia una vida.');
    });

    it('should return correct phrase for no_disponible status', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Max', status: 'no_disponible' });
      expect(phrase).toBe('Max no está disponible para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.');
    });

    it('should return correct phrase for archivado status', () => {
      const phrase = getAnimalEmotionalPhrase({ name: 'Max', status: 'archivado' });
      expect(phrase).toBe('Este perfil ya no se encuentra disponible.');
    });

    it('should return plural version for non-disponible statuses', () => {
      const enProceso = getAnimalEmotionalPhrase({ name: 'Los Gatitos', status: 'en_proceso' });
      expect(enProceso).toBe('Los Gatitos ya se encuentran en proceso de adopción, una nueva oportunidad que puede cambiar sus vidas.');

      const adoptado = getAnimalEmotionalPhrase({ name: 'Las Perritas', status: 'adoptado' });
      expect(adoptado).toBe('Las Perritas ya encontraron un hogar, y su historia nos recuerda que cada adopción responsable cambia vidas.');

      const noDisponible = getAnimalEmotionalPhrase({ name: 'Los Hermanos', status: 'no_disponible' });
      expect(noDisponible).toBe('Los Hermanos no están disponibles para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.');
    });
  });
});
