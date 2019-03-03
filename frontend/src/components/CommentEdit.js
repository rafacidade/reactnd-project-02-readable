import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleGetComment } from '../actions/comments'
import CommentForm from './CommentForm'

class CommentEdit extends Component {
  state = {
    parentId: '',
  }

  componentDidMount() {
    const { handleGetComment, comments, commentId } = this.props

    if (typeof comments[commentId] === 'undefined') {
      //page access via url, no comments were loaded.
      handleGetComment(commentId)
    }
  }

  render() {
    const { commentId, comments } = this.props

    if (typeof comments[commentId] === 'undefined') {
      return (
        <div align="container">
          <div align="center">
            <h2 className="my-4">Comment not found</h2>
          </div>          
        </div>        
      )
    }

    const { parentId } = comments[commentId]

    return (
      <div className="container main">
        <div className="row">
          <div className="col-md-12">
            <h1 className="my-4" id="top">Edit Comment</h1>
            <CommentForm parentId={parentId} commentId={commentId} />
          </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps ({ comments }, props) {
  const { commentId } = props.match.params

  return {
    commentId,
    comments,
  }
}

const mapDispatchToProps = {
  handleGetComment,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit))