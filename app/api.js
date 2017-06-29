/**
 * Created by saionara1 on 6/21/17.
 */
import Base64 from "./utils/Base64";

export function authorize(username, password) {
  baseString = Base64.btoa(username + ':' + password).replace('\n', '\\n');

  return fetch('https://api.github.com/user', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3.full+json',
      'Content-Type': 'application/json',
      "Authorization": "Basic " + baseString

    },
    body: JSON.stringify({
      note: 'test'
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