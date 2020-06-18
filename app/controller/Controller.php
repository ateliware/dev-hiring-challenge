<?php

abstract class Controller {

    public function view($name) {
        include(__DIR__ . '/../view/repository/' .$name.'.php');
    }

}