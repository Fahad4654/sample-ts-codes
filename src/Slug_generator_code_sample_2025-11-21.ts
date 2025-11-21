function slugify(text: string): string {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵșțđžėöüä'
  const b = 'aaaaeeeeiiiiooooouuuuncsyoarsnpwgsztdezoua'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&+/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function generateUniqueSlug(text: string, existingSlugs: string[]): string {
  let slug = slugify(text);
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${slugify(text)}-${counter}`;
    counter++;
  }

  return slug;
}

export { slugify, generateUniqueSlug };