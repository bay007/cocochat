const baseUrl = 'https://9c73470b.ngrok.io/message';
const timeout = 10000;

const CoconuttAI_Config = {
  baseUrl: baseUrl,
  timeout: timeout,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

export default CoconuttAI_Config;
