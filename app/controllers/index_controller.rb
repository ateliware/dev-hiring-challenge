require 'net/http'
require 'json'

class IndexController < ApplicationController    
    URL = 'https://api.github.com/search/repositories'
    TOKEN_API_GITHUB = '$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'
    USERNAME = 'paulovf'
    FRAMEWORKS = ['node', 'django', 'rails', 'dotnet', 'php']
    LINGUAGENS = ['node', 'python', 'ruby', 'dotnet', 'php']
    LIMITE_REPOSITORIOS = 10

    # Método que renderiza a tela index
    def index
    end
    
    # Método responsável por realizar a busca dos repositórios, e retornar o json com os dados encontrados.
    def get_list_repositories
        listResp = []
        index = 0
        # Percorre a lista de framewroks a serem pesquisados
        FRAMEWORKS.each do |framework|
            # Cria a requisição HTTPS
            requisicao, http = criarRequisicao(LINGUAGENS[index], framework)
            # Obtém a lista de retorno da pesquisa, no formato json
            listResp << {linguagem: getJsonList(http.request(requisicao))}
            index = index + 1
        end
        # Realiza a gravação dos dados dos repositórios encontrados no banco de dados
        salvar_objeto_repositorio_banco(listResp)
        render json: {'repositorios': listResp}, adapter: :json
    end

    # Método que cria a requisição HTTPS de busca dos repositórios destaques do GitHub na api de consulta
    def criarRequisicao(ling, framework)
        # Esta URL faz uma pesquisa pelo framework e pela linguagem. Em alguns casos, os dois parâmetros podem
        # se repetir
        url = URI.parse(URL + "?q=" + framework + "language%3A" + ling + 
            "&type=Repositories&per_page=" + LIMITE_REPOSITORIOS.to_s)
        requisicao = Net::HTTP::Get.new(url.request_uri)
        requisicao["Accept"] = "Accept: application/vnd.github.mercy-preview+json"
        requisicao.set_form_data({'username'=>USERNAME, 'password'=>TOKEN_API_GITHUB})

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        return requisicao, http
    end

    # Método que faz o decode do texto da resposta da requisição, e converte-o no formato json
    def getJsonList(response)
        return ActiveSupport::JSON.decode(response.body.force_encoding("utf-8"))
    end

    # Método responsável por ler o json de retorno, criar o objeto repositório, e gravar no banco de dados
    def salvar_objeto_repositorio_banco(json)
        json.each do |item|
            if item[:linguagem][:message]
                return
            else
                item[:linguagem]['items'].each do |subitem|
                    # Verifica se existe algum repositório gravado no banco com o mesmo nome. Caso exista,
                    # será feito um update neste objeto
                    repositorio = Repositorio.find_or_initialize_by(nome: "full_name")
                    # Cria o objeto repositório a partir dos valores vindos do json de retorno da pesquisa na
                    # API do GitHub
                    repositorio = criar_objeto_repositorio(repositorio, subitem)
                    repositorio.save
                end
            end
        end
    end

    # Método responsável por criar o objeto repositório, com seus devidos valores, para que possam ser 
    # gravados no banco de dados
    def criar_objeto_repositorio(repositorio, subitem)
        repositorio.nome = subitem['full_name']
        repositorio.descricao = subitem['description']
        repositorio.score = subitem['score']
        repositorio.data_criacao = subitem['created_at']
        repositorio.curated = subitem['curated'] == 'true' ? true : false
        repositorio.featured = subitem['featured'] == 'true' ? true : false
        repositorio.private = subitem['pruvate'] == 'true' ? true : false
        repositorio.forks = subitem['forks']
        repositorio.url = subitem['html_url']
        return repositorio
    end
end
