/// <reference path="../Framework/js/jquery-3.4.1.min.js" />

(function () {

    $_AJAXCallBack = function (metodoWEB, parms, async, fnCallback, fnError) {

        parms = (parms == undefined ? {} : parms);
        async = (async == undefined ? false : async);

        var settings = ConfigAJAX(parms, metodoWEB, async);
        return AjaxManager(settings, fnCallback, fnError);

    };

    // ------ [FIM] ----------------------------------------- [Chamadas do AJAX] ---->

    // ------ [INI] ----------------------------------------- [Métodos Privados] ---->

    var ConfigAJAX = function (params, method, async) {        

        var dataSettings = {

            type: 'POST',
            url: method,
            data: JSON.stringify(params),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: async
        }

        return dataSettings;

    };

    /**
     * Padroniza as requisições AJAX.
     * @param {Object} ajaxSettings
     * @param {Function} fnCallback
     * @param {Function} fnError
     * @param {Number} limiteTentativas Limite de tentativas em caso de falha de conexão.
     * @param {Number} intervaloTentativas Intervalo entre as tentativas.
     */
    var AjaxManager = function (ajaxSettings, fnCallback, fnError, limiteTentativas, intervaloTentativas) {

        if (typeof limiteTentativas != "number") limiteTentativas = 15;
        if (typeof intervaloTentativas != "number") intervaloTentativas = 1000;

        $.ajax(ajaxSettings)
            .fail(function (jqXHR) {

                // ----- Erro de Rede
                if (jqXHR.readyState == 0 && limiteTentativas > 0) {

                    limiteTentativas--;
                    if (console && console.log) console.log("Erro - Tentativas restantes: " + limiteTentativas + ", readyState: 0, Status: " + jqXHR.status + " " + jqXHR.statusText);
                    return setTimeout(function () { AjaxManager(ajaxSettings, fnCallback, fnError, limiteTentativas, intervaloTentativas); }, intervaloTentativas);

                } else {

                    if (console && console.log) console.log("Erro - readyState: " + jqXHR.readyState + ", Status: " + jqXHR.status + " " + jqXHR.statusText);
                    if (typeof fnError == "function") return fnError(jqXHR);
                }

            })
            .done(function (response) {
                var data = JSON.parse(response.d);
                if (typeof fnCallback == "function") return fnCallback(data);
            });

    };    

    // ------ [FIM] ----------------------------------------- [Métodos Privados] ---->

})();