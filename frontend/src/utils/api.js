import { generateUID } from './helpers'
const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/*** INICIAL DATA  ***/

export function _getInitialData () {
  return Promise.all([
    _getCategories(),
    _getPosts(),
  ]).then(([categories, posts]) => ({
    categories,
    posts,
  }))
}

/*** CATEGORIES ***/

export const _getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/*** POSTS ***/

export const _getPostsByCategory = (category) =>
  fetch(`${api}/${category.name}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const _getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .catch( error => console.log(error));

export const _addPost = (post) => {
 	post = {
 		...post,
 		id: generateUID(),
	  timestamp: Date.now(),	    
  }

  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .catch(err => { console.log(err) })
}

export const _getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const _deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, { 
  		method: 'DELETE', 
  		headers 
  	})
    .then(res => res.json())

export const _voteUpPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())

export const _voteDownPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' }),
  }).then(res => res.json())

export const _editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json())
  .catch( error => console.log(error))

/*** COMMENTS ***/

export const _getPostComments = (post) =>
  fetch(`${api}/posts/${post.id}/comments`, { headers })
    .then(res => res.json())
    .catch( error => console.log(error));
    
export const _getComment = (commentId) =>
  fetch(`${api}/posts/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data.comment)

export const _addComment = (comment) => {
	comment = {
 		...comment,
 		id: generateUID(),
	  	timestamp: Date.now(),	    
 	}

  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
}

export const _voteUpComment = (comment, body) =>
  fetch(`${api}/comment/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    option: 'upVote'
  }).then(res => res.json())

export const _voteDownComment = (comment) =>
  fetch(`${api}/comment/{$comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    option: 'downVote'
  }).then(res => res.json())

export const _deleteComment = (comment) =>
  fetch(`${api}/comment/${comment.id}`, { 
		method: 'DELETE', 
		headers 
	})
  .then(res => res.json())
  .then(data => data.comment)

export const _editComment = (comment, body) =>
  fetch(`${api}/comment/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  }).then(res => res.json())