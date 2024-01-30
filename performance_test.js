// Import modul http dan k6 dari k6
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// Fungsi untuk membuat payload dan header untuk API pertama
function createPayloadAndHeaders1() {
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });
  const headers = {
    'Content-Type': 'application/json',
  };
  return { payload, headers };
}

// Fungsi untuk membuat payload dan header untuk API kedua
function createPayloadAndHeaders2() {
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  });
  const headers = {
    'Content-Type': 'application/json',
  };
  return { payload, headers };
}

// Fungsi untuk melakukan request POST ke API pertama
function postRequest1() {
  const { payload, headers } = createPayloadAndHeaders1();
  const response = http.post('https://reqres.in/api/users', payload, {
    headers,
  });
  return response;
}

// Fungsi untuk melakukan request PUT ke API kedua
function putRequest2() {
  const { payload, headers } = createPayloadAndHeaders2();
  const response = http.put('https://reqres.in/api/users/2', payload, {
    headers,
  });
  return response;
}

// Fungsi untuk mengecek status code dan body dari response
function checkResponse(response) {
  check(response, {
    'POST status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'POST name is morpheus': (r) => r.json('name') === 'morpheus',
    'POST job is leader or zion resident': (r) =>
      r.json('job') === 'leader' || r.json('job') === 'zion resident',
  });

  if (response.status !== 200 && response.status !== 201) {
    console.error(`Error: Unexpected status code - ${response.status}`);
  }
}

function checkResponse2(response) {
  check(response, {
    'PUT status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'PUT name is morpheus': (r) => r.json('name') === 'morpheus',
    'PUT job is leader or zion resident': (r) =>
      r.json('job') === 'leader' || r.json('job') === 'zion resident',
  });

  if (response.status !== 200 && response.status !== 201) {
    console.error(`Error: Unexpected status code - ${response.status}`);
  }
}

// Fungsi default yang akan dieksekusi oleh k6
export default function () {
  // Melakukan request POST ke API pertama
  const response1 = postRequest1();

  // Mengecek status code dan body dari response API pertama
  checkResponse(response1);

  // Melakukan request PUT ke API kedua
  const response2 = putRequest2();

  // Mengecek status code dan body dari response API kedua
  checkResponse2(response2);

  // Menambahkan jeda antara iterasi
  sleep(0.1);
}

// Mendefinisikan opsi untuk konfigurasi tes
export let options = {
  // Menentukan jumlah virtual user
  vus: 1000,

  // Menentukan jumlah iterasi
  iterations: 3500,

  // Menentukan batas maksimum toleransi response API
  // Menentukan thresholds untuk asersi performa
  thresholds: {
    // http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<2000'], // 99% of requests should be below 2s
  },
};

// Fungsi untuk menangani laporan HTML
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
