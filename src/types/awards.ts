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