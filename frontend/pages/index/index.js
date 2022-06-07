function handleError() {
    hideLoader();
}

$(document).ready(function () {

    $("#linguagem-programacao").on("change", function () {
        // TODO
    });

    $("#buscar-repositorios").on("click", function () {
        let linguagemSelecionada = $("#linguagem-programacao").val();


        $.get(`https://api.github.com/search/repositories?sort=stars&per_page=5&q=language:${linguagemSelecionada}`)
            .fail(handleError)
            .done(function (result) {
                $("table tbody tr").remove();

                result.items.forEach((repositorio, i) => {
                    let tableRow = $("<tr/>");
                    tableRow.append(`<td>${i + 1}</td>`);
                    tableRow.append(`<td>${repositorio.name}</td>`);
                    tableRow.append(`
                                <td>
                                    <span title="O owner deste repositório é ${repositorio.owner.type == "Organization" ? "uma organização" : "um usuário"}">${repositorio.owner.type == "Organization" ? "🏢" : "👤"}</span> 
                                    <a href="${repositorio.owner.html_url}" target="_blank" title="Clique para visitar o perfil">${repositorio.owner.login}</a>
                                </td>`);
                    tableRow.append(`<td>${new Date(repositorio.created_at).toLocaleDateString()}</td>`);
                    tableRow.append(`<td>${repositorio.stargazers_count}</td>`);
                    tableRow.append(`<td></td>`);
                    $("table tbody").append(tableRow);
                });

            });
    });

    $("#salvar-repositorios-em-cache").on("click", function () {
        // TODO
    });

    $("#excluir-repositorios-do-cache").on("click", function () {
        // TODO
    });

});
