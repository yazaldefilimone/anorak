import { Message, Whatsapp } from 'venom-bot';
import { TranslatedUseCase } from '../use-cases/translated-usecase';
import { ConversationUseCase } from '../use-cases/conversation-usecase';

export async function Chat(userContent: Message, client: Whatsapp): Promise<void> {
  try {
    console.log(userContent);
    if (userContent.body && userContent.body != '' && userContent.isGroupMsg === false) {
      if (userContent.body.slice(0, '#biblia'.length).toLowerCase() == '#biblia') {
        const bibliaUseCase = new BibliaUseCase();
        await bibliaUseCase.execute(userContent, client);
        return;
      }
      if (userContent.body.slice(0, '#music'.length).toLowerCase() == '#music') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }

      if (userContent.body.slice(0, '#google'.length).toLowerCase() == '#google') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }

      if (userContent.body.slice(0, '#wikipedia'.length).toLowerCase() == '#wikipedia') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }

      if (userContent.body.slice(0, '#video'.length).toLowerCase() == '#video') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }
      if (userContent.body.slice(0, '#letra'.length).toLowerCase() == '#letra') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }
      if (userContent.body.slice(0, '#tradutor'.length).toLowerCase() == '#tradutor') {
        const translatedUseCase = new TranslatedUseCase();
        await translatedUseCase.execute(userContent, client);
      }
      if (userContent.body.slice(0, '#sticker'.length).toLowerCase() == '#sticker') {
        const conversationUseCase = new ConversationUseCase();
        await conversationUseCase.execute(userContent, client);
      }
    }
  } catch (error) {
    console.log({ error });
  }
}
