import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/posts'
import { Redirect, withRouter } from 'react-router-dom'
import { formatCategoryName } from '../utils/helpers'

class PostForm extends Component {
  state = {
    id: '',
    author: '',
    title: '',
    category: '',
    body: '',
    returnTo: '',
  }

  componentDidMount() {
    const { postId } = this.props

    if (postId === '') {
      return
    }

    const { id, author, title, category, body } = this.props.posts[postId]

    this.setState({
      id,
      author,
      title,
      category,
      body,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.validateForm()) {
      alert('Something is missing!')
      return
    }

    const { id, author, title, category, body } = this.state

    const post = { id, author, title, category, body }

    post.id === '' ? this.addPost(post) : this.editPost(post)
  }

  addPost = (post) => {
    const { dispatch } = this.props

    dispatch(handleAddPost(post))

    this.setState(() => ({
      id: '',
      title: '',
      body: '',
      author: '',
      category: '',
      returnTo: '/',
    }))

    alert('Post successfully added!!')
  }

  editPost = (post) => {
    const { dispatch } = this.props
    dispatch(handleEditPost(post))

    this.setState(() => ({
      id: '',
      title: '',
      body: '',
      author: '',
      category: '',
      returnTo: `/${post.category}/${post.id}`,
    }))

    alert('Post successfully updated!!')
  }

  validateForm = () => {
    const { author, title, category, body } = this.state
    return author.trim() !== '' && title.trim() !== '' && category.trim() !== '' && body.trim() !== ''
  };

  render() {
    const { title, body, author, category, returnTo } = this.state

    if (returnTo !== '') {
      return <Redirect to={returnTo} />
    }

    const { categories, categoriesIds } = this.props

    return (
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
                    categories[categoryId].path === category
                      ? <option key={categories[categoryId].path} value={categories[categoryId].path} selected>{formatCategoryName(categories[categoryId].name)}</option>
                      : <option key={categories[categoryId].path} value={categories[categoryId].path}>{formatCategoryName(categories[categoryId].name)}</option>
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
		)
  }
}

function mapStateToProps ({ posts, categories }, { postId }) {
  const categoriesIds = Object.keys(categories)

  return {
    postId,
    posts,
    categories,
    categoriesIds
  }
}

export default withRouter(connect(mapStateToProps)(PostForm))