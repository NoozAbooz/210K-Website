import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n';

interface GallerySection {
  name: string;
  nameKey?: string;
  photos: string[];
}

// Helper function to format section name from folder name
const formatSectionName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function PhotoGallery() {
  const { t } = useLanguage();
  const [sections, setSections] = useState<GallerySection[]>([]);

  useEffect(() => {
    const loadSections = async () => {
      try {
        // Import all images from subfolders in assets
        const modules = import.meta.glob('/public/assets/Push Back/*.{png,jpg,jpeg,webp}');
        const sectionMap = new Map<string, string[]>();

        // Process each image path
        for (const path in modules) {
          const folderName = path.split('/')[3]; // Get subfolder name
          const imagePath = path.replace('/public', '');
          
          if (!sectionMap.has(folderName)) {
            sectionMap.set(folderName, []);
          }
          sectionMap.get(folderName)?.push(imagePath);
        }

        // Convert map to array of sections
        const sectionArray: GallerySection[] = Array.from(sectionMap).map(([name, photos]) => ({
          name: formatSectionName(name),
          nameKey: name === 'Push Back' ? 'gallery.sections.pushBack' : undefined,
          photos: photos
        }));

        setSections(sectionArray);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };

    loadSections();
  }, []);

  return (
    <section  id="photos" className="px-20">
      <div className="space-y-8 py-20">
        <h1 className="text-5xl font-bold text-center">{t('gallery.title')}</h1>
      </div>
      {sections.map((section) => (
        <div key={section.name} className="space-y-8 py-20">
          <h3 className="text-2xl underline font-semibold text-center">{section.nameKey ? t(section.nameKey) : section.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.photos.map((photo, index) => (
              <div 
                key={index}
                className="aspect-square overflow-hidden rounded-lg hover:opacity-75 transition-opacity flex items-center justify-center bg-gray-50"
              >
                <img
                  src={photo}
                  alt={`${section.nameKey ? t(section.nameKey) : section.name} photo ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
