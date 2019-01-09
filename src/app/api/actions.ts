import { Dispatch } from "redux";

export const CREATE_HISTOGRAM = "CREATE_HISTOGRAM";
export const GET_ODDS = "GET_ODDS";

interface IHistogramData {
  board: string;
  hand: string;
  others: string[];
}

export function createHistogram(data: IHistogramData) {
  return {
    data,
    type: CREATE_HISTOGRAM
  };
}

export function getOdds(cards: string[], board: string) {
  return {
    board,
    cards,
    type: GET_ODDS
  };
}

function fetchHistogram(hand: string, others: string[], board: string) {
  return (dispatch: Dispatch<CREATE_HISTOGRAM>) => {};
}
