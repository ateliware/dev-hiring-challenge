import React, { Component } from 'react';

import InfiniteScroll from "react-infinite-scroller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from "react-loader-spinner";

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
    }).then(response => {
      this.setState({
        repos: [].concat(this.state.repos, response.data.repos),
        page: this.state.page + 1
      })
    });
  };

  handleLanguageColor(language) {
    switch (language) {
      case "Python":
        return "bg-indigo-600";
      case "C#":
        return "bg-yellow-500";
      case "TypeScript":
        return "bg-green-600";
      case "Ruby":
        return "bg-red-400";
      default:
        return "bg-blue-400";
    }
  }

  handleDetails(full_name) {
    this.props.history.push(`repository/${full_name}`);
  };

  render() {
    return (
      <div name="List">
        <Header />
        <div className="repo-container flex justify-center mt-8">
          <InfiniteScroll
            loadMore={this.handleRepos}
            hasMore={true}
            loader={<Loader type="ThreeDots" color="#60A5FA" height={80} width={80} />}
            useWindow={true}
          >
            <ul>
              {this.state.repos.map((repository, index) => (
                <li key={index} className="border border-4 border-gray-400 border-opacity-50 rounded-md px-4 py-4 cursor-pointer" onClick={() => { this.handleDetails(repository.id) }}>
                  <p className="text-blue-400 text-sm truncate font-medium">
                    {repository.full_name}
                  </p>
                  <p className="text-gray-400 text-xs py-3 truncate">{repository.description}</p>
                  <div id="bottom-container" className="flex absolute pb-2 bottom-0">
                    <div id="bottom-text" className="flex justify-start py-3">
                      <div className={`${this.handleLanguageColor(repository.language)} h-4 rounded-full w-4`} />
                      <div id="language-text" className="text-gray-400 text-xs pr-3 ml-1">
                        {repository.language}
                      </div>
                      <FontAwesomeIcon id="star" icon={faStar} />
                      <div id="stars-text" className="text-gray-400 text-xs pr-2 ml-1">
                        {repository.stars}
                      </div>
                    </div>
                    <div id="bottom-info" className="flex justify-end py-3 ml-1 cursor-pointer">
                      <FontAwesomeIcon id="info" icon={faInfoCircle} className="text-gray-400" />
                      <div id="stars-text" className="text-gray-400 text-xs pr-2 ml-1">Clique para mais informações</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default List;