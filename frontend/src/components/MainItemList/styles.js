import styled, { css } from 'styled-components';
import { CgRemoveR, CgArrowBottomRightO, CgPlayListAdd } from 'react-icons/cg';

const Container = styled.div``;

const Header = styled.div`
 display: flex;
  justify-content: space-between;
  cursor: default;
  transition: background-color 100ms ease-in-out;

  ${({ opened }) => !opened && css`
    &:hover {
      background-color: rgb(240, 173, 78, .2);
      transition: background-color 100ms ease-in-out;
    }
  `}
`;

const ItemName = styled.p`
  margin: 0;
  padding: 1.5rem;
  width: 100%;
  font-weight: bold;
`;

const ItemControlsContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    & + svg {
      margin-left: 1rem;
    }
  }
`;

const RemoveIcon = styled(CgRemoveR).attrs({
  size: 22,
})`
  cursor: pointer;
  transition: color 100ms ease-in-out;

  &:hover {
    color: var(--danger);
    transition: color 100ms ease-in-out;
  }
`;

const ExpandIcon = styled(CgArrowBottomRightO).attrs({
  size: 23,
})`
  cursor: pointer;
  transform: rotate(0deg);
  transition: color 100ms ease-in-out, transform 200ms ease-in-out;

  &:hover {
    color: var(--blue);
    transition: color 100ms ease-in-out;
    transition: color 100ms ease-in-out, transform 200ms ease-in-out;
  }

  ${({ opened }) => opened && css`
    color: var(--blue);
    transform: rotate(-90deg);
    transition: color 100ms ease-in-out, transform 200ms ease-in-out;
  `}
`;

const IncludeIcon = styled(CgPlayListAdd).attrs({
  size: 25,
})`
  cursor: pointer;
  transition: color 100ms ease-in-out;

  &:hover {
    color: var(--blue);
    transition: color 100ms ease-in-out;
  }
`;

export default {
  Container,
  Header,
  ItemName,
  ItemControlsContainer,
  RemoveIcon,
  ExpandIcon,
  IncludeIcon,
};
