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
  // Teste PUT /animals/{id}
  // Primeiro cria um animal
  const animalPayload = JSON.stringify({
    nome: 'AnimalPerf',
    idade: 2,
    especie: 'Canina',
    tutor: 'PerfUser'
  });
  const createRes = http.post(`${BASE_URL}/animals`, animalPayload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const id = createRes.json('id');
  // Atualiza o animal
  const updatePayload = JSON.stringify({
    nome: 'AnimalPerfAtualizado',
    idade: 3,
    especie: 'Felina',
    tutor: 'PerfUser2'
  });
  const res = http.put(`${BASE_URL}/animals/${id}`, updatePayload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  check(res, {
    'status é 200': (r) => r.status === 200,
    'nome atualizado': (r) => r.json('nome') === 'AnimalPerfAtualizado',
  });
  sleep(1);
}
