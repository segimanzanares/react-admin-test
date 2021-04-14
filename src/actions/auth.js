//import fetch from 'cross-fetch'
import api from '../api';

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'
export const RESET_ERROR = 'RESET_ERROR'

export function login(email, password, redirect) {
    return {
        type: LOGIN,
        email,
        password,
        redirect
    }
}

export function performLogin(email, password) {
    return dispatch => {
        dispatch(login(email, password));
        let data = {
            username: email,
            password,
            grant_type: 'password',
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
        };
        return api('post', '/oauth/token', data)
            .then(response => {
                return response;
            })
            .then(response => dispatch(loginSuccess(response.data)))
            .catch(err => dispatch(loginError(err)))
    }
}

export function loginSuccess(auth) {
    return {
        type: LOGIN_SUCCESS,
        auth
    }
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}

export function logout(subreddit) {
    return {
        type: LOGOUT,
        subreddit
    }
}
/*
export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPostsError(subreddit, err) {
    return {
        type: FETCH_POSTS_ERROR,
        subreddit,
        err
    }
}

export function resetError() {
    return {
        type: RESET_ERROR
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (getState().errors.length > 0) {
            dispatch(resetError())
        }
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
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

function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => {
                if (!response.ok) {
                    throw Error(`Subreddit: ${subreddit} doesn't exist.`)
                }
                return response
            })
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
            .catch(err => dispatch(fetchPostsError(subreddit, err.message)))
    }
}
*/