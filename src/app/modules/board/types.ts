export interface Player {
  cards: [];
  stats: {};
}

export enum BOARD {
  USER_CARDS = 'USER_CARDS',
  OTHER_CARDS = 'OTHER_CARDS',
  BOARD = 'BOARD',
  NUMBER_OF_PLAYERS = 'NUMBER_OF_PLAYERS'
}

export interface BoardState {
  board: string | null;
  others: Player[];
  player_count: number;
  player: Player;
}
