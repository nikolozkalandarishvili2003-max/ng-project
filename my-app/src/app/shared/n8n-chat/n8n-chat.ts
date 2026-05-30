import { Component, afterNextRender } from '@angular/core';
import { createChat } from '@n8n/chat';

@Component({
  selector: 'app-n8n-chat',
  imports: [],
  templateUrl: './n8n-chat.html',
  styleUrl: './n8n-chat.css',
})
export class N8nChat {
  constructor() {
    afterNextRender(() => {
      createChat({
        webhookUrl:
          'https://nikolozzz.app.n8n.cloud/webhook/9f9ee393-a729-4eec-be8e-d9c29cb4f156/chat',
        target: '#n8n-chat',
        mode: 'fullscreen',
        defaultLanguage: 'en',
        initialMessages: ['Hello! how can i help you'],

        i18n: {
          en: {
            title: 'PRESTIGE BOT',
            subtitle: '',
            footer: '',
            getStarted: 'Start Chat',
            inputPlaceholder: 'Type your question...',
            closeButtonTooltip: '',
          },
        },
      });
    });
  }
}
