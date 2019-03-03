import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleAddComment, handleEditComment } from '../actions/comments'

class CommentForm extends Component {
  state = {
    id: '',
    author: '',
    body: '',
    parentId: '',
    returnTo: '',
  }

  componentDidMount() {
    const { commentId, parentId } = this.props

    this.setState({ parentId })

    if (commentId !== '') {
      const { id, author, body } = this.props.comments[commentId]

      this.setState({
        id,
        author,
        body,
      })
    }
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

    const { id, author, body, parentId } = this.state

    const comment = { id, author, body, parentId }

    comment.id === '' ? this.addComment(comment) : this.editComment(comment)
  }

  addComment = (comment) => {
    const { dispatch } = this.props

    dispatch(handleAddComment(comment))

    this.setState(() => ({
      id: '',
      body: '',
      author: '',
      returnTo: '',
    }))

    alert('Comment successfully added!!')
  }

  editComment = (comment) => {
    const { dispatch, posts, parentId } = this.props
    dispatch(handleEditComment(comment))

    this.setState(() => ({
      id: '',
      body: '',
      author: '',
      returnTo: `/${posts[parentId].category}/${parentId}`,
    }))

    alert('Comment successfully updated!!')
  }

  validateForm = () => {
    const { author, body } = this.state
    return author.trim() !== '' && body.trim() !== ''
  }

  render() {
    const { author, body, returnTo } = this.state

    if (returnTo !== '') {
      return <Redirect to={returnTo} />
    }

    return (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input type="text" name="author" className="form-control form-control-sm" placeholder="Your Name" onChange={this.handleChange} value={author}></input>
            </div>
            <div className="form-group">
              <textarea rows="5" name="body" className="form-control form-control-sm" placeholder="Your Comment" onChange={this.handleChange} maxLength={300} value={body}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }, { commentId, parentId }) {
  return {
    commentId,
    parentId,
    comments,
    posts,
  }
}

export default withRouter(connect(mapStateToProps)(CommentForm))