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
  .catch(error => { console.log(error) })
}

/*** CATEGORIES ***/

export const _getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    .catch(error => { console.log(error) })

/*** POSTS ***/

export const _getPostsByCategory = (category) =>
  fetch(`${api}/${category.name}/posts`, { headers })
    .then(res => res.json())
    .catch(error => { console.log(error) })

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
  .catch(error => { console.log(error) })
}

export const _getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)
    .catch(error => { console.log(error) })

export const _deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { 
  		method: 'DELETE', 
  		headers 
  	})
    .then(res => res.json())
    .catch(error => { console.log(error) })

export const _voteUpPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())
  .catch(error => { console.log(error) })

export const _voteDownPost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' }),
  }).then(res => res.json())
  .catch(error => { console.log(error) })

export const _editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
  .catch( error => console.log(error))

/*** COMMENTS ***/

export const _getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .catch( error => console.log(error));
    
export const _getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .catch(error => { console.log(error) })

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
  .catch(error => { console.log(error) })
}

export const _voteUpComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())
  .catch(error => { console.log(error) })

export const _voteDownComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json())
  .catch(error => { console.log(error) })

export const _deleteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, { 
		method: 'DELETE', 
		headers 
	})
  .then(res => res.json())
  .then(data => data.comment)
  .catch(error => { console.log(error) })

export const _editComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
  .catch(error => { console.log(error) })