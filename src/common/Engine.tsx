import {buildSearchEngine, getSampleSearchEngineConfiguration} from '@coveo/headless';

const getEndpointToLocalServer = () => {
  if (!process.env.REACT_APP_SERVER_PORT) {
    throw new Error('Undefined "REACT_APP_SERVER_PORT" environment variable');
  }
  const port = process.env.REACT_APP_SERVER_PORT;
  const pathname = '/token';
  return `http://localhost:${port}${pathname}`;
};

const getTokenEndpoint = () => {
  return process.env.REACT_APP_TOKEN_ENDPOINT || getEndpointToLocalServer();
};

export async function getSearchToken() {
  const res = await fetch(getTokenEndpoint());
  const {token} = await res.json();
  return token;
}

// export async function initializeHeadlessEngine() {
//   return buildSearchEngine({
//     configuration: getSampleSearchEngineConfiguration()
//   })
// }

export async function initializeHeadlessEngine() {
  return buildSearchEngine({
    configuration: {
      platformUrl: process.env.REACT_APP_PLATFORM_URL,
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: await getSearchToken(),
      renewAccessToken: getSearchToken,
    },
  });
}
