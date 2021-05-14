import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`;

const CustomLink = styled(Link)`
  ${({ selected }) => selected && css`
    color: #fff !important;
  `}
`;

export default {
  Container,
  CustomLink,
};
