import './settings/alias';

import { connect } from './baileys';

connect({
  printQRInTerminal: true,
}).then(() => console.log('O servidor esta rodando'));


