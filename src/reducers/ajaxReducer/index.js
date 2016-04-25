import { combineReducers } from 'redux'
import {
    SELETC_SUBREDDIT, INVALIDTAE_SUBREDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../../constants/ajaxType'

export function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELETC_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDTAE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

export function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDTAE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
                /* 等价于
                 let nextState = {}
                 nextState[action.subreddit] = posts(state[action.subreddit], action)
                 return Object.assign({}, state, nextState)
                 */
            })
        default:
            return state
    }
}

