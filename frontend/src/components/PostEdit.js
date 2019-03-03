import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'

class PostEdit extends Component {
  render() {
    return (
  		<div className="container main">
  	    <div className="row">
  	      <div className="col-md-12">
  	        <h1 className="my-4">Edit Post</h1>
            <PostForm postId={this.props.postId}/>
  	      </div>
  	    </div>
  		</div>
		)
  }
}

function mapStateToProps ({ posts }, props) {
  const { postId } = props.match.params
  return {
    postId,
    posts,
  }
}

export default connect(mapStateToProps)(PostEdit)