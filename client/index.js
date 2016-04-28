import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import gitApp from './reducers/combineReducers'
import App from './components/app'

let store = createStore(gitApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
