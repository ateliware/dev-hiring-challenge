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
        showNotification("error", "Ocorreu um erro ao tentar realizar a operação")
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
        let tdDtalhes = $(`<td class="col-actions"><button>ℹ️</button></td>`);
        tableRow.append(tdDtalhes);

        $("table tbody").append(tableRow);

        tdDtalhes.on("click", function () {
            showRepositoryInfoModal(repositorio); 
        });

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

                showNotification("success", "Repositórios salvos com sucesso no Cache");
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

                showNotification("success", "Repositórios excluídos com sucesso do Cache");
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

function showRepositoryInfoModal(repositorio) {
    
    const modalID = new Date().getTime();
    const modalTemplate = `
    <div class="modal" id="${modalID}" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Informações do repositório</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <h3><a href="${repositorio.owner_url}">${repositorio.owner_nome}</a> / <a style="font-weight: 700;" href="${repositorio.owner_url + "/" + repositorio.nome}">${repositorio.nome}</a></h3>
                        </div>
                        <div class="col-12" style="text-align: start">
                            ${String(repositorio.descricao).trim()}
                        </div>
                        <div class="col-12">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star d-inline-block mr-2">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>
                            <b>Estrelas: </b> ${repositorio.estrelas}
                        </div>
                        <div class="col-12">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                                <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                            </svg> 
                            <b>Forks: </b>  ${repositorio.forks}
                        </div>
                        <div class="col-12">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-issue-opened UnderlineNav-octicon d-none d-sm-inline">
                                <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                            </svg>
                            <b>Issues abertas: </b> ${repositorio.issues_abertas}
                        </div>
                        <div class="col-12">
                            <b>Data de Criação: </b> ${new Date(repositorio.data_criacao).toLocaleDateString()}
                        </div>
                        <div class="col-12">
                            <b>Issues da Ultima Atualização: </b> ${new Date(repositorio.data_ultima_atualizacao).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    $(document.body).append($(modalTemplate));
    const modal = new bootstrap.Modal($(`#${modalID}`)[0]);
    modal.show();

}