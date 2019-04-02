export interface Player {
  cards: [];
  stats: {};
}

export enum BOARD {
  ADD_PLAYER_CARDS = 'ADD_PLAYER_CARDS',
  ADD_OTHER_CARDS = 'OTHER_CARDS',
  ADD_BOARD = 'ADD_BOARD',
  NUMBER_OF_PLAYERS = 'NUMBER_OF_PLAYERS'
}

export interface BoardState {
  board?: string;
  others: Player[];
  player_count: number;
  player: Player;
}
