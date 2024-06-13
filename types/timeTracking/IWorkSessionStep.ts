export type WorkSessionStepType = 'break' | 'working';

export interface IWorkSessionStep {
  id?: number;
  sessionUid: string;
  start: Date;
  end?: Date;
  elapsed: number;
  stepType: WorkSessionStepType;
  status?: WorkSessionProgressionStatus;
  comment?: string;
}
