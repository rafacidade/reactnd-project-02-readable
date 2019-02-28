import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatCategoryName } from '../utils/helpers'
import { handleVoteUpPost, handleVoteDownPost } from '../actions/posts'
import { Link, withRouter } from 'react-router-dom'
import { TiMessage, TiThumbsUp, TiThumbsDown } from 'react-icons/ti'

class PostListItem extends Component {
	handleVoteUpPostClick = (e) => {
		e.preventDefault()
		
		const { dispatch, id } = this.props
		
		dispatch(handleVoteUpPost(id))
	}

	handleVoteDownPostClick = (e) => {
		e.preventDefault()
		
		const { dispatch, id } = this.props
		
		dispatch(handleVoteDownPost(id))
	} 
  
  render() {
		const { post } = this.props

    if (post === null) {
      return <p>Post not avaliable</p>
    }

    const {
      title, timestamp, commentCount, voteScore, author, category
    } = post

    return (
    	<div className="card shadow mb-4">
          <div className="card-body">
          	<Link to={`/${category}`}>
            	<h6>{formatCategoryName(category)}</h6>
        		</Link>
        	<Link to={`/${post.category}/${post.id}`}>
            	<h2 className="card-title">{title}</h2>
        	</Link>
            <div className="text-muted">
              Posted on {formatDate(timestamp)} by <strong>{author}</strong>
            </div>
            <div className="text-muted">
            	<i className="icon">
	               <TiMessage />
	            </i>
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
						<Link to={`/${post.category}/${post.id}`}>
            	<button className="btn btn-sm btn-primary">Read Post &rarr;</button>
						</Link>
          </div>
        </div>     
    )
  }
}

function mapStateToProps ({ posts }, { id }) {	
  return {
    id,
		post: posts[id],
  }
}

export default withRouter(connect(mapStateToProps)(PostListItem))