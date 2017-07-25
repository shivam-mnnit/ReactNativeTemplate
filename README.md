 # React Native Template Project

![](http://i65.tinypic.com/14bucuh.png)

To improve quality of our work and delivery to clients the best products, we created the template based on our experience in mobile development, and now we can use it as a fundamental for further projects. We found out and combined the patterns and libraries to make a robust app that works properly on both platforms: Android and iOS. 

## Read article [here](www.google.com)

The template project interacts with Github API and contains user flows that coverage majority of use cases, such as:


![Login](https://i.imgur.com/a0iG59l.png "Login")
![List of items](https://i.imgur.com/YapJWmS.png "List of items")
![Detail Screen](https://i.imgur.com/zrY4KHT.png "Detail Screen")
![LogOut](https://i.imgur.com/TZBkL6L.png "LogOut")

## Get Started

If you have not React Native installed, you can use [this tutorial](https://facebook.github.io/react-native/docs/getting-started.html).

Use ```git clone``` to get project. Then go to the root folder of project and install all node modules using ```npm install``` command.

### Run on Android

1. You have to connect hardware device using [ADB](https://developer.android.com/studio/command-line/adb.html) or run [emulator](https://developer.android.com/studio/run/emulator-commandline.html).
2. Invoke ```react-native run-android``` command.

### Run on iOS

1. You have to get  [Xcode](https://developer.apple.com/xcode/) installed on your machine.
2. Invoke ```react-native run-ios``` command.

## Project Description

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
  - Don't use ```toJS()``` with immutable to avoid creation unnecessary object.
 
16. Versioning: packadge.json - замораживаем версии библиотек на время жизни проекта.

17. Use formatting tabulation of 2. Needs to be changed in WebStorm settings
![](https://lh6.googleusercontent.com/05rcRv9E2RN1emBzVDOQEdrj_YSe1Jj90ILoCgOyUms73JPcO9qWcTy0CGg-d_o-AHMbYB2w_pId_9_b5E7UV3kTcuUtFMA6gHTBDRZ2_YUug26aFSVx-9nnU70-QU6XMm1TAjJN)

18. Add all component props to propTypes. It adds safety, shows you what props available, and allows IDEA/WebStorm to autocomplete them. https://facebook.github.io/react/docs/typechecking-with-proptypes.html

19. Use ```redux-immutable``` to create immutable store.
    [Redux FAQ: Immutable Data](http://redux.js.org/docs/faq/ImmutableData.html#redux-faq-immutable-data)
    
    ```js
    import { combineReducers } from 'redux-immutable';
    import loginReducer from "../reducers/loginReducer";
    import rootReducer from "../reducers/rootReducer";
    import listReducer from "../reducers/listReduser";

    const combinedReducers = combineReducers({
        root: rootReducer,
        login: loginReducer,
        list: listReducer,
    });
    ```
    ```redux-persist``` can't work with immutable state. So, we have to use ```redux-persist-immutable```.
    ```js
    import { autoRehydrate, persistStore } from 'redux-persist-immutable'
    import { applyMiddleware, compose, createStore } from "redux";
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware), autoRehydrate({log: true})));
    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );
    ```
