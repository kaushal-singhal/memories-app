import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from "react-redux"
import {applyMiddleware,compose,createStore} from "redux"
import {thunk} from "redux-thunk"
import "./index.css";

import reducers from "./reducers";

const store =createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(<GoogleOAuthProvider clientId="1073613656766-hcfrjivs4hmop3d5fk4ll7n06uoldtfj.apps.googleusercontent.com"><Provider store={store}><App/></Provider></GoogleOAuthProvider>,document.getElementById("root"));