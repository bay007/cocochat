import { computed, extendObservable, action } from 'mobx';
import v4 from 'uuid/v4';
import remotedev from 'mobx-remotedev';
import CoconuttAI from './CoconuttAI';

class _ChatStore {
  constructor() {
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

      chat: {
        id: v4(),
        agentName: 'Egalicia',
        agentAvatar: 'http://i.imgur.com/DY6gND0.png',
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

      setQuestionAreaMessage: action.bound(function (questionAreaText) {
        this.questionAreaMessage = questionAreaText;
      }),

      get getQuestionAreaMessage() {
        return this.questionAreaMessage;
      },
      showOnChatAgentMessage: action.bound(function (line) {

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

      processUserMessage: action.bound(function (MessageUserline) {
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
          this.chat.messages.push(message);//generamos el cascaron de un nuevo mensaje
        }
        this.chat.messages[this.currentMessageID].messageLines.push(MessageUserline); //rellenamos el cascaron del mensaje con lo que escribio el usuario


        ///////////////////////Conexion con la API de PNL
        CoconuttAI.send(MessageUserline)
          .then(DelayPromise(2500))
          .then(response => {
            console.log(response);
            if (response.status === 200) {

              this.showOnChatAgentMessage(response.data.msg);
              this.setQuestionAreaMessage('');
            } else {
              console.error(response);
              this.showOnChatAgentMessage('Por el momento tenemos problemas con nuestro agente, por favor intente de nuevo...');
              this.isErrorExistsOnPNLProcessMessage = true;
            }
            this.isPNLProcessingMessage = false;
          })
          .catch((errorValue) => {
            console.log(errorValue);
            this.showOnChatAgentMessage('Por el momento tenemos problemas con nuestro agente, por favor intente de nuevo...');
            this.isPNLProcessingMessage = false;
            this.isErrorExistsOnPNLProcessMessage = true;
          })

        /////////////////////////////////////////////////
      }) //processUserMessage: action.bound(

    });//extendObservable(...
  }
}

const ChatStore = new _ChatStore();
export default remotedev(ChatStore, { global: true });

function DelayPromise(delay) {
  //return a function that accepts a single variable
  return function (data) {
    //this function returns a promise.
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, 1000 + (delay * Math.random()));
    });
  }
}