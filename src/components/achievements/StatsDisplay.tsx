import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AwardsStats } from '../../types/awards';
import { TrophyIcon, GlobeIcon, MountainSnowIcon } from 'lucide-react';
import { API_CONFIG } from '../../config/api';
import { API_KEY } from '../../config/api_key';

interface Props {
  stats: AwardsStats;
}

export function StatsDisplay({ stats }: Props) {
  const [globalRank, setGlobalRank] = useState<number | null>(null);
  const [regionalRank, setRegionalRank] = useState<number | null>(null);
  const [totalTeamCount, setTotalTeamCount] = useState<number>(0);

  useEffect(() => {
    const fetchSkillsRankings = async () => {
      try {
        const response = await axios.get(
          `https://www.robotevents.com/api/seasons/${API_CONFIG.SEASON_ID}/skills`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY.TOKEN}`
            }
          }
        );
        
        const rankings = response.data;
        const teamObject = rankings.find((r: any) => r.team.id.toString() === API_CONFIG.TEAM_ID);
        const totalTeamCount = rankings.length;
        setTotalTeamCount(totalTeamCount);
        
        if (teamObject) {
          setGlobalRank(teamObject.rank);
          
          // Filter for regional teams and sort by score
          const regionalTeams = rankings
            .filter((r: any) => r.team.country === 'Canada')
            .sort((a: any, b: any) => b.score - a.score);
          
          // Find our team's position in the filtered and sorted regional rankings
          const regionalIndex = regionalTeams.findIndex((r: any) => 
            r.team.id.toString() === API_CONFIG.TEAM_ID
          );
          
          setRegionalRank(regionalIndex !== -1 ? regionalIndex + 1 : null);
        } else {
          setGlobalRank(null);
          setRegionalRank(null);
        }
      } catch (err) {
        console.error('Failed to fetch skills rankings:', err);
        setGlobalRank(null);
        setRegionalRank(null);
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
            <GlobeIcon className="inline-block h-5 w-5 text-pink-400 mr-2" />
<<<<<<< HEAD
            Top {globalRank ? `#${(globalRank / totalTeamCount).toFixed(2)}` : 'error fetching'}%
=======
            Top {globalRank ? `${(globalRank / totalTeamCount * 100).toFixed(2)}` : '-'}%
>>>>>>> ce3e381cbd746c68d1a7d54ea709eeb4a8109d31
          </p>
          <p className="text-1xl font-bold text-pink-500">
            {globalRank ? `#${globalRank}` : '-'} out of {totalTeamCount}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Regional Skills Ranking</h4>
          <p className="text-3xl font-bold text-pink-500">
            <MountainSnowIcon className="inline-block h-5 w-5 text-pink-400 mr-2" />
            {regionalRank ? `#${regionalRank}` : '-'}
          </p>
          <p className="text-1xl font-bold text-pink-500">
            Within Canada
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <TrophyIcon className="h-8 w-8 text-pink-400" />
        <h3 className="text-3xl font-bold">Awards this Season: {stats.total}</h3>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <h3 className="text-2xl font-bold">Cumulative Awards: {stats.total + 6}</h3>
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
