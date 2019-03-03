import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetPostComments } from '../actions/comments'
import CommentListItem from './CommentListItem'

class CommentList extends Component {
  state = {
    comments: {},
  }

  componentDidMount() {
    const { handleGetPostComments, postId } = this.props
    handleGetPostComments(postId)

    this.setState({
      comments: this.props.comments
    })
  }

  render() {
    const { comments, commentsIds } = this.props

    //order comments by timestamp desc
    this.props.commentsIds.sort((a,b) => comments[b].timestamp - comments[a].timestamp)
    return (
      <div>
        <h4 id="comment-list">Comments ({commentsIds.length})</h4>
        {commentsIds.map((id) => (
          <CommentListItem key={id} commentId={id} />
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ comments }, { postId }) {
  const commentsIds = Object.keys(comments)
  return {
    commentsIds,
    comments,
    postId,
  }
}

const mapDispatchToProps = {
  handleGetPostComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)