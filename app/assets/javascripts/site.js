let listaRepositorios = [];
let listaIds = ["lista_node", "lista_django", "lista_rails", "lista_dotnet", "lista_php"];

// Método que faz a busca dos repositórios, quando o botão buscar é clicado
function buscaRepositorios(){
    $(".carregando").css("display", "flex");
    $.ajax({
        type: 'GET',
        url:  '/get_list_repositories',
        data: {},
        success: function(data){
            let element;
            try{
                element = data.repositorios[0].linguagem;
            }catch(e){
                element = {message: "erro"};
            }
            if(element.hasOwnProperty("message")){
                alert("Oops! Você excedeu o limite de requisições por minuto. Tente mais tarde :(");
            }else{
                listaRepositorios = data;
                location.href = "#contaier_linguagens";
                $("#contaier_listas").removeClass("oculto");
                preencheListaRepositorios();
            }
            $(".carregando").css("display", "none");
        },
        error: function(msg){
            $(".carregando").css("display", "none");
            alert("Erro ao obter dados.");
        },
        fail: function(msg){
            $(".carregando").css("display", "none");
            alert("Erro ao obter dados.");
        },
        timeout: function(msg){
            $(".carregando").css("display", "none");
            alert("Tempo de espera de requisição esgotado.");
        }
    });
}

// Método que faz o preenchimento das listas
function preencheListaRepositorios(){
    for(let i = 0; i < listaRepositorios.repositorios.length; i++){
        let obj = listaRepositorios.repositorios[i].linguagem;
        let html = "";
        for(let r = 0; r < obj.items.length; r++){
            let subObj = obj.items[r];
            html += "<li>" +
                "<label onclick=\"detalhes('" + listaIds[i] + "', " + r + ");\" class=\"item-lista-linguagens\"><i class=\"fas fa-plus-circle icone-detalhes-repositorio verde-claro\"></i>" + Array(subObj.full_name.split("/")).toString().replaceAll(",", " / ") + "</label>" +
            "</li>";
        }
        $("#" + listaIds[i]).html(html);
    }
}

// Método que mostra os detalhes de cada linguagem
function detalhes(linguagem, posicao){
    let indice = listaIds.indexOf(linguagem);
    let html = "";
    if(indice >= 0){
        let classeCor = $("#titulo_" + linguagem).attr("class").split(" ")[2]
        $("#modalDetalhesLabel").text($("#titulo_" + linguagem).text());
        $("#modalDetalhesLabel").attr("class", "modal-title " + classeCor);
        for(let r = 0; r < listaRepositorios.repositorios[indice].linguagem.items.length; r++){
            if(posicao == undefined || posicao == r){
                let obj = listaRepositorios.repositorios[indice].linguagem.items[r];
                html += "<li class=\"item-list-container\">" +
                    "<p class=\"cabecalho-item-list\">Nome repositório:&nbsp;&nbsp;<a href=\"" + obj.html_url + "\" target=\"_blank\" class=\"link-cabecalho-item-list " + classeCor + "\"><b>" + obj.full_name + "&nbsp;&nbsp;<i class=\"fas fa-external-link-alt\"></i></b></a></p>" +
                    "<div class=\"item-list-sucontainer\">";
                if(obj.description != null){
                    html += "<p>Descrição:&nbsp;&nbsp;<label class=\"descricao-item-list " + classeCor + "\"><br>" + obj.description + "<p>";
                }else if(obj.short_description){
                    html += "<p>Descrição:&nbsp;&nbsp;<label class=\"descricao-item-list " + classeCor + "\"><br>" + obj.short_description + "<p>";
                }else{
                    html += "<p>Descrição:&nbsp;&nbsp;<label class=\"descricao-item-list " + classeCor + "\"><br>sem descrição<p>";
                }
                if(obj.score != null){
                    html += "<p>Score:&nbsp;&nbsp;<label class=\"score-item-list\"><b>" + obj.score + "</b><p>";
                }else{
                    html += "<p>Score:&nbsp;&nbsp;<label class=\"score-item-list\"><b>0</b><p>";
                }
                if(obj.created_at != null){
                    html += "<p>Data de Criação:&nbsp;&nbsp;<label class=\"score-item-list\"><b>" + new Date(obj.created_at).toLocaleString() + "</b><p>";
                }else{
                    html += "<p>Data de Criação:&nbsp;&nbsp;<label class=\"score-item-list\"><b> - </b><p>";
                }
                if(obj.curated){
                    html += "<p>Curated:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Sim</b><p>";
                }else{
                    html += "<p>Curated:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Não</b><p>";
                }
                if(obj.featured){
                    html += "<p>Featured:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Sim</b><p>";
                }else{
                    html += "<p>Featured:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Não</b><p>";
                }
                if(obj.private){
                    html += "<p>Private:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Sim</b><p>";
                }else{
                    html += "<p>Private:&nbsp;&nbsp;<label class=\"score-item-list\"><b>Não</b><p>";
                }
                html += "<p>Forks:&nbsp;&nbsp;<label class=\"score-item-list\"><b>" + obj.forks + "</b><p>";
                html += "</div>" +
                "</li>";
            }
        }
    }
    $("#lista_linguagens_detalhada").html(html);
    $("#modalDetalhes").modal();
}
