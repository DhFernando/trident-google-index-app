export type IndexStatus = 'Indexed' | 'Not Indexed' | 'Invalid';

export interface UrlRecord {
  url: string;
  status: IndexStatus;
  lastChecked: string; // ISO string
  notes: string;
}

export interface CheckResult {
  status: IndexStatus;
  notes: string;
}
