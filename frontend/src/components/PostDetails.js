import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentList from './CommentList'
import { Link } from 'react-router-dom'
import { TiMessage, TiThumbsUp, TiThumbsDown } from 'react-icons/ti'
import { handleVoteDownPost, handleVoteUpPost, handleDeletePost } from '../actions/posts'
import { formatDate, formatCategoryName } from '../utils/helpers';
import CommentAdd from './CommentAdd';

class PostDetails extends Component {
  handleVoteUpPostClick = (e) => {
		e.preventDefault()

		const { dispatch, postId } = this.props

		dispatch(handleVoteUpPost(postId))
	}

	handleVoteDownPostClick = (e) => {
		e.preventDefault()

		const { dispatch, postId } = this.props

		dispatch(handleVoteDownPost(postId))
  }

  handleDeletePostClick  = (e) => {
    e.preventDefault()

    const { dispatch, postId } = this.props

    const post = { id: postId }

    if(window.confirm('Delete post?')) {
      dispatch(handleDeletePost(post))
  	  this.props.history.push('/')
    }
  }

  handleEditPostClick  = (e) => {
    e.preventDefault()
    const { postId } = this.props
    this.props.history.push(`/edit/post/${postId}`)
  }

  render() {
    const { postId, post, categories, categoriesIds } = this.props

    if (typeof post === 'undefined') {
      return (
          <div className="container main" align="center">
            <h2>Post not found</h2>
          </div>
       )
    }

    if (post.deleted === true) {
      return (
          <div className="container main" align="center">
            <h2>Post not found</h2>
          </div>
       )
    }

    const {
      title, timestamp, commentCount, voteScore, author, category, body
    } = post

    const categoryId = categoriesIds.filter(c => { return categories[c].path === category })

    return (
      <div className="container main">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="bar-btns">
              <button type="button" className="btn btn-primary" onClick={this.handleEditPostClick}>Edit</button>
              <button type="button" className="btn btn-danger" onClick={this.handleDeletePostClick}>Delete</button>
            </div>
            {category &&
            <Link to={`/${categories[categoryId].path}`}>
            	<h6>{formatCategoryName(categories[categoryId].name)}</h6>
        		</Link>}
            <h2 className="card-title">{title}</h2>
        	  <div className="text-muted">
              <small>Posted on {formatDate(timestamp)} by <strong>{author}</strong></small>
            </div>
            <div>
              {body}
            </div>
            <div className="text-muted">
            	<a href="#comment-list">
                <i className="icon icon-btn">
	               <TiMessage />
	              </i>
              </a>
              	{commentCount} Comments |
              	<i className="icon icon-btn" onClick={this.handleVoteUpPostClick}>
	               <TiThumbsUp />
	            </i>
							{voteScore}
	            <i className="icon icon-btn" onClick={this.handleVoteDownPostClick}>
	               <TiThumbsDown />
	            </i>
            </div>
            <hr/>
            <CommentAdd parentId={postId} />
            <CommentList postId={postId} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, props) {
  const { postId } = props.match.params
  const categoriesIds = Object.keys(categories)

  return {
    postId,
    post: posts[postId],
    categories,
    categoriesIds,
  }
}

export default connect(mapStateToProps)(PostDetails)