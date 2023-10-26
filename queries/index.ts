export * from './general';

export interface GeneralResponse<ResultType> {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultType[];
}
