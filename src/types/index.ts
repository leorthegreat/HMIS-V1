export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'case_manager' | 'staff' | 'viewer';
  avatarUrl?: string;
  organization?: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  ethnicity?: string;
  race?: string;
  ssn?: string;
  phone?: string;
  email?: string;
  isVeteran: boolean;
  hasDisability: boolean;
  housingStatus: 'housed' | 'homeless' | 'at_risk' | 'transitional';
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  profileImage?: string;
  intakeDate: string;
  lastUpdated: string;
  caseManagerId?: string;
  priorityScore?: number;
  notes?: Note[];
  services?: Service[];
  assessments?: Assessment[];
  household?: HouseholdMember[];
  program?: Program;
}

export interface HouseholdMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationship: string;
  isHeadOfHousehold: boolean;
  profileImage?: string;
}

export interface Note {
  id: string;
  clientId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  category: 'general' | 'housing' | 'health' | 'employment' | 'financial' | 'other';
  isPrivate: boolean;
}

export interface Service {
  id: string;
  clientId: string;
  serviceType: string;
  providerId: string;
  providerName: string;
  programId?: string;
  programName?: string;
  startDate: string;
  endDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Assessment {
  id: string;
  clientId: string;
  type: string;
  assessorId: string;
  assessorName: string;
  date: string;
  score: number;
  responses: Record<string, any>;
  recommendations?: string;
}

export interface Provider {
  id: string;
  name: string;
  serviceTypes: string[];
  address: string;
  phone: string;
  email: string;
  website?: string;
  capacity?: number;
  currentOccupancy?: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Program {
  id: string;
  name: string;
  type: 'permanent' | 'transitional' | 'emergency' | 'rapid_rehousing';
  provider: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
}

export interface Referral {
  id: string;
  clientId: string;
  fromProviderId: string;
  toProviderId: string;
  serviceType: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface DashboardStat {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
};