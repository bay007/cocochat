import { computed, extendObservable, action } from 'mobx';
import v4 from 'uuid/v4';

class _ChatStore {
  constructor() {
    const actors = {
      AGENT: 0,
      USER: 1,
    };
    extendObservable(this, {
      currentMessageID: 0,
      chat: {
        id: v4(),
        agentName: 'Egalicia',
        agentAvatar: 'http://i.imgur.com/DY6gND0.png',
        messages: [
          {
            id: 0,
            lines: [
              'Hola.',
              `Hoy seré quien pueda brindarle apoyo.`,
              '¿Cómo le puedo ayudar?',
            ],
            time: new Date().toLocaleString(),
          }
        ]
      },

      addAgentMessage: action.bound(function(simulacionRespuesta) {
        let message = {
          id: this.currentMessageID,
          lines: [],
          time: new Date().toLocaleString(),
        };

        //si es el turno del usuario de escribir simplemente escribimos en el canal activo
        let line = `Mensaje aleatorio de ${this.chat.agentName}: ${simulacionRespuesta}`;
        if (this.currentMessageID % 2 === actors.AGENT) {
          this.chat.messages[this.currentMessageID].lines.push(line);
        } else {
          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message);
          this.chat.messages[this.currentMessageID].lines.push(line);
        }
      }),

      addUserMessage: action.bound(function(line) {
        let message = {
          id: this.currentMessageID,
          lines: [],
          time: new Date().toLocaleString(),
        };

        //si es el turno del usuario de escribir simplemente escribimos en el canal activo
        if (this.currentMessageID % 2 === actors.USER) {
          this.chat.messages[this.currentMessageID].lines.push(line);
        } else {
          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message);
          this.chat.messages[this.currentMessageID].lines.push(line);
        }
      }),
    });
  }
}

const ChatStore=new _ChatStore();
export default ChatStore;