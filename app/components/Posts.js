import React from 'react'
import {useReducer, useEffect} from 'react';
import PropTypes from 'prop-types'
import {fetchMainPosts} from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

function postsReducer(state, action) {
    if (action.type === 'fetch') {
        return {
            posts: null,
            error: null,
            loading: true
        }
    } else if (action.type === 'success') {
        return {
            posts: action.posts,
            error: null,
            loading: false
        }
    } else if (action.type === 'error') {
        return {
            posts: null,
            error: action.error,
            loading: false
        }
    } else {
        throw new Error("This type of action is not supported!")
    }
}

export default function Posts({type}) {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null,
        error: null,
        loading: true,
    })

    useEffect(() => {
        dispatch({type: 'fetch'})

        fetchMainPosts(type)
            .then((posts) => dispatch({type: 'success', posts}))
            .catch(({message}) => dispatch({type: 'error', error: message}))
    }, [type])

    const {posts, loading, error} = state;

    if (loading === true) {
        return <Loading/>
    }

    if (error) {
        return <p className='center-text error'>{error}</p>
    }

    return <PostsList posts={posts}/>
}

Posts.propTypes = {
    type: PropTypes.oneOf(['top', 'new'])
}