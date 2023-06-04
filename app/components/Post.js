import React from 'react'
import {useReducer, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {fetchItem, fetchPosts, fetchComments} from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'

function postReducer(state, action) {
    if (action.type === 'fetch') {
        return {
            ...state,
            loadingPost: true,
            loadingComments: true,
        }
    } else if (action.type === 'post') {
        return {
            ...state,
            loadingPost: false,
            post: action.post,
        }
    } else if (action.type === 'comments') {
        return {
            ...state,
            loadingComments: false,
            comments: action.comments,
        }
    } else if (action.type === 'error') {

    } else {
        throw new Error('This type of action is not supported!')
    }
}

export default function Post() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [state, dispatch] = useReducer(postReducer, {
        post: null,
        loadingPost: true,
        comments: null,
        loadingComments: true,
        error: null,
    })

    const {post, comments, loadingPost, loadingComments, error} = state;

    useEffect(() => {
        dispatch({type: 'fetch'});

        fetchItem(id)
            .then(post => {
                dispatch({type: 'post', post: post})
                return fetchComments(post.kids || [])
            })
            .then(comments => dispatch({type: 'comments', comments: comments}))
            .catch(({message}) => dispatch({type: 'error', error: message}))
    }, [id])

    return (
        <React.Fragment>
            {loadingPost === true
                ? <Loading text='Fetching post'/>
                : <React.Fragment>
                    <h1 className='header'>
                        <Title url={post.url} title={post.title} id={post.id}/>
                    </h1>
                    <PostMetaInfo
                        by={post.by}
                        time={post.time}
                        id={post.id}
                        descendants={post.descendants}
                    />
                    <p dangerouslySetInnerHTML={{__html: post.text}}/>
                </React.Fragment>}
            {loadingComments === true
                ? loadingPost === false && <Loading text='Fetching comments'/>
                : <React.Fragment>
                    {comments.map((comment) =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    )}
                    {comments.length === 0 && <p className={'info'}>No Comments</p>}
                </React.Fragment>}
        </React.Fragment>
    )
}
