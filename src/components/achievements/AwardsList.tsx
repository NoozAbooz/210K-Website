import React from 'react';
import { AwardsByCategory } from '../../types/awards';
import { Medal } from 'lucide-react';

interface Props {
  awardsByCategory: AwardsByCategory;
}

export function AwardsList({ awardsByCategory }: Props) {
  const categories: (keyof AwardsByCategory)[] = ['Excellence', 'Champion', 'Other'];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Medal className="h-6 w-6 text-pink-400" />
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
          <div className="grid gap-4">
            {awardsByCategory[category].map((award) => (
              <div
                key={award.id}
                className="border border-gray-100 rounded-lg p-4 hover:bg-pink-50 transition-colors"
              >
                <div className="font-medium text-gray-800">{award.title}</div>
                <div className="text-sm text-gray-600">
                  {award.event.name}
                </div>
                {award.qualifications && award.qualifications.length > 0 && (
                  <div className="mt-2 text-sm text-pink-600">
                    Qualifies to: {award.qualifications.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}