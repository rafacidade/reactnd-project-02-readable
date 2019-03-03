import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { Redirect } from 'react-router-dom'

class PostAdd extends Component {
  state = {
   author: '',
    title: '',
    category: '',
    body: '',
    returnToHome: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState(() => ({
      [name]: value.trim()
    }))
  }

  render() {
    if (this.state.returnToHome === true) {
      return <Redirect to='/' />
    }

    return (
  		<div className="container main">
  	    <div className="row">
  	      <div className="col-md-12">
  	        <h1 className="my-4">New Post</h1>
            <PostForm postId=""/>
  	      </div>
  	    </div>
  		</div>
		)
  }
}

export default connect()(PostAdd)