import axios from 'axios';
import v4 from 'uuid/v4';
import API_AI_config from './API_AI_config';

class apiai {
  constructor() {
    this.instance = axios.create({
      headers: API_AI_config.headers,
    });
  }

  send(textMessage) {
    let message = {
      sessionId: v4(),
      query: textMessage.trim(),
      lang: API_AI_config.lang,
      timezone: API_AI_config.timezone,
    };

    let localConfig = {
      headers: API_AI_config.headers,
      timeout: API_AI_config.timeout,
    };

    return this.instance.post(API_AI_config.baseUrl, message, localConfig);
  }
}

const API_AI = new apiai();
export default API_AI;
