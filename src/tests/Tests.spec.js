import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(90)<6800'],
    http_req_failed: ['rate<0.25']
  }
};

export default function () {
  const response = http.get(
    'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available'
  );

  check(response, {
    'Status 200': res => res.status === 200
  });

  sleep(1);
}
