import React from "react";
import { Avatar, Row, Col, Typography } from "antd";
import mainLogo from "../../assets/github-logo.png";

import { Container, Header, Content, Footer } from "./styles";

const { Title } = Typography;

const Card: React.FC = (props: any) => (
  <Container>
    <Header>
      <Row>
        <Col>
          {console.log("props", props)}
          <Avatar
            size={116}
            src={
              props && props.owner && props.owner.avatar_url
                ? props.owner.avatar_url
                : undefined
            }
            data-testid="avatar"
          />
        </Col>
        <Col>
          <Row>
            <h1 className="title_card">{props && props.name}</h1>
          </Row>
          <Row>
            <h1 className="subTitle_card">Created by &nbsp;</h1>
            <span className="subTitle_card-name">
              {props && props.owner && props.owner.login}
            </span>
          </Row>
          <Row>
            <h1 className="subTitle_card">Language &nbsp;</h1>
            <span className="subTitle_card-name">
              {props && props.language}
            </span>
          </Row>
          {/* <Row>
            <Content>
              <Title className="description_card" ellipsis>
                {props.description}
              </Title>
            </Content>
          </Row> */}
        </Col>
        <Col className="col_image">
          <img
            src={mainLogo}
            alt="fireSpot"
            data-testid="logo"
            className="logo"
          />
        </Col>
      </Row>
    </Header>
    {/* <Content>
      <Title className="description_card" ellipsis>
        {props.description}
      </Title>
    </Content> */}
    <Footer>
      <Row>
        <Col className="col_footer">
          <span className="number_footer">{props && props.forks}</span>{" "}
          <span className="title_footer" data-testid="forks">
            FORKS
          </span>
        </Col>
        <Col className="col_footer">
          <span className="number_footer">
            {props && props.stargazers_count}
          </span>{" "}
          <span className="title_footer" data-testid="stars">
            STARS
          </span>
        </Col>
      </Row>
    </Footer>
  </Container>
);

export default Card;
