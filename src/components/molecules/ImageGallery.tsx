import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { imageService } from '../../services/imageService';

interface Image {
  id: string;
  url: string;
  alt: string;
  category: string;
}

interface ImageGalleryProps {
  category: string;
}

// Memoized Image Component
const GalleryImage = memo(({ image, index, onClick }: { image: Image; index: number; onClick: () => void }) => {
  const isLarge = index % 3 === 0;
  
  return (
    <motion.div
      key={image.id}
      className={`relative mb-16 group ${isLarge ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div 
        onClick={onClick}
        className="cursor-zoom-in relative overflow-hidden"
      >
        <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            fetchPriority={index < 4 ? "high" : "low"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <motion.div 
          className="absolute left-0 right-0 bottom-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className={`font-medium ${isLarge ? 'text-xl' : 'text-lg'} mb-2`}>
            {image.alt}
          </p>
          <div className="h-1 w-12 bg-white/80 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
        </motion.div>
      </div>
      
      <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-neutral-900/20 to-transparent blur-lg transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
    </motion.div>
  );
});

GalleryImage.displayName = 'GalleryImage';

const ImageGallery: React.FC<ImageGalleryProps> = ({ category }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchImages = async (pageNum: number) => {
    try {
      const unsplashImages = await imageService.searchUnsplashImages({
        query: category,
        page: pageNum,
        perPage: 12
      });

      const formattedImages = unsplashImages.map(img => ({
        id: img.id,
        url: img.urls.regular + '&w=1600&q=85',
        alt: img.alt_description || img.description || `${category} photo`,
        category
      }));

      return formattedImages;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialImages = async () => {
      setLoading(true);
      const initialImages = await fetchImages(1);
      setImages(initialImages);
      setLoading(false);
      setPage(1);
      setExpanded(false);
    };

    loadInitialImages();
  }, [category]);

  const loadMoreImages = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const moreImages = await fetchImages(nextPage);
      
      if (moreImages.length > 0) {
        setImages(prev => [...prev, ...moreImages]);
        setPage(nextPage);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`${i % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'} bg-neutral-800 rounded-lg`} 
          />
        ))}
      </div>
    );
  }

  const displayedImages = expanded ? images : images.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {displayedImages.map((image, index) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              index={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setLightboxOpen(true);
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {!expanded && images.length > 6 && (
        <motion.button
          onClick={() => setExpanded(true)}
          className="mt-16 mx-auto block px-8 py-3 text-lg font-medium rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View More
        </motion.button>
      )}

      {expanded && !loadingMore && (
        <motion.button
          onClick={loadMoreImages}
          className="mt-16 mx-auto block px-8 py-3 text-lg font-medium rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </motion.button>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        slides={displayedImages.map(img => ({ src: img.url, alt: img.alt }))}
        carousel={{
          spacing: 20,
          padding: 20,
        }}
        animation={{
          fade: 300,
          swipe: 500,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
      />
    </>
  );
};

export default memo(ImageGallery);
