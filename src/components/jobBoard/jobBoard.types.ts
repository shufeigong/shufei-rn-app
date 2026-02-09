export interface JobDetail {
  id: number;
  by: string;
  score: number;
  time: number; // Unix timestamp
  title: string;
  type: 'job';
  url?: string;
}

export type JobIds = number[];

export interface JobItem {
  item: JobDetail;
}
