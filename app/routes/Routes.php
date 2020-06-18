<?php


class Routes {
    private $method;
    private $params;

    public function  __construct() {
    }

    public function start($request) {
        if(isset($request['url'])){
            $url = explode('/', $request['url']);
            $controller = ucfirst($url[0]).'Controller';
            array_shift($url);
            if(isset($url[0]) && $url != ''){
                $this->method = $url[0];
                array_shift($url);
                if(isset($url[0]) && $url != ''){
                    $this->params = $url;
                }
            }
        } else {
            $controller = 'RepositoryController';
            $this->method = 'init';
        }

        return call_user_func(array(new $controller, $this->method), $this->params);
    }
}