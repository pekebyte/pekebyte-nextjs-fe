import { PortfolioItem } from "@/types/wordpress";
// Helper function to get media from embedded data
export function getPortfolioMedia(item: PortfolioItem) {
  const embedded = item._embedded?.['acf:attachment'];
  
  if (!embedded) {
    return {
      mainImage: null,
      gallery: []
    };
  }

  // Get main image (first item in acf.image)
  const mainImage = embedded.find(media => media.id === item.acf.image);
  
  // Get gallery items
  const gallery = item.acf.gallery
    ?.map(galleryId => embedded.find(media => media.id === galleryId))
    .filter(Boolean); // Remove undefined items

  return {
    mainImage: mainImage || null,
    gallery: gallery || []
  };
}