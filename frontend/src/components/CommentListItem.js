import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { TiThumbsUp, TiThumbsDown, TiTrash, TiPencil } from 'react-icons/ti'
import { handleVoteUpComment, handleVoteDownComment, handleDeleteComment } from '../actions/comments'

class CommentListItem extends Component {
  handleVoteUpCommentClick = (e) => {
		e.preventDefault()

		const { dispatch, commentId } = this.props

		dispatch(handleVoteUpComment(commentId))
	}

	handleVoteDownCommentClick = (e) => {
		e.preventDefault()

		const { dispatch, commentId } = this.props

		dispatch(handleVoteDownComment(commentId))
  }

  handleDeleteCommentClick  = (e) => {
    e.preventDefault()

    const { dispatch, comment } = this.props

    if(window.confirm('Delete comment?')) {
      dispatch(handleDeleteComment(comment))
    }
  }

  handleEditCommentClick  = (e) => {
    e.preventDefault()
    const { commentId } = this.props
    this.props.history.push(`/edit/comment/${commentId}#top`)
  }

  render() {
    const { comment } = this.props

    if (comment === null) {
      return <p>This Comment does not exists</p>
    }

    const { timestamp, body, author, voteScore } = comment

    return (
      <div className='comment'>
        <div className="row">
          <div className="col-sm-2 text-muted" align="center">
            <i className="icon icon-btn" onClick={this.handleVoteUpCommentClick}>
                <TiThumbsUp />
            </i>
            {voteScore}
            <i className="icon icon-btn" onClick={this.handleVoteDownCommentClick}>
                <TiThumbsDown />
            </i>
          </div>
          <div className="col-sm-8">
            <div>
              <strong>{author}</strong>
            </div>
            <div className="text-muted">
              <small>{formatDate(timestamp)}</small>
              <p>{body}</p>
            </div>
          </div>
          <div className="col-sm-2" align="center">
            <i className="icon icon-btn" onClick={this.handleEditCommentClick}>
              <TiPencil />
            </i>
            <i className="icon icon-btn" onClick={this.handleDeleteCommentClick}>
              <TiTrash />
            </i>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

function mapStateToProps ({ comments }, { commentId }) {
  return {
    commentId,
    comment: comments[commentId]
  }
}
export default withRouter(connect(mapStateToProps)(CommentListItem))