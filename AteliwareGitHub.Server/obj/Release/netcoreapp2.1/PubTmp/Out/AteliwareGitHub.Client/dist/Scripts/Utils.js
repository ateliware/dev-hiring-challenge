window.utilJSFunctions = {
    showRepoDetail: function (repoUnit) {

        $('#reponome').val(repoUnit.name);
        $('#repostars').val(repoUnit.stargazers_count);
        $('#repodescription').val(repoUnit.description);
        $('#Repourl').val(repoUnit.url);

        window.alert(" Name: "+repoUnit.name+"\n Stars: "+repoUnit.stargazers_count+"\n Description: "+repoUnit.description+"\n URL: "+repoUnit.url );
    },
    showMessage: function (msg) {
        window.alert(msg);
    }
};