<?php

use Lib\Database\Connection;

class Repository {
    private $name;
    private $language;
    private $start_date;
    private $stargazers;
    private $description;
    private $html_url;
    private $homepage;

    public function createRepositoryQuery() {
        $conn = Connection::getConn();
        try{
            $sql = 'insert into repository (full_name, created_at, stargazers_count, description, html_url, homepage, programing_language)
                    VALUES(?, ?, ?, ?, ?, ?, ?)';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sssssss', $this->name, $this->start_date, $this->stargazers, $this->description, $this->html_url, $this->homepage, $this->language);
            $stmt->execute();
            $this->id = $conn->insert_id;

            return $this->id;

        }catch(\Exception $e){
            var_dump($e);
        }
    }

    public function listRepositoryQuery() {
        $conn = Connection::getConn();
        try{
            $sql = 'select * from repository';
            $result = $conn->query($sql);
            return $result;
        } catch(\Exception $e) {
            var_dump($e);
        }
    }

    public function listRepositoryByIdQuery($id) {
        $conn = Connection::getConn();
        try{
            $sql = 'select full_name, stargazers_count, programing_language, description, html_url, homepage
                    from repository where id = ?';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_object();
            return $row;
        } catch(\Exception $e) {
            var_dump($e);
        }
    }

    public function formatId(){
        $id = explode('/', $_GET['url']);
        $id = end($id);
        return intval($id);
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getLanguage() {
        return $this->language;
    }

    public function setLanguage($language) {
        $this->language = $language;

    }

    public function getStartDate() {
        return $this->start_date;
    }

    public function setStartDate($start_date) {
        $this->start_date = $start_date;
    }

    public function getStargazers() {
        return $this->stargazers;
    }

    public function setStargazers($stargazers) {
        $this->stargazers = $stargazers;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getHtmlUrl() {
        return $this->html_url;
    }

    public function setHtmlUrl($html_url) {
        $this->html_url = $html_url;
    }

    public function getHomepage() {
        return $this->homepage;
    }

    public function setHomepage($homepage) {
        $this->homepage = $homepage;
    }
}