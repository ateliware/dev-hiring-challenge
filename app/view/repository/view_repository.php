<?php
$repositories = new Repository();
$id = $repositories->formatId();
$repository = $repositories->listRepositoryByIdQuery($id);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Git Hub</title>
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
        <h1>Repository Info</h1>
    </div>
</div>
<table class="table">
    <tbody>
    <tr>
        <th scope="row">Repository name</th>
        <td><?php echo $repository->full_name?></td>
    </tr>
    <tr>
        <th scope="row">Description</th>
        <td><?php echo $repository->description?></td>
    </tr>
    <tr>
        <th scope="row">Number of stars</th>
        <td><?php echo $repository->stargazers_count?></td>
    </tr>
    <tr>
        <th scope="row">Address</th>
        <td><?php echo $repository->html_url?></td>
    </tr>
    <tr>
        <th scope="row">Homepage</th>
        <td><?php echo $repository->homepage?></td>
    </tr>
    </tbody>
</table>
</body>
</html>