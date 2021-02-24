import React, { Component }from 'react';

import api from '../../services/api';
import Header from '../../component/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


import Loader from "react-loader-spinner";

import './styles.css';

class Repository extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repository: [],
      user: []
    }
  };

  componentDidMount() {
    this.handleRepository();
    this.handleUser();
  };

  async handleRepository () {
    await api.get(`repository/${this.props.match.params.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {

      console.log("Repository:")
      console.log(response.data.repository)

      this.setState({
        repository: response.data.repository,
      })

      this.handleUser(response.data.repository.user_id);
    });
  };


  async handleUser (user_id) {
    await api.get(`user/${user_id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log("USER:")
      console.log(response.data.user)
      this.setState({
        user: response.data.user
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
  };

  handleList() {
    this.props.history.push('/list');
  };
  
  render() {
    console.log(this.state.user)
    return (
      <div name="Repository">
        <Header />
        {this.state.user !== null && this.state.repository !== null ?
          <div id="detail-container" className="border border-gray-400 border-l-0 border-opacity-50 border-r-0 flex h-screen mt-16">
            <div id="profile-container" className="h-full border border-l-0 border-t-0 border-gray-400 border-opacity-50 px-8">
              <img className="-mt-7 border border-4 ml-16 rounded-full w-10/12" src={this.state.user.avatar_url}
                alt="Repository owner"/>
              <p className="text-gray-300 text-2xl py-3 font-medium ml-20 mt-2 break-words">
                <a target="_blank" rel="noreferrer" href={this.state.user.url}>
                  {this.state.user.login}
                </a>
              </p>
              <div id="search" 
                className="bg-blue-500 cursor-pointer flex font-semibold justify-center mt-3 py-1.5 rounded-2xl text-white" 
                onClick={() => {this.handleList()}}>
                  RETORNAR
              </div>
            </div>
            <div id="repository-container" className=" px-8">
              <p className="text-blue-400 text-xl pt-8 font-medium">
                <a target="_blank" rel="noreferrer" href={this.state.repository.url}>
                  {this.state.repository.full_name}
                </a>
              </p>
              <div id="bottom-text" className="flex justify-start py-3">
                <div className={`${this.handleLanguageColor(this.state.repository.language)} h-4 rounded-full w-4`}></div>
                <div id="language-text" className="text-gray-400 text-xs pr-3 ml-1">{this.state.repository.language}</div>
                <FontAwesomeIcon id="star" icon={faStar} />
                <div id="stars-text" className="text-gray-400 text-xs pr-2 ml-1">{this.state.repository.stars}</div>
              </div>
              <p className="text-gray-400 text-base py-3">{this.state.repository.description}</p>
            </div>
          </div>
          :
          <Loader type="ThreeDots" color="#60A5FA" height={80} width={80} />
        }

      </div>
    )
  }
};

export default Repository;