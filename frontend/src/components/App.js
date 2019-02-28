import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import PostDetails from './PostDetails'
import PostForm from './PostForm'
import Nav from './Nav'
import Footer from './Footer'
import NotFound from './NotFound'
import CommentForm from './CommentForm';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <hr/>
            {this.props.loading === true
              ? null
              : <Switch>
                <Route exact path='/' component={PostList} />
                <Route exact path='/new' component={PostForm} />
                <Route exact path='/:categoryPath' component={PostList} />
                <Route exact path='/:categoryPath/:postId' component={PostDetails} />
                <Route exact path='/edit/post/:postId' component={PostForm} />
                <Route exact path='/edit/comment/:commentId' component={CommentForm} />
                <Route exact path='/not-found' component={NotFound} />
                </Switch>}
          </div>
          <Footer />     
        </Fragment>        
      </BrowserRouter>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    loading: posts === null
  }
}

export default connect(mapStateToProps)(App)