require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the HomeHelper. For example:
#
# describe HomeHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe HomeHelper, type: :helper do

  describe '#converte_param_to_language' do
    it 'return language name for request in github api' do
      expect(HomeHelper.convert_param_to_language('lang_actionscript')).to eq('actionscript')
      expect(HomeHelper.convert_param_to_language('lang_ada')).to eq('ada')
      expect(HomeHelper.convert_param_to_language('lang_assembly')).to eq('assembly')
      expect(HomeHelper.convert_param_to_language('lang_bash')).to eq('bash')
      expect(HomeHelper.convert_param_to_language('lang_cobol')).to eq('cobol')
      expect(HomeHelper.convert_param_to_language('lang_dart')).to eq('dart')
      expect(HomeHelper.convert_param_to_language('lang_delphi')).to eq('delphi')
      expect(HomeHelper.convert_param_to_language('lang_fortran')).to eq('fortran')
      expect(HomeHelper.convert_param_to_language('lang_go')).to eq('go')
      expect(HomeHelper.convert_param_to_language('lang_groovy')).to eq('groovy')
      expect(HomeHelper.convert_param_to_language('lang_haskell')).to eq('haskell')
      expect(HomeHelper.convert_param_to_language('lang_java')).to eq('java')
      expect(HomeHelper.convert_param_to_language('lang_javascript')).to eq('javascript')
      expect(HomeHelper.convert_param_to_language('lang_kotlin')).to eq('kotlin')
      expect(HomeHelper.convert_param_to_language('lang_lua')).to eq('lua')
      expect(HomeHelper.convert_param_to_language('lang_matlab')).to eq('matlab')
      expect(HomeHelper.convert_param_to_language('lang_pascal')).to eq('pascal')
      expect(HomeHelper.convert_param_to_language('lang_perl')).to eq('perl')
      expect(HomeHelper.convert_param_to_language('lang_php')).to eq('php')
      expect(HomeHelper.convert_param_to_language('lang_postscript')).to eq('postscript')
      expect(HomeHelper.convert_param_to_language('lang_python')).to eq('python')
      expect(HomeHelper.convert_param_to_language('lang_r')).to eq('r')
      expect(HomeHelper.convert_param_to_language('lang_ruby')).to eq('ruby')
      expect(HomeHelper.convert_param_to_language('lang_rust')).to eq('rust')
      expect(HomeHelper.convert_param_to_language('lang_sass')).to eq('sass')
      expect(HomeHelper.convert_param_to_language('lang_scala')).to eq('scala')
      expect(HomeHelper.convert_param_to_language('lang_sql')).to eq('sql')
      expect(HomeHelper.convert_param_to_language('lang_swift')).to eq('swift')
      expect(HomeHelper.convert_param_to_language('lang_tcl')).to eq('tcl')
      expect(HomeHelper.convert_param_to_language('lang_typescript')).to eq('typescript')
    end
  end
end
