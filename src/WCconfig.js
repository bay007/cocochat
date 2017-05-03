//Autor: Galicia Romo Esteban Ivan
//Configuracion de parametros de conexión con IBM conversations

let workspaceID = '7cb1f0e7-33b1-439e-9461-4ed745fc56c1';
let credentials = {
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: '47d008b3-5af3-40a5-9c8c-765eee7343ec',
  password: 'fogYUzjvWNHr'
};

//No modificar los siguientes parametros
const WCconfig = {
  workspaceID: workspaceID,
  username: credentials.username,
  password: credentials.password,
  version: 'v1',
  version_date: '2017-04-21',
  url: credentials.url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};
//No modificar los anteriores parametros
export default WCconfig;
