<?php

namespace Lib\Database;

abstract class Connection {

    private static $conn;

    public static function getConn() {

        $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

        $server = $url["host"];
        $username = $url["user"];
        $password = $url["pass"];
        $db = substr($url["path"], 1);
        if(!self::$conn) {
            self::$conn = new \mysqli($server, $username, $password, $db);
        }
        return self::$conn;
    }

}