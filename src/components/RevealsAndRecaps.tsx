import React, { useState } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
}

// Sample video data - you can configure this
const sampleVideos: VideoItem[] = [
  {
    id: '1',
    title: 'MoA Signature Event Recap 2025',
    description: 'Recap of our participation in the Mall of America Signature Event during VRC Push Back',
    thumbnail: 'https://img.youtube.com/vi/-CFn_fpI_Yw/sddefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=-CFn_fpI_Yw' 
  },
  {
    id: '2',
    title: 'Rapid Pneumatic Descore Demo',
    description: 'Showcasing our MOGO descore mechanism made during VRC High Stakes',
    thumbnail: 'https://img.youtube.com/vi/f0t37H_Tg9k/sddefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=f0t37H_Tg9k'
  },
  {
	id: '3',
	title: 'Alberta Provincials - Elimination Auton Showcase',
	description: 'Demo of our autonomous routine together with team 210Z during VRC High Stakes',
	thumbnail: 'https://img.youtube.com/vi/U3ehQVyWL6o/sddefault.jpg',
	youtubeUrl: 'https://www.youtube.com/watch?v=U3ehQVyWL6o'
  }
];

export function RevealsAndRecaps() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;
  };

  return (
    <section id="reveals-and-recaps" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reveals & Recaps
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => openVideo(video)}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <Play className="h-8 w-8 text-blue-600" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {isModalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedVideo.title}
                </h3>
                <div className="flex items-center space-x-3">
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open in YouTube</span>
                  </a>
                  <button
                    onClick={closeVideo}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo.youtubeUrl)}
                    title={selectedVideo.title}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
