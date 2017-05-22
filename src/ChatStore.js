import { computed, extendObservable, action, toJS } from 'mobx';
import v4 from 'uuid/v4';
import remotedev from 'mobx-remotedev';
import CoconuttAI from './CoconuttAI';
import AssetsConfig from './AssetsConfig';

class _ChatStore {
  constructor() {
    const agentIconResponse2User = `${AssetsConfig.baseAssetsURL}/agent-icon-Response2User.png`;

    const agentName = 'BCBNews Agent';
    const actors = {
      AGENT: 0,
      USER: 1
    };
    extendObservable(this, {
      currentMessageID: 0,
      isPNLProcessingMessage: false,
      isErrorExistsOnPNLProcessMessage: false,
      questionAreaMessage: '',
      //////////////////////////////
      watsonContext: {},
      chat: {
        id: v4(),
        agentName: agentName,
        agentAvatar: agentIconResponse2User,
        messages: [
          {
            id: 0,
            messageLines: [
              'Hola.',
              `Hoy seré quien pueda brindarle apoyo.`,
              '¿Cómo le puedo ayudar?'
            ],
            time: new Date().toLocaleString()
          }
        ]
      },
      setWatsonContext: action.bound(function(_context) {
        this.watsonContext = _context;
      }),

      setQuestionAreaMessage: action.bound(function(questionAreaText) {
        this.questionAreaMessage = questionAreaText;
      }),

      get getQuestionAreaMessage() {
        return this.questionAreaMessage;
      },

      showOnChatAgentMessage: action.bound(function(line) {
        let message = {
          id: this.currentMessageID,
          messageLines: [],
          time: new Date().toLocaleString()
        };

        //si NO es el turno del usuario de escribir simplemente escribimos en el canal activo

        if (this.currentMessageID % 2 !== actors.AGENT) {
          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message);
        }
        this.chat.messages[this.currentMessageID].messageLines.push(line);
      }),

      processUserMessage: action.bound(function(MessageUserline) {
        this.isPNLProcessingMessage = true;
        this.isErrorExistsOnPNLProcessMessage = false;
        let message = {
          id: this.currentMessageID,
          messageLines: [],
          time: new Date().toLocaleString()
        };

        //si NO es el turno del usuario de escribir simplemente escribimos en el canal activo
        if (this.currentMessageID % 2 !== actors.USER) {
          //si ya no es su turno, generamos un nuevo canal y escribimos
          this.currentMessageID++;
          message.id = this.currentMessageID;
          this.chat.messages.push(message); //generamos el cascaron de un nuevo mensaje
        }
        this.chat.messages[this.currentMessageID].messageLines.push(
          MessageUserline
        ); //rellenamos el cascaron del mensaje con lo que escribio el usuario

        ///////////////////////Conexion con la API de PNL
        CoconuttAI.send(MessageUserline, toJS(this.watsonContext))
          .then(DelayPromise(1500))
          .then(response => {
            if (response.status === 200) {
              if (response.data.error === false) {
                this.showOnChatAgentMessage(response.data.output.text[0]);
                this.setQuestionAreaMessage('');
                this.setWatsonContext(response.data.context);
              } else {
                console.error(response);
                this.showOnChatAgentMessage(
                  'Por el momento tenemos problemas con nuestro agente, por favor intente de nuevo...'
                );
                this.isErrorExistsOnPNLProcessMessage = true;
              }
            } else {
              console.error(response);
              this.showOnChatAgentMessage(
                'Por el momento tenemos problemas con nuestro agente, por favor intente de nuevo...'
              );
              this.isErrorExistsOnPNLProcessMessage = true;
            }
            this.isPNLProcessingMessage = false;
          })
          .catch(errorValue => {
            console.log(errorValue);
            this.showOnChatAgentMessage(
              'Por el momento tenemos problemas con nuestro agente, por favor intente de nuevo...'
            );
            this.isPNLProcessingMessage = false;
            this.isErrorExistsOnPNLProcessMessage = true;
          });

        /////////////////////////////////////////////////
      }) //processUserMessage: action.bound(
    }); //extendObservable(...
  }
}

const ChatStore = new _ChatStore();
export default remotedev(ChatStore, { global: true });

function DelayPromise(delay) {
  //return a function that accepts a single variable
  return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, 1000 + delay * Math.random());
    });
  };
}
