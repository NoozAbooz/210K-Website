import React from 'react';
import { AwardsStats } from '../../types/awards';
import { TrophyIcon } from 'lucide-react';

interface Props {
  stats: AwardsStats;
}

export function StatsDisplay({ stats }: Props) {
  return (
    <div className="bg-pink-50 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <TrophyIcon className="h-8 w-8 text-pink-400" />
        <h3 className="text-2xl font-bold">Total Awards: {stats.total}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(stats.byCategory).map(([category, count]) => (
          <div
            key={category}
            className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-gray-800">{category}</div>
            <div className="text-2xl font-bold text-pink-500">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}