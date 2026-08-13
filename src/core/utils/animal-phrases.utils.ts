export function getAnimalEmotionalPhrase(animal: { id?: string | number; name: string; sex?: string; status: string; }): string {
  const name = animal.name;
  const sex = animal.sex?.toLowerCase() || '';

  const isPlural =
    sex === 'ambos' ||
    name.toLowerCase().startsWith('los ') ||
    name.toLowerCase().startsWith('las ');

  const isFemale = sex === 'hembra';

  // Usamos una suma de caracteres para que la frase "random" sea determinista y no cambie en cada re-render
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + (animal.id ? String(animal.id).length : 0);
  const randomIndex = seed % 10;

  let disponiblePhrase = '';

  if (isPlural) {
    const pluralPhrases = [
      `Al adoptar a ${name}, les das una segunda oportunidad y ganas compañeros fieles para toda la vida.`,
      `Bríndales a ${name} el hogar que se merecen y descubre el amor incondicional que tienen para darte.`,
      `Cada día será una nueva aventura si decides darles a ${name} un cálido espacio en tu familia.`,
      `${name} están esperando pacientemente por alguien como tú que les cambie el mundo entero.`,
      `Abre tu corazón y tu hogar para ${name}; su lealtad y cariño mutuo serán tu mejor recompensa.`,
      `La historia de ${name} apenas comienza, y tú puedes ser quien protagonice su próximo gran capítulo.`,
      `Dales a ${name} la oportunidad de demostrarte lo que significa la verdadera gratitud y compañía.`,
      `Con ${name} a tu lado, los días estarán llenos de alegría, juegos y amor sincero sin límites.`,
      `Haz de ${name} parte de tu vida y experimenta la maravillosa sensación de transformar sus realidades.`,
      `Elegir a ${name} no es solo un rescate, es sumar nuevos integrantes que te amarán incondicionalmente.`
    ];
    disponiblePhrase = pluralPhrases[randomIndex];
  } else {
    const friend = isFemale ? 'una amiga' : 'un amigo';
    const companion = isFemale ? 'compañera' : 'compañero';
    
    const singularPhrases = [
      `Al adoptar a ${name}, le das una segunda oportunidad y ganas una compañía fiel para toda la vida.`,
      `Bríndale a ${name} el hogar que se merece y descubre el inmenso amor incondicional que tiene para darte.`,
      `Cada día será una nueva aventura si decides darle a ${name} un espacio en tu familia.`,
      `${name} está esperando pacientemente por alguien como tú que le cambie el mundo entero.`,
      `Abre tu corazón para ${name}; su lealtad y su cariño serán tu mayor recompensa cada día.`,
      `La historia de ${name} apenas comienza, y tú puedes ser el héroe que le regale su mejor capítulo.`,
      `Dale a ${name} la oportunidad de demostrarte lo que significa la verdadera gratitud de ${friend}.`,
      `Con ${name} a tu lado, los días estarán llenos de energía, ternura y un amor sincero sin límites.`,
      `Haz de ${name} tu ${companion} de vida y experimenta la maravillosa sensación de salvarle.`,
      `Elegir a ${name} no es solo un rescate, es sumar a ${friend} incondicional que te amará por siempre.`
    ];
    disponiblePhrase = singularPhrases[randomIndex];
  }

  const phrases: Record<string, string> = {
    disponible: disponiblePhrase,
    no_disponible: isPlural
      ? `${name} no están disponibles para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.`
      : `${name} no está disponible para adopción en este momento, pero puedes conocer su historia y acompañar su proceso.`,
    en_proceso: isPlural
      ? `${name} ya se encuentran en proceso de adopción, una nueva oportunidad que puede cambiar sus vidas.`
      : `${name} ya se encuentra en proceso de adopción, una nueva oportunidad que puede cambiar su vida.`,
    adoptado: isPlural
      ? `${name} ya encontraron un hogar, y su historia nos recuerda que cada adopción responsable cambia vidas.`
      : `${name} ya encontró un hogar, y su historia nos recuerda que cada adopción responsable cambia una vida.`,
    archivado: 'Este perfil ya no se encuentra disponible.',
  };

  return phrases[animal.status] ?? '';
}
