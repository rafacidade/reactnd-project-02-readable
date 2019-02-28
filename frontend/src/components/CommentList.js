import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentListItem from './CommentListItem'
import CommentForm from './CommentForm'

class CommentList extends Component {
    
  render() {
    return (
      <div>
        <CommentForm />
        <h4>Comments</h4>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments,
  }
}

export default connect(mapStateToProps)(CommentList)