import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'], // 90% das requisições devem ser respondidas em menos de 3 segundos
        http_req_failed: ['rate<0.01'] // Menos de 1% das requisições devem falhar
    }
};


const BASE_URL = 'http://localhost:3000';
const LOGIN_PAYLOAD = JSON.stringify({ username: 'admin', password: 'admin' });

function getToken() {
  const res = http.post(`${BASE_URL}/auth/login`, LOGIN_PAYLOAD, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json('token');
}

function getAnimalId(token) {
  const animalPayload = JSON.stringify({
    nome: `AnimalK6_${Math.random()}`,
    idade: 2,
    especie: 'Canina',
    tutor: 'Performance'
  });
  const res = http.post(`${BASE_URL}/animals`, animalPayload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json('id');
}

export default function () {
  const token = getToken();
  const animalId = getAnimalId(token);

  // Teste GET /feedings/{animalId}
  const res = http.get(`${BASE_URL}/feedings/${animalId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(res, {
    'status é 200': (r) => r.status === 200,
    'retorna array': (r) => Array.isArray(r.json()),
  });
  sleep(1);
}
