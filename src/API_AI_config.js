const accessToken = '27606e11210c4f538d8a8d67c32897d0';
const baseUrl = 'https://api.api.ai/v1/query?v=20150910';
const timeout=2500;
const timezone='America/Mexico_City';
const lang='en';


const API_AI_config = {
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${accessToken}`,
  },
  timeout:timeout,
  timezone: timezone,
  lang:lang
};

export default API_AI_config;
