console.log("Start");

var e = document.getElementsByClassName('repository');
var repos = {"repositories":[]};

for (var c of e) {
    r = {
        "repo_id":c.getAttribute('data-id'),
        "name":c.getAttribute('data-name')
    };
    repos.repositories.push(r)
}

console.log(repos)

var save = document.getElementById('save');

save.addEventListener('click', function(){
    console.log(repos)
    fetch('/add', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(repos)
    }).then(res=>res.json())
        .then(function(result) {
            if (result.status===1) {
                console.log(result)
            }
            location.reload();
        })
        .catch(function(e) {
            console.log(e)
        });
});


