import React, { Component }from 'react';

import InfiniteScroll from "react-infinite-scroller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import api from '../../services/api';
import Header from '../../component/Header';

import './styles.css'

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      page: 1
    }
  }

  handleRepos = (event) => {
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

  handleLanguageColor(language) {
    switch (language) {
      case "Python":
        return "bg-indigo-700";
      case "Java":
          return "bg-yellow-600";
      case "TypeScript":
        return "bg-green-600";
      case "Ruby":
        return "bg-red-900";
      default:
        return "bg-blue-300";
    }
  }
  
  render() {
    return (
      <div name="List">
        <Header />
        <div className="repo-container flex justify-center">
          <ul>
            <InfiniteScroll
              loadMore={this.handleRepos}
              hasMore={true}
              loader={<div className="loader"> Loading... </div>}
              useWindow={true}
            >
              {this.state.repos.map((repository, index) => (
                <li key={index} className="border border-4 border-gray-400 border-opacity-50 rounded-md px-4 py-4">
                    <p className="text-blue-400 text-sm truncate"><b><a target="_blank" rel="noreferrer" href={repository.url}>{repository.full_name}</a></b></p>

                    <p className="text-gray-400 text-xs py-3 truncate">{repository.description}</p>
                            
                    <p id="bottom-text" className="flex justify-start py-3">
                      <div className={`${this.handleLanguageColor(repository.language)} h-4 rounded-full w-4`}></div>
                      <div className="text-gray-400 text-xs px-2">{repository.language}</div>
                      <FontAwesomeIcon id="star" icon={faStar} />
                      <div className="text-gray-400 text-xs px-2">{repository.stars}</div>
                    </p>
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    );
  }
}

export default List;