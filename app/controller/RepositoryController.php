<?php

require_once 'Controller.php';


class RepositoryController extends Controller {

    public function init() {
        $this->view('initPage');
    }

    public function create() {
        $repository = new Repository();
        if($repository->listRepositoryQuery()->num_rows === 0){
            $languages = array('go', 'python', 'java', 'c', 'php');
            foreach ($languages as $language) {
                $content = $this->getContentFromApi($language);
                $json = json_decode($content);
                $this->setDataToObjectRepository($json, $repository);
                $repository->createRepositoryQuery();

            }
        }
        $this->listRepositories();
    }

    public function listRepositories() {
        $this->view('list');
    }

    public function view_repository() {
        $this->view('view_repository');
    }

    public function getContentFromApi($language) {
        $url = "https://api.github.com/search/repositories?q=language:$language&sort=stars&order=desc";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent: request'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, TRUE);
        $content = curl_exec($ch);
        curl_close($ch);
        return $content;
    }

    private function setDataToObjectRepository($data, $repository) {
        $repository->setName($data->items[0]->full_name);
        $repository->setDescription($data->items[0]->description);
        $repository->setLanguage($data->items[0]->language);
        $repository->setStartDate($data->items[0]->created_at);
        $repository->setStargazers($data->items[0]->stargazers_count);
        $repository->setHtmlUrl($data->items[0]->html_url);
        $repository->setHomepage($data->items[0]->homepage);
        return $repository;
    }
}