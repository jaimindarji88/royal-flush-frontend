import wretch from 'wretch';

import { routes } from './constants';

async function postJSON(url: string, body: any) {
  return wretch(url)
    .body(body)
    .post()
    .json(JSON => JSON);
}

async function histogram(hand: string, others: string[], board: string) {
  const body = {
    board,
    hand,
    others
  };

  return postJSON(routes.histogram(), body);
}
