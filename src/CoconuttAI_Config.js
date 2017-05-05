const baseUrl = 'http://34.210.26.194:8080/message';
const timeout = 10000;

const CoconuttAI_Config = {
    baseUrl: baseUrl,
    timeout: timeout,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "http://f626198b.ngrok.io"
    },

};

export default CoconuttAI_Config;
