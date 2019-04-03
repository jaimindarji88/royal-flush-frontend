const testUrl = 'https://localhost:3030/api';
const devUrl =
  'https://aw4hzcvs3f.execute-api.us-east-1.amazonaws.com/dev/api/';

const url = process.env.NODE_ENV === 'production' ? devUrl : testUrl;

export const routes = {
  histogram(iters?: number) {
    return `${url}histogram?iters=${iters}`;
  },
  odds(iters?: number) {
    return `${url}odds?iters=${iters}`;
  }
};
