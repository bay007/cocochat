import ConversationV1 from 'watson-developer-cloud/conversation/v1';
import WCconfig from './WCconfig';

class WatsonConversation {
  constructor() {
    this.conversation = new ConversationV1(WCconfig);
  }

  send(_textMessage) {
    let context = {};
    let payload = {
      workspace_id: WCconfig.workspaceID,
      input: { text: _textMessage },
      context: context
    };
    return new Promise((resolve, reject) => {
      this.conversation.message(payload, (err, response) => {
        if (err) {
          console.log('error:', err);
          reject(`error:${err}`);
        } else {
          resolve(response);
        }
      });
    });
  }
}

const WC = new WatsonConversation();
export default WC;
