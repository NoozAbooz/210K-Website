import { Award, AwardsByCategory, AwardsStats } from '../types/awards';

export function categorizeAwards(awards: Award[]): AwardsByCategory {
  return awards.reduce(
    (acc: AwardsByCategory, award) => {
      if (award.title.toLowerCase().includes('excellence')) {
        acc.Excellence.push(award);
      } else if (award.title.toLowerCase().includes('champion')) {
        acc.Champion.push(award);
      } else {
        acc.Other.push(award);
      }
      return acc;
    },
    { Excellence: [], Champion: [], Other: [] }
  );
}

export function calculateAwardsStats(awardsByCategory: AwardsByCategory): AwardsStats {
  return {
    total: Object.values(awardsByCategory).flat().length,
    byCategory: {
      Excellence: awardsByCategory.Excellence.length,
      Champion: awardsByCategory.Champion.length,
      Other: awardsByCategory.Other.length,
    },
  };
}