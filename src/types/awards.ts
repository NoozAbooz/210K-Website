export interface Award {
  id: number;
  title: string;
  event: {
    id: number;
    name: string;
    start: string;
  };
  qualifications?: string[];
}

export interface AwardsByCategory {
  Excellence: Award[];
  Champion: Award[];
  Other: Award[];
}

export interface AwardsStats {
  total: number;
  byCategory: {
    Excellence: number;
    Champion: number;
    Other: number;
  };
}

export interface EventDetails {
  id: number;
  name: string;
  start: string;
  end: string;
  location: {
    venue: string;
    city: string;
    region: string;
  };
}

export const AWARD_DESCRIPTIONS = {
  Excellence: "The highest honor in VEX Robotics, recognizing overall excellence in building a high-quality robotics program. This award considers robot performance, engineering documentation, and ranking placements.",
  Champion: "Awarded to the individual skills champions and winning alliance of a tournament, demonstrating superior robot performance and effective alliance cooperation during elimination matches.",
  Other: "Various awards recognizing specific achievements in design, sportsmanship, innovation and other aspects deserving specific recognition."
};
