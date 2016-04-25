//import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'
import configureStore from './store/configureStore'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './actions/ajaxAction'
import rootReducer from './reducers'

import INTERFACE from './constants/ajaxData'


const store = configureStore()

//store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts(INTERFACE.GALLERY_LIST.url, INTERFACE.GALLERY_LIST.param)).then(() =>
    console.log(store.getState())
)
//store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
//    console.log(store.getState())

