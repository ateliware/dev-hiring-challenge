import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../../styles/Details.css';

const RepoDetail = ({ r }) => {
    const [show, setShow] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    if (!show) return <p onClick={showModal}>Click here for more details</p>

    const dateFormat = (date) => {
      return new Date(date).toLocaleDateString();
    }

    const dateFormatTime = (date) => {
      return new Date(date).toLocaleTimeString();
    }

    return (
      <section className='modal' onClick={closeModal}>
        <div className='modal-container' onClick={e => e.stopPropagation()}>
          <div className='modal-header' onClick={closeModal}>
            <h2>{r.name}</h2>
              <i><AiOutlineCloseCircle size={26}/></i>
          </div>
          <div className='modal-body'>
            <div className='modal-user-profile'>
              <span>{r.user}</span>
              <img src={r.userImage} alt='User profile' />
              <span>{r.description}</span>
            </div>
            <div className='model-repo-stats'>
              <table>
                <tr>
                  <td>Stars</td>
                  <td>{r.stars}</td>
                </tr>
                <tr>
                  <td>Watchers</td>
                  <td>{r.watchs}</td>
                </tr>
                <tr>
                  <td>Issues</td>
                  <td>{r.issues}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{r.size} KB</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{dateFormat(r.created) + ' ' + dateFormatTime(r.created)}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{dateFormat(r.updated) + ' ' + dateFormatTime(r.updated)}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className='modal-footer'>
            <h4>To access this repository click <a href={r.url} target='_blank' rel='noreferrer'>here</a></h4>
          </div>
        </div>
      </section>
    );

}

export default RepoDetail;