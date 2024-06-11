import type {IWorkSessionStep} from "~/types/timeTracking/IWorkSessionStep";

export interface IWorkSession {
  uid?: string;
  userUid: string;
  name: string;
  start: Date;
  end?: Date;
  elapsed?: number;
  steps?: IWorkSessionStep[];
}
