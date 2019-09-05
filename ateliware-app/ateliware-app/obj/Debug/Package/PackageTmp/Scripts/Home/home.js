//

//f_gerar()

var repositorio;
var processando;
var alert_id = 0;
var loaderText = document.getElementById("loader-text");
var loader  = document.getElementById("loader");
var btnListar = document.getElementById("btnListar");
var btnGerar = document.getElementById("btnGerar");
var tbRepositorio = document.getElementById("tblRepositorio");
var xhr = new XMLHttpRequest();


btnListar.onclick = function () {
    f_listar("Listar");
}

btnGerar.onclick = function () {
    f_listar("Buscar");
}

var f_listar = (v_metodo) => {
    tbRepositorio.innerHTML = "";
    f_loader(v_metodo);

    xhr.open("GET", `http://ateliware-w.us-west-2.elasticbeanstalk.com/api/repositorio/${v_metodo}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                repositorio = JSON.parse(this.responseText);
                f_montarTabela(repositorio);
                clearInterval(processando);
                loaderText.innerHTML = "";
                loader.style.display = "none";
            }
            else{
                clearInterval(processando);
                loaderText.innerHTML = "Problemas ao se conectar com o servidor";
                loader.style.display = "none";
            }
        }
    }
}


var f_abrir = (v_index) => {
    var html = '';
    v_dados = repositorio[v_index];

    txtNome = document.getElementById("txtNome");
    txtTitulo = document.getElementById("txtTitulo"); 
    txtAutor = document.getElementById("txtAutor");
    txtLink = document.getElementById("txtLink");
    txtDescricao = document.getElementById("txtDescricao");
    avatar = document.getElementById("avatar");
    document.getElementById("tituloModal").text = v_dados.name;

    txtNome.value = v_dados.name;
    txtTitulo.value = v_dados.full_name;
    txtAutor.value = v_dados.login;
    txtLink.value = v_dados.html_url;
    txtDescricao.value = v_dados.description;
    avatar.src = v_dados.link_foto;

    tbLinguagem = document.getElementById("tblLinguagem");
    tbLinguagem.innerHTML = "";

    v_dados.Linguagem.map((v_object, v_index) => {
        html = `<tr>
                    <td>${v_object.nome_liguagem}</td>
                </tr>`

        tbLinguagem.innerHTML += html;
    });
    
}

var f_montarTabela = (v_dados) => {
    var html='' ;
    
    v_dados.map((v_object, v_index) => {
        html = `<tr>
                    <td>${v_object.name}</td>
                    <td>${v_object.full_name}</td>
                    <td>${v_object.login}</td>
                    <td><button type="button" onclick="f_abrir(${v_index})" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modalDetalhe">Detalhes</button></td>
                </tr>`

        tbRepositorio.innerHTML += html;
    });

}

var f_loader = (v_metodo) => {
    loader.style.display = "block";

    processando = setInterval(function () {
        if (v_metodo == "Listar") {
            if (alert_id >= 1)
                alert_id = 0;
            loaderText.innerHTML = alertas.listar[alert_id];
        }
        else {
            if (alert_id > 4)
                alert_id = 1;
            loaderText.innerHTML = alertas.gerar[alert_id];
        }
        ++alert_id;

    }, 6500);

    if (v_metodo == "Listar") {
        loaderText.innerHTML = alertas.listar[0];
    }
    else {
        loaderText.innerHTML = alertas.gerar[0];
    }

}

f_listar("Listar");




