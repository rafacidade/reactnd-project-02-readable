import React, { Component } from 'react'
import { formatCategoryName } from '../utils/helpers'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

class Nav extends Component {
	render() {
    const { categories, categoriesIds } = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to='/'>
          <div className="navbar-brand">Readable</div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to='/' exact className="nav-link" activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to='/new' className="nav-link" activeClassName='active'>
                New Post
              </NavLink>
            </li>
            {categoriesIds.map((categoryId)=> (
              <NavLink exact key={categories[categoryId].path} to={`/${categories[categoryId].path}`} className="nav-link" activeClassName='active'>
                {formatCategoryName(categories[categoryId].name)} Posts
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

function mapStateToProps ({ categories }) {
  const categoriesIds = Object.keys(categories)

	return {
    categories,
    categoriesIds
  }
}

export default connect(mapStateToProps)(Nav)