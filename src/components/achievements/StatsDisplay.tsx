import React from 'react';
import { AwardsStats } from '../../types/awards';
import { TrophyIcon } from 'lucide-react';

interface Props {
  stats: AwardsStats;
  globalSkillsRanking: number;
  regionalSkillsRanking: number;
}

export function StatsDisplay({ stats, globalSkillsRanking, regionalSkillsRanking }: Props) {
  return (
    <div className="bg-pink-50 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <TrophyIcon className="h-8 w-8 text-pink-400" />
        <h3 className="text-3xl font-bold">Awards this Season: {stats.total}</h3>
      </div>
      <div className="flex justify-between mt-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="font-semibold text-gray-800">Global Skills Ranking</div>
          <div className="text-2xl font-bold text-pink-500">#{globalSkillsRanking}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="font-semibold text-gray-800">Regional Skills Ranking (Canada)</div>
          <div className="text-2xl font-bold text-pink-500">#{regionalSkillsRanking}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-bold">Cumulative Awards: {stats.total + 7}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(stats.byCategory).map(([category, count]) => (
          <div
            key={category}
            className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-gray-800">{category}</div>
            <div className="text-2xl font-bold text-pink-500">{count}x</div>
          </div>
        ))}
      </div>
    </div>
  );
}