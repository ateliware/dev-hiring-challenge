import React, { Component }from 'react';

import InfiniteScroll from "react-infinite-scroller";

import api from '../../services/api';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      page: 1
    }
  }

  handleRepos = (event) => {
    console.log("xabimba")
    api.get(`search/${this.state.page}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then( response => {
      this.setState({
        repos: [].concat(this.state.repos, response.data.repos),
        page: this.state.page + 1
      })
    });
  };
  
  render() {
    return (
      <div className="list-container">
        <ul>
          <InfiniteScroll
            loadMore={this.handleRepos}
            hasMore={true}
            loader={<div className="loader"> Loading... </div>}
            useWindow={true}
          >
            {this.state.repos.map((repository, index) => (
              <li key={repository.url}>
                <strong>URL:</strong>
                <p>{repository.url}</p>
      
                <strong>Stars:</strong>
                <p>{repository.stars}</p>
      
              </li>
            ))}
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

export default List;