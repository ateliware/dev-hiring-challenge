import { createGlobalStyle, css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import './bootstrap.css';

const styles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  body,
  #root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  body,
  input,
  button {
    -webkit-font-smoothing: antialiased !important;
    outline: none;

    &:focus {
      outline: none;
    }
  }
`;

export default createGlobalStyle`${styles}`;
