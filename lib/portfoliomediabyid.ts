/**
 * Obtiene la URL de una media de un proyecto a partir de su ID
 */
export function getPortfolioMediaUrlById(project: any, id: number | string): string | null {
  if (!project?._embedded?.['acf:attachment'] || !id) return null;

  const media = project._embedded['acf:attachment'].find((a: any) => a.id === Number(id));
  return media || null;
}