export enum FetchHistogram {
  FETCH_HISTOGRAM_SUCCESS = "FETCH_HISTOGRAM_SUCCESS",
  FETCH_HISTOGRAM_FAILED = "FETCH_HISTOGRAM_FAILED",
  FETCH_HISTOGRAM_REQUEST = "FETCH_HISTOGRAM_REQUEST"
}

export interface IHistogram {
  high_card: number;
  pair: number;
  two_pair: number;
  set: number;
  straight: number;
  flush: number;
  full_house: number;
  quads: number;
  straight_flush: number;
  royal_flush: number;
}
