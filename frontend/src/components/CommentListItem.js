import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'

class CommentListItem extends Component {
  render() {
    const { comment } = this.props

    if (comment === null) {
      return <p>This Comment does not exists</p>
    }

    const { timestamp, body, author, voteScore } = comment

    return (
      <div className='comment'>
        <div>
          <div>{formatDate(timestamp)}</div>
          <div>Author: {author}</div>
          <p>{body}</p>      
        </div>
        <div className='comment-icons'>
          <button className='thumbs-up-button'>
              <TiThumbsUp />
          </button>
          <span>{voteScore}</span>
          <button className='thumbs-down-button'>
              <TiThumbsDown />
          </button>
        </div>        
      </div>
    )
  }
}

function mapStateToProps ({ comments }, { commentId }) {
  return { 
    comment: comments[commentId]
  }
}
export default connect(mapStateToProps)(Comment)