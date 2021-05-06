# frozen_string_literal: true

# Module for consume api of github in the home page
module HomeHelper
  require 'rest_client'
  #LANGS = %w[ruby java elixir python javascript].freeze
  URL = 'https://api.github.com/search/repositories'

  # ?q=ruby&s=&per_page=5
  def self.load_and_persist_repo(langs)
    langs.each do |lang|
      json = send_request("#{URL}?q=#{lang}+language:#{lang}&s=&per_page=5")
      persist_repo(json)
    end
  end

  def self.send_request(url)
    resp = RestClient.get url
    JSON.parse(resp.body)['items']
  end

  def self.persist_repo(json)
    json.each do |item|
      rep = Repository.create(repo: item)
      # adicionar tratamento
      rep.save
    end
  end

  def self.convert_param_to_language(param)
    case param
    when 'lang_java' then 'java'
    when 'lang_c' then 'c'
    when 'lang_python' then 'python'
    when 'lang_c++' then 'c++'
    when 'lang_c#' then 'c#'
    when 'lang_javascript' then 'javascript'
    when 'lang_php' then 'php'
    when 'lang_sql' then 'sql'
    when 'lang_swift' then 'swift'
    when 'lang_ruby' then 'ruby'
    when 'lang_object_c' then 'objective c'
    when 'lang_delphi' then 'delphi'
    when 'lang_pascal' then 'pascal'
    when 'lang_r' then 'r'
    when 'lang_groovy' then 'groovy'
    when 'lang_assembly' then 'assembly'
    when 'lang_flutter' then 'flutter'
    when 'lang_visual_basic' then 'visual basic'
    when 'lang_d' then 'd'
    when 'lang_go' then 'go'
    when 'lang_matlab' then 'matlab'
    when 'lang_perl' then 'perl'
    when 'lang_sass' then 'sass'
    when 'lang_dart' then 'dart'
    when 'lang_rust' then 'rust'
    when 'lang_scratch' then 'scratch'
    when 'lang_list' then 'list'
    when 'lang_cobol' then 'cobol'
    when 'lang_fortran' then 'fortran'
    when 'lang_scala' then 'scala'
    when 'lang_kotlin' then 'kotlin'
    when 'lang_lua' then 'lua'
    when 'lang_typescript' then 'typescript'
    when 'lang_haskell' then 'haskell'
    when 'lang_actionscript' then 'actionscript'
    when 'lang_ada' then 'ada'
    when 'lang_vbscript' then 'vbscript'
    when 'lang_bash' then 'bash'
    when 'lang_tcl' then 'tcl'
    when 'lang_postscript' then 'postscript'
    else ''
    end
  end
end
