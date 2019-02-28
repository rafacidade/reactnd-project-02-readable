import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'
import { Redirect, withRouter } from 'react-router-dom'
import { formatCategoryName } from '../utils/helpers'

class PostForm extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault()
    
    const { dispatch } = this.props

    if (!this.validateForm()) {
      alert('Something is missing!')
      return
    }

    const { author, title, category, body } = this.state

    const post = { author, title, category, body }

    dispatch(handleAddPost(post))  
  
    this.setState(() => ({
	    title: '',
	    body: '',
	    author: '',
	    category: '',
      returnToHome: true,
    }))

    alert('Success!')
  }

  validateForm = () => {
    const { author, title, category, body } = this.state
    return author !== '' && title !== '' && category !== '' && body !== ''
  };

  render() {
    const { title, body, author, category, returnToHome } = this.state
    const { categories, categoriesIds } = this.props

    if (returnToHome === true) {
      return <Redirect to='/' />
    }

    return (
		<div className="container main">

	    <div className="row">
	      <div className="col-md-12">
	        <h1 className="my-4">New Post</h1>

	        <div className="card mb-4">       
	          <div className="card-body">
	            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
	              		<input type="text" name="author" value={author} className="form-control" placeholder="Your Name" onChange={this.handleChange}></input>
	            	</div>
	            	<div className="form-group">
	              		<input type="text" name="title" value={title} className="form-control" onChange={this.handleChange} placeholder="Post Title"></input>
	            	</div>

                <div className="form-group">
	              		<select name="category" className="form-control" onChange={this.handleChange} defaultValue={category}>
                      <option value="">Select a category...</option>
                      {categoriesIds.map((categoryId)=> (
                        <option key={categories[categoryId].path} value={categories[categoryId].path}>{formatCategoryName(categories[categoryId].name)}</option>       
                      ))}
	              		</select>
	            	</div>
	            	<div className="form-group">
	            		<textarea name="body" rows="5" value={body} className="form-control" placeholder="Your Post" onChange={this.handleChange} maxLength={1000}></textarea>
            		</div>      
	            	
	            	<button name="btnSubmit" type="submit" className="btn btn-primary">Submit</button>	            
	            </form>
	          </div>
	        </div>        
	      </div>
	    </div>
		</div>
		)
  }
}

function mapStateToProps ({ categories, posts }, props) {
  const { postId } = props.match.params
  const categoriesIds = Object.keys(categories)

  return {
    postId: typeof postId !== 'undefined' ? postId : '',
    categories,
    categoriesIds
  }
}

export default withRouter(connect(mapStateToProps)(PostForm))