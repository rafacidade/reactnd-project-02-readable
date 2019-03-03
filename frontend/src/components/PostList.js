import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
    const { postsIds, posts, categories, categoryPath } = this.props

    //verify if url complement is a valid category
    if (categoryPath !== '') {
      if (typeof categories[categoryPath] === 'undefined') {
        //invalid category path, not found in categories (wrong url)
        return <Redirect to='/not-found'/>
      }
    }

    const pageTitle = categoryPath ? formatCategoryName(categories[categoryPath].name) + ' Posts' : 'All Posts'

    //define order
    this.state.orderBy === ORDER_BY_MOST_RECENT
      ? this.props.postsIds.sort((a,b) => posts[b].timestamp - posts[a].timestamp)
      : this.props.postsIds.sort((a,b) => posts[b].voteScore - posts[a].voteScore)

    return (
      <div className="container main">
        <div className="bar-btns">
          <button type="button" className="btn btn-light btn-sm" onClick={this.handleOrderByMostRecentClick}>
            Order By Most Recent
          </button>
          <button type="button" className="btn btn-light btn-sm" onClick={this.handleOrderByBestVotingClick}>
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
  const categoryPath = typeof props.match.params.categoryPath === 'undefined' ? '' : props.match.params.categoryPath

  const postsIds = categoryPath === ''
    ? Object.keys(posts)
    : Object.keys(posts).filter(postId => posts[postId].category === categoryPath)

  return {
    postsIds: postsIds.sort((a,b) => posts[b].timestamp - posts[a].timestamp),
    posts,
    categories,
    categoryPath,
  }
}

export default connect(mapStateToProps)(PostList)