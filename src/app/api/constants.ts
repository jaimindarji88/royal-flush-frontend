const testUrl = 'http://localhost:8080/api';
const devUrl = 'https://aw4hzcvs3f.execute-api.us-east-1.amazonaws.com/dev/api';

const url = process.env.NODE_ENV === 'production' ? devUrl : testUrl;

export const routes = {
  histogram(iters: string = '') {
    if (iters) {
      return `${url}/histogram?iters=${iters}`;
    }
    return `${url}/histogram`;
  },
  odds(iters: string = '') {
    if (iters) {
      return `${url}/odds?iters=${iters}`;
    }
    return `${url}/odds`;
  }
};
