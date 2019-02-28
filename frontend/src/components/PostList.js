import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import { formatCategoryName } from '../utils/helpers';

const ORDER_BY_MOST_RECENT = 'ORDER_BY_MOST_RECENT'
const ORDER_BY_BEST_VOTING = 'ORDER_BY_BEST_VOTING'

class PostList extends Component {
  state = {
    orderBy: ORDER_BY_MOST_RECENT
  }

  handleOrderByMostRecentClick = (e) => {
    e.preventDefault()
    this.setState({ orderBy: ORDER_BY_MOST_RECENT }) 
  }
  
  handleOrderByBestVotingClick = (e) => {
    e.preventDefault()
    this.setState({ orderBy: ORDER_BY_BEST_VOTING })   
  }
  
  render() {
    const { postsIds, posts, categories, categoriesIds, categoryPath } = this.props

    const categoryId = categoryPath !== undefined ? categoriesIds.filter(c => { return categories[c].path === categoryPath }) : ''

    const pageTitle = categoryId ? formatCategoryName(categories[categoryId].path) + ' Posts' : 'All Posts'

    const postIds = this.state.orderBy === ORDER_BY_MOST_RECENT
      ? this.props.postsIds.sort((a,b) => posts[b].timestamp - posts[a].timestamp)
      : this.props.postsIds.sort((a,b) => posts[b].voteScore - posts[a].voteScore)

    return (
      <div className="container main">
        <div className="bar-btns">
          <button type="button" className="btn btn-light btn-sm" data-toggle="button" onClick={this.handleOrderByMostRecentClick}>
            Order By Most Recent
          </button>
          <button type="button" className="btn btn-light btn-sm" data-toggle="button" onClick={this.handleOrderByBestVotingClick}>
            Order By Best Voting
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="my-4">{pageTitle} ({postsIds.length})</h1>
            {postsIds.map((id) => (
              <PostListItem key={id} id={id} />
            ))}            
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, props) {
  const { categoryPath } = props.match.params
  const categoriesIds = Object.keys(categories)  
  
  const postsIds = typeof categoryPath === 'undefined'
    ? Object.keys(posts)
    : Object.keys(posts).filter(postId => { return posts[postId].category === categoryPath })
    
  return {
    postsIds: postsIds.sort((a,b) => posts[b].timestamp - posts[a].timestamp),          
    posts,
    categories,
    categoriesIds,
    categoryPath,
  }
}

export default connect(mapStateToProps)(PostList)