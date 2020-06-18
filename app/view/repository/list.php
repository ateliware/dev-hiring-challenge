<?php
$repositories = new Repository();
$listRepository = $repositories->listRepositoryQuery();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Repository</title>

    <style>
        <?php
        include 'css/style.css';
        ?>
    </style>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
<div class="topbar">
    <div>
        <h1>Repositories</h1>
    </div>
</div>
<!-- Page Wrapper -->
<div id="wrapper">
    <div id="content-wrapper" class="d-flex flex-column">
        <div>
            <h2 data-cy="subtitle">Repositories avaible</h2>
        </div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">Repository name</th>
                <th scope="col">Start Date</th>
                <th scope="col">Number of stars</th>
                <th scope="col">Language</th>
                <th scope="col">View</th>
            </tr>
            </thead>
            <?php foreach ($listRepository as $repository):?>
            <tbody data-cy="tableLine">
            <tr>
                <td><?php echo $repository["full_name"];?></td>
                <td><?php echo date('d/m/Y', strtotime($repository["created_at"]));?></td>
                <td><?php echo $repository["stargazers_count"];?></td>
                <td><?php echo $repository["programing_language"];?></td>
                <td>
                    <a href="view_repository/<?php echo $repository["id"]?>" class='btn btn-view'>
                        <i class='fa fa-eye'></i>
                    </a>
                </td>
                <?php endforeach; ?>
            </tr>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>