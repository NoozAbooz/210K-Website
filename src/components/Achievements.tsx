import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { Award, AwardsByCategory, AwardsStats } from '../types/awards';
import { categorizeAwards, calculateAwardsStats } from '../utils/awards';
import { StatsDisplay } from './achievements/StatsDisplay';
import { AwardsList } from './achievements/AwardsList';

export function Achievements() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/teams/${API_CONFIG.TEAM_ID}/awards`,
          {
            params: {
              'season[]': API_CONFIG.SEASON_ID
            },
            headers: {
              Authorization: `Bearer ${API_CONFIG.TOKEN}`
            }
          }
        );
        setAwards(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch awards');
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="achievements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  const awardsByCategory: AwardsByCategory = categorizeAwards(awards);
  const stats: AwardsStats = calculateAwardsStats(awardsByCategory);

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
        <StatsDisplay stats={stats} />
        <AwardsList awardsByCategory={awardsByCategory} />
      </div>
    </section>
  );
}