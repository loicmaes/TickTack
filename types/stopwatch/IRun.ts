import type {IBreak} from "~/types/stopwatch/IBreak";

export interface IRun {
  id?: number;
  userUid?: string;
  startedAt: Date;
  timeElapsed: number;
  label?: string;
  breaks: IBreak[];
}
