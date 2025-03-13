import bcrypt from 'bcrypt';
import express from 'express'; // แก้จาก 'expres' เป็น 'express'

const app = express();
const totalText = 1000;
const salt = 10;

app.get('/test-async', async (req, res) => {
  const start = Date.now();
  const jobs = [];

  // รัน bcrypt.hash ในลูป
  for (let i = 0; i < totalText; i++) {
    jobs.push(bcrypt.hash('password123', salt));
  }

  // รอให้ทุกคำสั่ง bcrypt.hash เสร็จสิ้น
  const result = await Promise.all(jobs);
  const end = Date.now();

  // ส่งเวลาและผลลัพธ์กลับไปยัง client
  res.send({ time: end - start, result });
});

app.get('/test-sync', (req, res) => {
  const start = Date.now();
  const results = [];
  for (let i = 0; i < totalText; i++) {
    const result = bcrypt.hashSync('password123', salt);
    results.push(result);
  }
  const end = Date.now();
  res.send({ time: end - start, results });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
