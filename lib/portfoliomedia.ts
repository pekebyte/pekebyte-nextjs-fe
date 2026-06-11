import { PortfolioItem } from "@/types/wordpress";
import { getMediaUrl } from "./wordpress";

export async function getPortfolioMedia(item: PortfolioItem) {
  const embedded: any = (item._embedded as any)?.['acf:attachment'];

  let mainImage: any = null;
  let gallery: any[] = [];

  if (embedded) {
    mainImage = embedded.find(
      (media: { id: number; source_url: string; alt_text?: string }) =>
        media.id === item.acf.image
    );

    gallery = item.acf.gallery
      ?.map(galleryId =>
        embedded.find(
          (media: { id: number; source_url: string; alt_text?: string }) =>
            media.id === galleryId
        )
      )
      .filter(Boolean) || [];
  }

  if (!mainImage && item.acf.image) {
    mainImage = await getMediaUrl(item.acf.image);
  }

  return {
    mainImage: mainImage || null,
    gallery: gallery || []
  };
}
