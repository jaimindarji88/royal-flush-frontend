import { FetchHistogram, IHistogram } from "./types";

export const getHistogramFailed = () => ({
  type: FetchHistogram.FETCH_HISTOGRAM_FAILED
});

export const getHistogramSuccess = () => ({
  type: FetchHistogram.FETCH_HISTOGRAM_SUCCESS
});

export const getHistogramRequest = (payload: { histogram: IHistogram }) => ({
  payload,
  type: FetchHistogram.FETCH_HISTOGRAM_REQUEST
});
