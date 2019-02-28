import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comments'

class CommentForm extends Component {
  state = {
    author: '',
    body: '',
    returnToPost: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState(() => ({
      [name]: value.trim()
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    const { dispatch } = this.props

    if (!this.validateForm()) {
      alert('Something is missing!')
      return
    }

    const { author, body } = this.state

    const comment = { author, body }

    dispatch(handleAddComment(comment))  
  
    this.setState(() => ({
      author: '',
      body: '',
      returnToPost: true,
    }))

    alert('Success!')
  }

  validateForm = () => {
    const { author, title, category, body } = this.state
    return author !== '' && title !== '' && category !== '' && body !== ''
  };

  render() {
    const { author, body } = this.state

    return (
		<div className="container">
	    <div className="row">
	      <div className="col-md-12">
	        <h4 className="my-4">New Comment</h4>

	        <div className="card mb-4">       
	          <div className="card-body">
	            <form>
	            	<div className="form-group">
	              		<input type="text" className="form-control form-control-sm" placeholder="Your Name" onChange={this.handleChangeAuthor} defaultValue={author}></input>
	            	</div>
	            	
	            	<div className="form-group">
	            		<textarea rows="5" className="form-control form-control-sm" placeholder="Your Comment" onChange={this.handleChangeBody} maxLength={300} defaultValue={body}></textarea>
            		</div>
	            	
	            	<button type="submit" className="btn btn-primary">Submit</button>	            
	            </form>
	          </div>
	        </div>        
	      </div>
	    </div>
	  </div>
    )
  }
}

function mapStateToProps ({ posts }, { commentId }) {  
  return {
    commentId,
    posts,
  }
}

export default connect(mapStateToProps)(CommentForm)