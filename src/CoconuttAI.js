import axios from 'axios';
import CoconuttAI_Config from './CoconuttAI_Config';


class coconuttAI {
    constructor() {
        this.instance = axios.create({ headers: CoconuttAI_Config.headers });
    }

    send(textMessage) {

        let message = {
            message: textMessage
        }

        let localConfig = {
            timeout: CoconuttAI_Config.timeout,
            headers: CoconuttAI_Config.headers
        };

        return this.instance.post(CoconuttAI_Config.baseUrl, message, localConfig);
    }
}

const CoconuttAI = new coconuttAI();
export default CoconuttAI;