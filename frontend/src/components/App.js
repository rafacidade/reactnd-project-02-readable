import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import PostDetails from './PostDetails'
import PostAdd from './PostAdd'
import PostEdit from './PostEdit'
import Nav from './Nav'
import Footer from './Footer'
import NotFound from './NotFound'
import CommentForm from './CommentForm';

class App extends Component {
  componentDidMount() {
    console.log('did mount')
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <hr/>
            {!this.props.dataLoaded
              ? null
              : <Switch>
                <Route exact path='/' component={PostList} />
                <Route exact path='/new' component={PostAdd} />
                <Route exact path='/:categoryPath' component={PostList} />
                <Route exact path='/:categoryPath/:postId' component={PostDetails} />
                <Route exact path='/edit/post/:postId' component={PostEdit} />
                <Route exact path='/edit/comment/:commentId' component={CommentForm} />
                <Route exact path='/not-found' component={NotFound} />
                </Switch>}
          </div>
          <Footer />     
        </Fragment>        
      </Router>
    )
  }
}

function mapStateToProps ({ dataLoaded }) {
  return {
    dataLoaded
  }
}

export default connect(mapStateToProps)(App)