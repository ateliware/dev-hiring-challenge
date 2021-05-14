import styled from 'styled-components';

const PageContainer = styled.div`
  height: calc(100vh - 91.88px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media(max-width: 767px) {
    height: calc(100vh - 88px);
  }

`;

export default PageContainer;
