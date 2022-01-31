import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  border-color: #eee #ddd #bbb;
  box-shadow: rgb(0 0 0 / 14%) 0 1px 3px;
  heigth: 176px;
`;

export const Header = styled.div`
  padding: 3px 0 4px 10px;

  .col_image {
    position: absolute;
    right: 24px;
}
  }

  .ant-avatar {
    position: relative;
    top: 0;
    right: 4px;
    width: 116px;
    height: 116px;
    background: #fff;
    border-radius: 4px;
  }

  .title_card {
    font-size: 18px;
    line-height: 1.4;
    margin-left: 20px;
  }

  .subTitle_card {
    font-size: 14px;
    margin-left: 20px;
  }

  .subTitle_card-name {
    font-size: 14px;
    color: #707070;
  }

  .logo {
    heigth: 16px;
    width: 16px;
  }
`;

export const Content = styled.div`
  padding: 12px 0 10px;

  .description_card {
    margin: 0 5px 0 0;
    padding: 0px 20px;
    width: 375px;
    font: 18px/24px Georgia, "Times New Roman", Palatino, serif;
    overflow: hidden;
    clear: both;
    word-wrap: break-word;
    text-align: left;
    font-size: 12px;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid #eee;
  padding: 8px 0 6px;

  .number_footer {
    font-size: 12px;
  }

  .title_footer {
    font-size: 10px;
    font-weight: 700;
  }

  .col_footer {
    padding: 0 5px;
  }
`;
