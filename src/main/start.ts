import './settings/alias';
import express from 'express';
import { connect } from './baileys';
const app = express();
connect({
  printQRInTerminal: true,
}).then(() => {
  app.listen(process.env.PORT as string, () => console.log(`log in port: ${process.env.PORT}`));

  app.get('/', (req, res) => {
    res.send({ ok: 'hello anorak bot!!!' });
  });
});
