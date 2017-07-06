/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";
import consts from "./const";

// work with api goes here

export function getRepositories(token, page, limit) {
  return fetch('https://api.github.com/user/repos?access_token=' + token + '&page=' + page + '&per_page=' + limit, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3.full+json',
      'Content-Type': 'application/json',
    }
  }).then((list) => {
    return list.json()
  })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}


export function getReadMe(token, username, repository) {
  console.log('https://api.github.com/repos/' + 'TeeRawk' + '/' + repository + '/readme?access_token=' + token);
  return fetch('https://api.github.com/repos/' + 'TeeRawk' + '/' + repository + '/readme?access_token=' + token, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3.full+json',
      'Content-Type': 'application/json',
    }
  }).then((readMe) => {
    return readMe.json()
  })
    .then((responseJson) => {
      console.log(Base64.atob(responseJson.content));
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}


export function getAccessToken(username, password) {
  baseString = Base64.btoa(username + ':' + password).replace('\n', '\\n');
  return fetch('https://api.github.com/authorizations/clients/' + consts.CLIENT_ID, {
    method: 'PUT',
    headers: {
      ...consts.BASE_HEADER,
      "Authorization": "Basic " + baseString
    },
    body: JSON.stringify({
      client_secret: consts.CLIENT_SECRET,
    })
  }).then((user) => {
    return user.json()
  })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}