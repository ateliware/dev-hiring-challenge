const apiURL = "http://localhost:8080";
window._app = {}

Sentry.init({
    dsn: "https://10b9fbe56794482094eb2e985c7bc942@o332903.ingest.sentry.io/6489350",
    normalizeDepth: 10,
    ignoreErrors: ["Non-Error exception captured"]
});

function handleError(data) {
    hideLoader();

    if (data) {

        if (data.responseJSON) {
            if (data.responseJSON.error) {
                showNotification("error", data.responseJSON.error)
                return;
            }
            if (data.responseJSON.message) {
                showNotification("error", data.responseJSON.message)
                return;
            }
        }
        
        if (data.responseText) {
            showNotification("error", data.responseText)
            return;
        }

    } else {
        showNotification("error", "Ocorreu um erro ao tentar realizar a operaçãos")
    }

}

function renderTable(repositorios) {
    $("table tbody tr").remove();
    repositorios.forEach((repositorio, i) => {
        let tableRow = $("<tr/>");
        tableRow.append(`<td class="col-sequencial-number">${i + 1}</td>`);
        tableRow.append(`<td>${repositorio.nome}</td>`);
        tableRow.append(`
                        <td>
                            <span title="O owner deste repositório é ${repositorio.owner_tipo == "Organization" ? "uma organização" : "um usuário"}">${repositorio.owner_tipo == "Organization" ? "🏢" : "👤"}</span> 
                            <a href="${repositorio.owner_url}" target="_blank" title="Clique para visitar o perfil">${repositorio.owner_nome}</a>
                        </td>`);
        tableRow.append(`<td>${new Date(repositorio.data_criacao).toLocaleDateString()}</td>`);
        tableRow.append(`<td>${repositorio.estrelas}</td>`);
        tableRow.append(`<td class="col-actions"></td>`);
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
                    showNotification("success", "Repositórios buscados com sucesso no Cache")
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

                // Ao buscar os dados no GitHub então habilitamos o botão de salvar os dados do GitHub no cache
                $("#salvar-repositorios-em-cache").prop("disabled", false);

                showNotification("success", "Repositórios buscados com sucesso no GitHub");
                hideLoader();
            });

    });

    // Handle Save Click
    $("#salvar-repositorios-em-cache").on("click", function () {
        showLoader();

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

                showNotification("success", "Repositórios salvos com sucesso");
                hideLoader();

            });
    });

    // Handle Delete Click
    $("#excluir-repositorios-do-cache").on("click", function () {
        showLoader();

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

                showNotification("success", "Repositórios excluídos com sucesso");
                hideLoader();

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

function showNotification(tipo, mensagem) {
    var titulo, clazz;
    if (tipo == "error") {
        titulo = "Erro";
        clazz = "error";
    } else {
        titulo = "Sucesso";
        clazz = "success";
    }

    const toastID = new Date().getTime();
    const toastTemplate = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast" id="${toastID}" data-bs-delay="3000" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto toast-title-icon ${clazz}">${titulo}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${mensagem}
            </div>
        </div>
    </div>
    `;

    $(document.body).append($(toastTemplate));

    const toast = new bootstrap.Toast($(`#${toastID}`)[0]);
    toast.show();

}