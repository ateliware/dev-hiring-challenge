import React from "react";
import { Modal, Button, Row, Col, Avatar, Typography } from "antd";

import { Container } from "./styles";
import star from "../../assets/star.png";
import fork from "../../assets/fork.png";
import eye from "../../assets/eye.png";
import github from "../../assets/GitHub_Logo_2.png";

import moment from "moment";

const { Text } = Typography;

export default function ModalDetail(
  isVisible: any,
  handleCancel: any,
  itemData: any
) {
  return (
    <>
      <Modal
        title="Repositório"
        visible={isVisible}
        onCancel={isVisible.handleCancel}
        footer={[
          <Button key="back" onClick={isVisible.handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Container>
          {console.log("itemData", isVisible.itemData)}
          {console.log("isVisible", isVisible)}
          {console.log("handleCancel", handleCancel)}
          <Row>
            <Col span={4}>
              <Avatar
                size={64}
                src={
                  isVisible.itemData &&
                  isVisible.itemData.owner &&
                  isVisible.itemData.owner.avatar_url
                    ? isVisible.itemData.owner.avatar_url
                    : undefined
                }
                data-testid="avatar"
              />
            </Col>
            <Col className="col_text-pushed " span={12}>
              <Text className="text_modal">{isVisible.itemData.name}</Text>
            </Col>
            <Col span={4} offset={2}>
              {" "}
              <Text className="text_modal-pushed">
                {moment(isVisible.itemData.pushed_at).format("DD/MM/YYYY")}
              </Text>
            </Col>
          </Row>
          <Row className="row-icons">
            <img src={fork} alt="fork" data-testid="fork" className="fork" />
            <Text strong>{`${isVisible.itemData.forks} Forks`}</Text>
          </Row>
          <Row className="row-icons">
            <img src={star} alt="star" data-testid="star" className="star" />
            <Text strong>{`${isVisible.itemData.stargazers_count} Stars`}</Text>
          </Row>
          <Row className="row-icons">
            <img src={eye} alt="eye" data-testid="eye" className="eye" />
            <Text strong>{`${isVisible.itemData.watchers} Watches`}</Text>
          </Row>
          <Row className="row-github">
            <img
              src={github}
              alt="eye"
              data-testid="eye"
              className="github-logo"
            />
          </Row>
        </Container>
      </Modal>
    </>
  );
}
