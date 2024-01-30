// Import modul http dari k6
import http from 'k6/http';

// Import modul check dari k6 untuk melakukan asersi
import { check } from 'k6';

// Fungsi default yang akan dieksekusi oleh k6
export default function () {
  // Membuat payload untuk API pertama
  const payload1 = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });

  // Membuat header untuk API pertama
  const headers1 = {
    'Content-Type': 'application/json',
  };

  // Melakukan request POST ke API pertama
  const response1 = http.post('https://reqres.in/api/users', payload1, {
    headers: headers1,
  });

  // Mengecek status code dan body dari response API pertama
  check(response1, {
    'status is 201': (r) => r.status === 201,
    'name is morpheus': (r) => r.json('name') === 'morpheus',
    'job is leader': (r) => r.json('job') === 'leader',
  });

  // Membuat payload untuk API kedua
  const payload2 = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  });

  // Membuat header untuk API kedua
  const headers2 = {
    'Content-Type': 'application/json',
  };

  // Melakukan request PUT ke API kedua
  const response2 = http.put('https://reqres.in/api/users/2', payload2, {
    headers: headers2,
  });

  // Mengecek status code dan body dari response API kedua
  check(response2, {
    'status is 200': (r) => r.status === 200,
    'name is morpheus': (r) => r.json('name') === 'morpheus',
    'job is zion resident': (r) => r.json('job') === 'zion resident',
  });
}
