const client_id = "Iv1.a78237aaa191dcb0";
const client_secret = "3cf571c4a838d6f7a77b3ff4d90a30041032d7b8";
const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const CntrName = document.querySelector(".main__profile-name");
const CntrRepos = document.querySelector(".main__profile-repos");


// /\ elementos htmls  que precisamos


//criar a f(x) responsável por fazer a chamada da API
const callApi = async (user) => {
    const api_call = await fetch('https://api.github.com/users/'+user+'?client_id='+client_id+'&client_secret='+client_secret);
    //const api_call = await fetch('https://api.github.com/users/'+user+'/repos')
    //https:api.github.com/users/ateliware/repos
    //https://api.github.com/repos/smarcelo-code/CRUD/languages
    //'https://api.github.com/users/'+user+'/repos'
    const data = await api_call.json(); //converter a API para ser lida 
    return data
}


const releases = () => {
    callApi(inputValue.value).then((res) => {
        console.log(res);
       
        CntrName.innerHTML = '<z>Name:<span class="main__profile-value">' + res.name + '</span></z>';
        
        CntrRepos.innerHTML = '<z>Repositórios:<span class="main__profile-value">' + res.public_repos + '</span></z>';
    })
}




//qnd der um click, realizar evento, chamando releases
searchButton.addEventListener("click", () => {
    releases();
}) 
