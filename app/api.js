/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";
import consts from "./const";

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