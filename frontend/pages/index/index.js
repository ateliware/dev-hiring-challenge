const apiURL = "http://localhost:8080";
window._app = {}

function handleError() {
    hideLoader();
}

function renderTable(repositorios) {
    $("table tbody tr").remove();
    repositorios.forEach((repositorio, i) => {
        let tableRow = $("<tr/>");
        tableRow.append(`<td>${i + 1}</td>`);
        tableRow.append(`<td>${repositorio.nome}</td>`);
        tableRow.append(`
                        <td>
                            <span title="O owner deste repositório é ${repositorio.owner_tipo == "Organization" ? "uma organização" : "um usuário"}">${repositorio.owner_tipo == "Organization" ? "🏢" : "👤"}</span> 
                            <a href="${repositorio.owner_url}" target="_blank" title="Clique para visitar o perfil">${repositorio.owner_nome}</a>
                        </td>`);
        tableRow.append(`<td>${new Date(repositorio.data_criacao).toLocaleDateString()}</td>`);
        tableRow.append(`<td>${repositorio.estrelas}</td>`);
        tableRow.append(`<td></td>`);
        $("table tbody").append(tableRow);
    });
}

$(document).ready(function () {

    // Handle Select Languange OnChange
    $("#linguagem-programacao").on("change", function () {

        $("#dados-linguagem").show();
        $("table tbody tr").remove();

        let linguagemSelecionada = $("#linguagem-programacao").val();

        $.ajax({
            url: `${apiURL}/repositorios?linguagem=${linguagemSelecionada}`,
            type: "GET",
        })
            .fail(handleError)
            .done(function (result) {
                renderTable(result);

                // Se já tiver algum repositório cadastrado no cache do banco de dados então habilitamos o botão de excluir e deixamos o de salvar desabilitado
                // Se não tiver nenhum repositório cadastrado no cache do banco de dados então deixamos tanto o botão de excluir quanto de salvar desabilitados
                if (result.length > 0) {
                    $("#excluir-repositorios-do-cache").prop("disabled", false);
                    $("#salvar-repositorios-em-cache").prop("disabled", true);
                } else {
                    $("#excluir-repositorios-do-cache").prop("disabled", true);
                    $("#salvar-repositorios-em-cache").prop("disabled", true);
                }

                hideLoader();
            });

    });

    // Handle Search Click
    $("#buscar-repositorios-github").on("click", function () {

        let linguagemSelecionada = $("#linguagem-programacao").val();

        showLoader();

        $.ajax({
            url: `https://api.github.com/search/repositories?sort=stars&per_page=5&q=language:${linguagemSelecionada}`,
            type: "GET"
        })
            .fail(handleError)
            .done(function (result) {
                var repositorios = result.items.map(function (repositorio) {
                    return {
                        nome: repositorio.name,
                        linguagem: repositorio.language,
                        descricao: repositorio.description,
                        data_criacao: repositorio.created_at,
                        data_ultima_atualizacao: repositorio.updated_at,
                        tamanho: repositorio.size,
                        estrelas: repositorio.stargazers_count,
                        forks: repositorio.forks_count,
                        issues_abertas: repositorio.open_issues_count,
                        owner_tipo: repositorio.owner.type,
                        owner_nome: repositorio.owner.login,
                        owner_url: repositorio.owner.html_url,
                    };
                });
                window._app.repositorios = repositorios;
                
                renderTable(repositorios);
                hideLoader();

                // Ao buscar os dados no GitHub então habilitamos o botão de salvar os dados do GitHub no cache
                $("#salvar-repositorios-em-cache").prop("disabled", false);

            });

    });

    // Handle Save Click
    $("#salvar-repositorios-em-cache").on("click", function () {
        $.ajax({
            url: `${apiURL}/repositorios`,
            type: "POST",
            data: JSON.stringify(window._app.repositorios),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
        })
            .fail(handleError)
            .done(function () {

                // Ao salvar os dados no cache do banco de dados então habilitamos o botão de excluir os dados do cache e desabilitamos o botão de salvar porque já foi salvo
                $("#excluir-repositorios-do-cache").prop("disabled", false);
                $("#salvar-repositorios-em-cache").prop("disabled", true);

            });
    });

    // Handle Delete Click
    $("#excluir-repositorios-do-cache").on("click", function () {
        let linguagemSelecionada = $("#linguagem-programacao").val();
        $.ajax({
            url: `${apiURL}/repositorios?linguagem=${linguagemSelecionada}`,
            type: "DELETE"
        })
            .fail(handleError)
            .done(function () {

                // Ao excluir os dados do cache então desabilitamos o botão de salvar os dados porque eles foram excluidos, e desabilitamos o botão de excluir porque já foi excluido
                $("#excluir-repositorios-do-cache").prop("disabled", true);
                $("#salvar-repositorios-em-cache").prop("disabled", true);

                // Removendo os registros da tabela
                $("table tbody tr").remove();

            });
    });

});

function showLoader() {
    $("*:focus").blur();

    if (!$("div.loader").get(0)) {
        var divLoader = $("<div></div>");
        divLoader.addClass("loader");

        var divLoaderSpinnerWrapper = $("<div></div>");
        divLoaderSpinnerWrapper.addClass("spinner-wrapper");

        var divLoaderSpinner = $("<div></div>");
        divLoaderSpinner.addClass("spinner");

        var divLoaderSpinnerLabel = $("<p></p>");
        divLoaderSpinnerLabel.addClass("spinner-label");
        divLoaderSpinnerLabel.html("Carregando");

        divLoader.append(divLoaderSpinnerWrapper);
        divLoaderSpinnerWrapper.append(divLoaderSpinner);
        divLoaderSpinnerWrapper.append(divLoaderSpinnerLabel);
        $("body").append(divLoader);
        $("body").addClass("loader");
    }

}

function hideLoader() {
    $("div.loader").remove();
    $("body").removeClass("loader");
}