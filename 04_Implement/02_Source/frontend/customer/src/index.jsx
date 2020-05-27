import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
