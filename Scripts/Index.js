/// <reference path="../Framework/js/jquery-3.4.1.min.js" />
/// <reference path="AJAXCalls.js" />

// #region Controlador Vue.js

var vwRepos = new Vue({
    el: '#divRepos',
    data: {
        PesquisaFeita: false,
        Repos: {
            CSharp: [],
            VB: [],
            Java: [],
            JavaScript: [],
            Python: []
        },
        RepoDetalhe: {},
        Controles: {
            btnBuscar: false,
            CSharp: false,
            VB: false,
            Java: false,
            JavaScript: false,
            Python: false
        }
    },
    updated: function () {
        this.$nextTick(function () {

            if (!vwRepos.Controles.CSharp && !vwRepos.Controles.VB && !vwRepos.Controles.Java
                && !vwRepos.Controles.JavaScript && !vwRepos.Controles.Python) {
                vwRepos.Controles.btnBuscar = false;
            }

            // ----- Ativa os Tooltips
            $('[data-toggle="tooltip"]').tooltip()

        })
    },
    methods: {
        Buscar: function () {

            this.ConsultarCSharp();
            this.ConsultarVB();
            this.ConsultarJava();
            this.ConsultarJavaScript();
            this.ConsultarPython();
            
            vwRepos.PesquisaFeita = true;

        },

        ConsultarCSharp: function () {

            vwRepos.Controles.CSharp = true;
            var parms = { language: "csharp", qtd: 10 };

            $_AJAXCallBack("Index.aspx/ConsultarRepos", parms, true,
                function (result) {
                    if (result) {
                        vwRepos.Repos.CSharp = result;
                    } else {
                        console.log("Erro -> Função: ConsultarCSharp().");
                    }
                    vwRepos.Controles.CSharp = false;
                },
                function (error) {
                    console.log(error);
                    vwRepos.Controles.CSharp = false;
                }
            );

        },

        ConsultarVB: function () {

            vwRepos.Controles.VB = true;
            var parms = { language: "vb.net", qtd: 10 };

            $_AJAXCallBack("Index.aspx/ConsultarRepos", parms, true,
                function (result) {
                    if (result) {
                        vwRepos.Repos.VB = result;
                    } else {
                        console.log("Erro -> Função: ConsultarVB().");
                    }
                    vwRepos.Controles.VB = false;
                },
                function (error) {
                    console.log(error);
                    vwRepos.Controles.VB = false;
                }
            );

        },

        ConsultarJava: function () {

            vwRepos.Controles.Java = true;
            var parms = { language: "java", qtd: 10 };

            $_AJAXCallBack("Index.aspx/ConsultarRepos", parms, true,
                function (result) {
                    if (result) {
                        vwRepos.Repos.Java = result;
                    } else {
                        console.log("Erro -> Função: ConsultarJava().");
                    }
                    vwRepos.Controles.Java = false;
                },
                function (error) {
                    console.log(error);
                    vwRepos.Controles.Java = false;
                }
            );

        },

        ConsultarJavaScript: function () {

            vwRepos.Controles.JavaScript = true;
            var parms = { language: "javascript", qtd: 10 };

            $_AJAXCallBack("Index.aspx/ConsultarRepos", parms, true,
                function (result) {
                    if (result) {
                        vwRepos.Repos.JavaScript = result;
                    } else {
                        console.log("Erro -> Função: ConsultarJavaScript().");
                    }
                    vwRepos.Controles.JavaScript = false;
                },
                function (error) {
                    console.log(error);
                    vwRepos.Controles.JavaScript = false;
                }
            );

        },

        ConsultarPython: function () {

            vwRepos.Controles.Python = true;
            var parms = { language: "python", qtd: 10 };

            $_AJAXCallBack("Index.aspx/ConsultarRepos", parms, true,
                function (result) {
                    if (result) {
                        vwRepos.Repos.Python = result;
                    } else {
                        console.log("Erro -> Função: ConsultarPython().");
                    }
                    vwRepos.Controles.Python = false;
                },
                function (error) {
                    console.log(error);
                    vwRepos.Controles.Python = false;
                }
            );

        },

        VerDetalhes: function (tipo, id) {

            switch (tipo) {
                case 1:
                    vwRepos.RepoDetalhe = vwRepos.Repos.CSharp.find(x => x.id == id);
                    break;
                case 2:
                    vwRepos.RepoDetalhe = vwRepos.Repos.VB.find(x => x.id == id);
                    break;
                case 3:
                    vwRepos.RepoDetalhe = vwRepos.Repos.Java.find(x => x.id == id);
                    break;
                case 4:
                    vwRepos.RepoDetalhe = vwRepos.Repos.JavaScript.find(x => x.id == id);
                    break;
                case 5:
                    vwRepos.RepoDetalhe = vwRepos.Repos.Python.find(x => x.id == id);
                    break;
                default:
                    return;
            }

            $("#mdRepoDetalhes").modal({ backdrop: 'static', keyboard: false });

        }
    }
});

// #endregion

// #region Eventos de Inicialização

$(document).ready(function () {    

    // ----- Configurando a Ação do Botão
    ControleBotoes();

    // ----- Ativa os Tooltips
    $('[data-toggle="tooltip"]').tooltip()

});

// #endregion

// #region Métodos

function ControleBotoes() {

    $("#btnBuscar").click(function () {

        vwRepos.Controles.btnBuscar = true;
        vwRepos.Buscar();

    });

}

// #endregion