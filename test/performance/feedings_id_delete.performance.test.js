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

export default function () {
  const token = getToken();
  // Teste DELETE /feedings/{id}
  // Primeiro cria um animal e uma alimentação
  const animalPayload = JSON.stringify({
    nome: 'AnimalFeedingPerf',
    idade: 2,
    especie: 'Canina',
    tutor: 'PerfUser'
  });
  const animalRes = http.post(`${BASE_URL}/animals`, animalPayload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const animalId = animalRes.json('id');
  // Cria alimentação
  const feedingPayload = JSON.stringify({
    animalId: animalId,
    horario: new Date().toISOString(),
    alimento: 'Ração',
    quantidade: '100g'
  });
  const feedingRes = http.post(`${BASE_URL}/feedings`, feedingPayload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const feedingId = feedingRes.json('id');
  // Exclui alimentação
  const res = http.del(`${BASE_URL}/feedings/${feedingId}`, null, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  check(res, {
    'status é 204': (r) => r.status === 204,
  });
  sleep(1);
}
