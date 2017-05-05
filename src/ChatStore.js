import { computed, extendObservable, action } from 'mobx';
import v4 from 'uuid/v4';
import remotedev from 'mobx-remotedev';
import API_AI from './API.AI';

class _ChatStore {
  constructor() {
    const actors = {
      AGENT: 0,
      USER: 1
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
              '¿Cómo le puedo ayudar?'
            ],
            time: new Date().toLocaleString()
          }
        ]
      },

      addAgentMessage: action.bound(function (line) {
        let message = {
          id: this.currentMessageID,
          lines: [],
          time: new Date().toLocaleString()
        };

        //si es el turno del usuario de escribir simplemente escribimos en el canal activo

        if (this.currentMessageID % 2 !== actors.AGENT) {

          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message);
        }
        this.chat.messages[this.currentMessageID].lines.push(line);
      }),

      addUserMessage: action.bound(function (line) {
        let message = {
          id: this.currentMessageID,
          lines: [],
          time: new Date().toLocaleString()
        };

        //si es el turno del usuario de escribir simplemente escribimos en el canal activo
        if (this.currentMessageID % 2 !== actors.USER) {
          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message);
        }
        this.chat.messages[this.currentMessageID].lines.push(line);
        API_AI.send(line)
          .then(response => {
            if (response.data.status.code === 200) {
              this.addAgentMessage(response.data.result.fulfillment.speech);
            } else {
              console.error(response.data.status.errorDetails);
              this.addAgentMessage('Por el momento tenemos problemas con nuestro agente, por favor intente mas tarde');
            }
          })
          .catch(value => {
            this.addAgentMessage(value);
          });
      })
    });
  }
}

const ChatStore = new _ChatStore();
export default remotedev(ChatStore, { global: true });
