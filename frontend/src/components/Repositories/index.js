import React, { useContext } from 'react';
import Context from '../../context/Context';
import '../../styles/Repositories.css'
import Details from './Details';

const Repositories = () => {
  const { repos } = useContext(Context);

  return (
    <table>
      <thead>
        <tr>
          <th>Owner name</th>
          <th>Repository name</th>
          <th>Language</th>
          <th>More details</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((r, i) => {
          return (
            <tr key={i}>
              <th>{r.user}</th>
              <th>{r.name}</th>
              <th>{r.language}</th>
              <th className='dtl'><Details r={r} /></th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Repositories;