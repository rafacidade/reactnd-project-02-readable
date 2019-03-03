import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'

class CommentAdd extends Component {
  render() {
    const { parentId } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="my-4">Add Comment</h3>
            <CommentForm commentId="" parentId={parentId} />
          </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps ({ comments }, { parentId }) {
  return {
    parentId,
    comments,
  }
}

export default connect(mapStateToProps)(CommentAdd)