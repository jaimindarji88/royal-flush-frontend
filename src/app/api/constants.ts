export const testUrl = 'https://localhost:3030/api';
export const devUrl = 'https://aw4hzcvs3f.execute-api.us-east-1.amazonaws.com/dev/api/';


export const routes = {
  histogram(iters?: number) {
    return `${devUrl}histogram?iters=${iters}`
  },
  odds(iters?: number) {
    return `${devUrl}odds?iters=${iters}`
  }
}