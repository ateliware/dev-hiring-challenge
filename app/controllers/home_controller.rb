class HomeController < ApplicationController
  def index
    @repositories = Repository.all
  end

  def search
    if params[:input].present?
      # Carrega as linguagens passadas por parametro
      languages = []
      params[:input].each { |(value)| languages << HomeHelper.convert_param_to_language(value) }

      # Remove os registros antigos
      clear_database

      # refaz a consulta nas linguagens selecioandas
      # FIXME: quebrar o método em uma ou mais partes
      HomeHelper.load_and_persist_repo(languages)

      # e exibe a index com os dados atualizados
      redirect_to root_path, notice: 'Carregado com sucesso'
    else
      redirect_to root_path, alert: 'Selecione ao menos uma linguagem para prosseguir'
    end
  end

  private

  def clear_database
    Repository.delete_all
  end

  # Only allow a list of trusted parameter thought.
  def home_params
    params.permit(:input)
  end
end
