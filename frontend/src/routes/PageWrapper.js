import React from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';

function PageWrapper({ component: Component, ...props }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Navbar />
      <PageContainer>
        <Component {...props} />
      </PageContainer>
    </>
  );
}

export default PageWrapper;
