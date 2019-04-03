import { routes } from './constants';

async function postJSON(url: string, body: any) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(data => data.json());
}

interface Body {
  hand: string;
  others: string[];
  board?: string;
}

export async function histogram(
  hand: string,
  others: string[] = [],
  board: string = ''
) {
  const body: Body = {
    hand,
    others
  };

  if (board) {
    body.board = board;
  }

  return postJSON(routes.histogram(), body);
}
