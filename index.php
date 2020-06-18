<?php
require_once 'app/routes/Routes.php';

require_once 'lib/database/Connection.php';

require_once 'app/controller/RepositoryController.php';
require_once 'app/controller/Controller.php';

require_once  'app/model/Repository.php';

$route = new Routes();
$route->start($_GET);