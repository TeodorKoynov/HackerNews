import React from 'react'
import {useReducer, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {fetchUser, fetchPosts} from '../utils/api'
import Loading from './Loading'
import {formatDate} from '../utils/helpers'
import PostsList from './PostsList'

function postReducer(state, action) {
    if (action.type === 'fetch') {
        return {
            ...state,
            loadingUser: true,
            loadingPosts: true,
        }
    } else if (action.type === 'user') {
        return {
            ...state,
            user: action.user,
            loadingUser: false
        }
    } else if (action.type === 'posts') {
        return {
            ...state,
            posts: action.posts,
            loadingPosts: false,
            error: null,
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            error: action.message,
            loadingPosts: false,
            loadingUser: false
        }
    } else {
        throw new Error(`That action type is not supported.`)
    }
}

export default function User() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [state, dispatch] = useReducer(
        postReducer,
        {user: null, loadingUser: true, posts: null, loadingPosts: true, error: null}
    )

    useEffect(() => {
        dispatch({type: 'fetch'})

        fetchUser(id)
            .then((user) => {
                dispatch({type: 'user', user})
                return fetchPosts(user.submitted.slice(0, 30))
            })
            .then((posts) => dispatch({type: 'posts', posts}))
            .catch(({message}) => dispatch({type: 'error', message}))
    }, [id])

    const {user, posts, loadingUser, loadingPosts, error} = state

    if (error) {
        return <p className='center-text error'>{error}</p>
    }

    return (
        <React.Fragment>
            {loadingUser === true
                ? <Loading text='Fetching User'/>
                : <React.Fragment>
                    <div className={'user-card'}>
                        <h1 className='header'>{user.id}</h1>
                        <div className='meta-info-light'>
                            <span>joined <b>{formatDate(user.created)}</b></span>
                            <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
                        </div>
                        <p dangerouslySetInnerHTML={{__html: user.about}}/>
                    </div>
                </React.Fragment>}
            {loadingPosts === true
                ? loadingUser === false && <Loading text='Fetching posts'/>
                : <React.Fragment>
                    <h2>Posts</h2>
                    <PostsList posts={posts}/>
                </React.Fragment>}
        </React.Fragment>
    )
}

