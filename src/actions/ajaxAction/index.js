// Jquery Import
// import $ from 'jquery'
import fetch from 'isomorphic-fetch'
// ajax请求类型
import * as type from '../../constants/ajaxType'


// 用户触发ajax请求
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

// 自动刷新，触发ajax请求
export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

// 网络请求控制
export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

// 处理请求接收到的数据
export function receivePosts(subreddit, json) {
    console.log(json);
    console.log(subreddit)
    return {
        type: type.RECEIVE_POSTS,
        subreddit,
        posts: json,
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit, param) {
    return function (dispatch) {
        return fetch(subreddit, {
            // etch 跨域请求时默认不会带 cookie，需要时得手动指定 credentials: 'include'
            credentials: 'include',
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: toQueryString(param)
        })
            .then(response => response.json())
            // 等价于function(response){return response.json()}
            .then(json =>
                // 可以多次 dispatch！
                // 这里，使用 API 请求结果来更新应用的 state。
                dispatch(receivePosts(subreddit, json))
            )
    }
}

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key]
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2)
            }).join('&')
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val)
    }).join('&') : ''
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }else {
            return Promise.resolve()
        }
    }
}