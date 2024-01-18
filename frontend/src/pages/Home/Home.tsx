import React, { useEffect, useState } from "react";
import mainLogo from "../../assets/github-logo.png";
import { Select, Row, Col, Spin, Input } from "antd";
import Card from "../../components/Card/Card";
import ModalDetail from "../../components/Modal/Modal";
import { Container } from "./styles";

import axios from "axios";

import { fetchRepositories } from "../../services/integrationApi";

const { Option } = Select;

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<any | null>(null);
  const [data, setData] = useState<any>([]);
  const [itemData, setItemData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [visibleModal, setVisibleModal] = useState<Boolean>(false);

  const handleFetchRepositories = (language: string) => {
    setLoading(true);
    setData([]);
    fetchRepositories(language)
      .then((res) => {
        setData(res.data.items);
        setFilteredData(res.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onChange = (e: string) => {
    setSelectedLanguage(e);
    handleFetchRepositories(e);
  };

  const handleOnChange = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = data.filter((item: any) => {
        return item.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredData(results);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    console.log("selectedLanguage", selectedLanguage);
    handleFetchRepositories(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    if (data.length > 0) {
      data.map((item: any) => {
        return axios({
          method: "post",
          url: "/historic/create",
          headers: {},
          data: {
            language: item.language,
            owner: item.owner.login,
            title: item.name,
            description: item.description,
          },
        });
      });
    }
  }, [data]);

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleOpenModal = (item: any) => {
    setItemData(item);
    setVisibleModal(true);
  };

  return (
    <Container>
      <div>
        {visibleModal && (
          <ModalDetail
            isVisible={visibleModal}
            handleCancel={handleCancel}
            itemData={itemData}
          />
        )}
        <img src={mainLogo} alt="fireSpot" data-testid="logo" />
      </div>
      <div className="container_select">
        <Select placeholder="Select a language" onChange={onChange}>
          <Option value="java">Java</Option>
          <Option value="python">Python</Option>
          <Option value="javascript">Javascript</Option>
          <Option value="typescript">Typescript</Option>
          <Option value="ruby">Ruby</Option>
        </Select>
      </div>

      <Input
        placeholder="Search..."
        className="input_search"
        onChange={handleOnChange}
      ></Input>

      <div className="list_repo" data-testid="list_repo">
        {!loading ? (
          <Row gutter={[24, 24]} className="row_list">
            {filteredData.map((item: any) => {
              return (
                <Col
                  xs={24}
                  lg={12}
                  onClick={() => {
                    handleOpenModal(item);
                  }}
                >
                  <Card {...item} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </Container>
  );
};

export default Home;
