import styled from 'styled-components';

const Header = styled.h1`
  padding: 1.5rem;
  border-bottom: 1px solid currentColor;
  margin: 0;
  font-size: .875rem;
  letter-spacing: 1px;
  font-weight: bold;
`;

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export default {
  Header,
  List,
};
