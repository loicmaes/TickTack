import type {IWorkSessionStep} from "~/types/timeTracking/IWorkSessionStep";

export type WorkSessionProgressionStatus = 'In Progress' | 'Ended';

export interface IWorkSession {
  uid?: string;
  userUid: string;
  name: string;
  start: Date;
  end?: Date;
  elapsed?: number;
  status?: WorkSessionProgressionStatus;
  steps?: IWorkSessionStep[];
}
