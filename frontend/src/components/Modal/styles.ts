import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  border-color: #eee #ddd #bbb;
  box-shadow: rgb(0 0 0 / 14%) 0 1px 3px;
  heigth: 176px;
  padding: 15px;

  .star {
    width: 16px;
    heigth: 16px;
    margin: 10px 10px;
  }

  .text_modal {
    font-size: 24px;
    font-weight: 700;
    margin-left: 20px;
  }

  .text_modal-pushed {
    color: gray;
  }

  .col_text-pushed {
    display: flex;
    justify-content: center;
    align-self: center;
    width: 220px;
  }

  .eye {
    width: 16px;
    heigth: 16px;
    margin: 10px 10px;
  }

  .fork {
    width: 16px;
    heigth: 16px;
    margin: 10px 10px;
  }

  .row-icons {
    display: flex;
    align-items: center;
    margin-top: 2px;
  }

  .row-github {
    display: flex;
    justify-content: end;
  }

  .github-logo {
    width: 70px;
  }
`;
