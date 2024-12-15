import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AwardsStats } from '../../types/awards';
import { TrophyIcon } from 'lucide-react';
import { API_CONFIG } from '../../config/api';
import { API_KEY } from '../../config/api_key';

interface Props {
  stats: AwardsStats;
}

export function StatsDisplay({ stats }: Props) {
  const [globalRank, setGlobalRank] = useState<number | null>(null);
  const [canadaRank, setCanadaRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchSkillsRankings = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/teams/${API_CONFIG.TEAM_ID}/rankings`,
          {
            params: {
              season: API_CONFIG.SEASON_ID,
              type: 'skills'
            },
            headers: {
              Authorization: `Bearer ${API_KEY.TOKEN}`
            }
          }
        );
        
        const rankings = response.data.data;
        const worldRanking = rankings.find((r: any) => r.type === 'world');
        const regionRanking = rankings.find((r: any) => r.type === 'region' && r.region === 'Canada');
        
        setGlobalRank(worldRanking?.rank || null);
        setCanadaRank(regionRanking?.rank || null);
      } catch (err) {
        console.error('Failed to fetch skills rankings:', err);
      }
    };

    fetchSkillsRankings();
  }, []);

  return (
    <div className="bg-pink-50 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Global Skills Ranking</h4>
          <p className="text-3xl font-bold text-pink-500">
            {globalRank ? `#${globalRank}` : '-'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Canada Skills Ranking</h4>
          <p className="text-3xl font-bold text-pink-500">
            {canadaRank ? `#${canadaRank}` : '-'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <TrophyIcon className="h-8 w-8 text-pink-400" />
        <h3 className="text-3xl font-bold">Awards this Season: {stats.total}</h3>
      </div>
      
      <div className="flex items-center justify-center mb-6">
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