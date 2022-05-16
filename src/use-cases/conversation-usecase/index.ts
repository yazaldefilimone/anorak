import { Message, Whatsapp } from 'venom-bot';
import { InMemoryNeuralRepository } from '../../database/InMemoryNeural';
const { NlpManager } = require('node-nlp');
import InMemoryNeural from '../../database/Neural.json';
import { answerer } from '../../shared/utils';
const manager = new NlpManager({ languages: ['pt'], forceNER: true });

// manager.addDocument('pt', 'yazalde tas ocupado', 'novidades.ocupa');
// manager.addDocument('pt', 'tas ocupado', 'novidades.ocupa');
// manager.addDocument('pt', 'tas ocupado? yazalde', 'novidades.ocupa');
// manager.addDocument('pt', 'ocupado?', 'novidades.ocupa');
// manager.addDocument('pt', 'tens tempo', 'novidades.ocupa');
// manager.addDocument('pt', 'yazalde tens tempo', 'novidades.ocupa');
// manager.addDocument('pt', 'tens algum tempo?', 'novidades.ocupa');
// manager.addDocument('pt', 'tens algum tempo? yazalde', 'novidades.ocupa');

// manager.addDocument('pt', 'o que me contas?', 'novidades');
// manager.addDocument('pt', 'o que me contas?', 'novidades');
// manager.addDocument('pt', 'o que me contas?', 'novidades');

// InMemoryNeural.forEach((neural: any) => {
//   manager.addDocument('pt', neural.mensagem, neural.type);
// });

// InMemoryNeural.forEach((neural: any) => {
//   manager.addAnswer('pt', neural.type, neural.response);
// });

export class ConversationUseCase {
  async execute(user: Message, client: Whatsapp) {
    manager.addDocument('pt', 'oi', 'comprimento.oi');
    manager.addDocument('pt', 'ola', 'comprimento.oi');
    manager.addDocument('pt', 'tudo bem?', 'comprimento.formal');
    manager.addDocument('pt', 'ola tudo bem?', 'comprimento.formal');
    manager.addDocument('pt', 'como voce esta?', 'comprimento.formal');
    manager.addDocument('pt', 'voce esta bem?', 'greetings.formal');
    manager.addDocument('pt', 'como estas?', 'greetings.formal');

    manager.addAnswer('pt', 'comprimento.formal', 'Estou bem e voce?');
    manager.addAnswer('pt', 'comprimento.formal', 'Indo, e voce');
    manager.addAnswer('pt', 'comprimento.formal', 'Tudo bem ate agora, e voce?');
    manager.addAnswer('pt', 'comprimento.formal', 'Eu estou ótimo, e voce?');
    manager.addAnswer('pt', 'comprimento.formal', 'Estou bem, e ai?');

    manager.addDocument('pt', 'kmk', 'greetings.oi');
    manager.addDocument('pt', 'hi', 'greetings.oi');
    manager.addDocument('pt', 'ai', 'greetings.oi');
    manager.addDocument('pt', 'fala mano', 'greetings.oi');
    manager.addDocument('pt', 'como vai?', 'greetings.oi');

    manager.addAnswer('pt', 'comprimento.oi', 'Oie tudo bem?');
    manager.addAnswer('pt', 'comprimento.oi', 'oie');
    manager.addAnswer('pt', 'comprimento.oi', 'Voce esta bem?');
    manager.addAnswer('pt', 'comprimento.oi', 'como vai');
    manager.addAnswer('pt', 'comprimento.oi', 'Ola?');

    manager.addDocument('pt', 'o que me contas?', 'novidades.faz');
    manager.addDocument('pt', 'o que me fazes?', 'novidades.faz');
    manager.addDocument('pt', 'Fazes alguma coisa?', 'novidades.faz');
    manager.addDocument('pt', 'tais a fazer o que?', 'novidades.faz');
    manager.addDocument('pt', 'fazes?', 'novidades.faz');

    manager.addAnswer('pt', 'novidades.faz', 'Nada no momento!!! e voce?');
    manager.addAnswer('pt', 'novidades.faz', 'Na internet fazendo algumas pesquisas, e voce?');
    manager.addAnswer('pt', 'novidades.faz', 'No whatsapp vendo as mensagem de alguns grupos, e voce?');
    manager.addAnswer('pt', 'novidades.faz', 'Aperfeiçoando o meu cérebro sim assim posso dizer 😅!!!, e voce?');

    await manager.train();
    manager.save();

    const { answer } = await manager.process('pt', user.body);
    console.log({ answer });
    if (answer) {
      const rws = await client.sendText(user.from, answerer(answer));
      return;
    }
    await client.sendText(user.from, answerer('Desculpa nao entendo o que esta me dizendo.'));

    // const inMemoryNeuralRepository = new InMemoryNeuralRepository();
    // const data = {
    //   type: 'other',
    //   mensagem: user.body,
    //   response: user.notifyName,
    // };
    // const isSalve = await inMemoryNeuralRepository.createNeural(data);
    // if (isSalve) {
    //   const rws = await client.sendText(user.from, 'Mensagem Salva para aperfeiçoar o meu cérebro');
    // }
  }
}

// const a = {
//   utterance: 'I should go now',
//   locale: 'en',
//   languageGuessed: false,
//   localeIso2: 'en',
//   language: 'English',
//   domain: 'default',
//   classifications: [
//     { label: 'greetings.bye', value: 0.698219120207268 },
//     { label: 'None', value: 0.30178087979273216 },
//     { label: 'greetings.hello', value: 0 },
//   ],
//   intent: 'greetings.bye',
//   score: 0.698219120207268,
//   entities: [
//     {
//       start: 12,
//       end: 14,
//       len: 3,
//       accuracy: 0.95,
//       sourceText: 'now',
//       utteranceText: 'now',
//       entity: 'datetime',
//       resolution: [Object],
//     },
//   ],
//   sentiment: { score: 1, comparative: 0.25, vote: 'positive', numWords: 4, numHits: 2, type: 'senticon', language: 'en' },
//   actions: [],
//   srcAnswer: 'Till next time',
//   answer: 'Till next time',
// };
