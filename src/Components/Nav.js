import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="item-nav">
          <Link to="/" className="nav-link">
            <span>New questions</span>
          </Link>
        </div>
        <div className="item-nav">
          <Link to="/answers" className="nav-link">
            <span>Answers</span>
          </Link>
        </div>
      </div>
    );
  }
}
