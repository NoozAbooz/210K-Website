import React from 'react';
import { TrophyIcon, AwardIcon, StarIcon } from 'lucide-react';

export function Achievements() {
  const achievements = [
    {
      icon: <TrophyIcon className="h-8 w-8 text-pink-400" />,
      title: "Regional Champions",
      description: "First place in 2023 Regional Competition"
    },
    {
      icon: <AwardIcon className="h-8 w-8 text-pink-400" />,
      title: "Excellence Award",
      description: "Recognized for outstanding robot design"
    },
    {
      icon: <StarIcon className="h-8 w-8 text-pink-400" />,
      title: "Skills Champion",
      description: "Highest programming skills score"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors duration-200 transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {achievement.icon}
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}