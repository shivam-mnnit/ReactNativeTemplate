1. Architecture: Redux + saga https://github.com/redux-saga/redux-saga

2. Project structure:
   - android
   - ios
   - node_modules
   - index.android.js
   - index.ios.js
   - …
   - app
    - actions
     - login-actions.js
     - sign-up-actions.js
     - …
    - components
     - Login.js
     - SignUp.js
     - …
    - reducers
     - loginReducer.js
     - signUpReducer.js
     - …
    - resources
     - strings.js
     - colors.js
     - dimens.js
     - styles.js
    - store
     - configureStore.js
    - api.js
    - app.js
    - const.js

3. Code style: https://github.com/airbnb/javascript

4. Navigator: https://reactnavigation.org/

5. Strings localization: https://github.com/stefalda/ReactNativeLocalization

6. Networking: rx-fetch + rxjs

7. Maps: https://github.com/airbnb/react-native-maps

8. Permissions: https://github.com/yonahforst/react-native-permissions

9. Image picker: https://github.com/ivpusic/react-native-image-crop-picker

10. OpenGL: https://github.com/ProjectSeptemberInc/gl-react-native

11. Fabric: https://www.npmjs.com/package/react-native-fabric

12. Icons: https://oblador.github.io/react-native-vector-icons/

13. UI components: https://nativebase.io/

14. Dialogs: https://www.npmjs.com/package/react-native-popup-dialog

15. Antipatterns:
  - Do not use setState() in componentWillMount()
  - Do not perform any logic in render() function
  - Do not use indexes of an array as its keys
  - Do not validate forms with redux store
  - Do not perform any logic in reducers
  - Do not perform too much dispatches
  - Do not rely on JS single thread
  - Do not use x-index a lot
  - Do not use ListView, use FlatList instead
  - Remove console.log() calls
  - Do not use object literals in render()
  - Reduce render() function calls
  - Use InteractionManager.runAfterInteractions() to perform any hard stuff
  - Use requestAnimationFrame to perform animations
  - Extend React.PureComponent as much as possible
  - Use shouldRasterizeIOS
  - Use renderToHardwareTextureAndroid
  - Do not perform any logic in componentWillMount()
  - Use useNativeDriver
16. Versioning: packadge.json - замораживаем версии библиотек на время жизни проекта.

17. Use formatting tabulation of 2. Needs to be changed in WebStorm settings

![](https://lh6.googleusercontent.com/05rcRv9E2RN1emBzVDOQEdrj_YSe1Jj90ILoCgOyUms73JPcO9qWcTy0CGg-d_o-AHMbYB2w_pId_9_b5E7UV3kTcuUtFMA6gHTBDRZ2_YUug26aFSVx-9nnU70-QU6XMm1TAjJN)

