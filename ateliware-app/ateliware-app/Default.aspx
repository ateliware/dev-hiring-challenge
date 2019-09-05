

<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ateliware_app._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="modal fade" tabindex="-1" role="dialog" id="modalDetalhe" aria-labelledby="gridSystemModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="tituloModal"></h4>
          </div>
          <div class="modal-body">
                <div class="col-md-8 col-xs-8">
                    <div class="row">
                        <label class="control-label">Nome</label>
                        <input type="text" class="form-control" id="txtNome">
                    </div>
                    <div class="row">
                        <label class="control-label">Título</label>
                        <input type="text" class="form-control" id="txtTitulo">
                    </div>
                    <div class="row">
                        <label class="control-label">Autor</label>
                        <input type="text" class="form-control" id="txtAutor">
                    </div>
                    <div class="row">
                        <label class="control-label">Link</label>
                        <input type="text" class="form-control" id="txtLink">
                    </div>
                    <div class="row">
                        <label class="control-label">Descrição</label>
                        <textarea rows="3" class="form-control" id="txtDescricao"></textarea>
                    </div>
                </div>
                <div class="col-md-4 col-xs-4">
                    <img class="img-responsive" id="avatar" src="https://placeholder.com/" alt="">
                </div>
                <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Linguagem</th>
                      </tr>
                    </thead>
                    <tbody id="tblLinguagem">
                    </tbody>
                </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-xs-4">
            </div>
            <div class="col-md-6 col-xs-6">
                <img src="data:image/png;base64,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" alt="logo ateliware"/>
            </div>        
            <div class="col-md-4 col-xs-4">
            </div>
        </div>
        <div style="margin-top:40px;">
            <button  type="button" class="pull-left btn btn-primary btn-lg" id="btnListar">Listar</button>
            <button  type="button" class="pull-right btn btn-primary btn-lg" id="btnGerar">Gerar</button>
        </div>
        <div>
            <div id="loader" class="loader"></div> 
        </div>
        <table style="margin-top:40px;" class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Título</th>
              <th scope="col">Autor</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tblRepositorio">
          </tbody>
        </table>
        <p class="text-center" style="margin-top:100px" id="loader-text"/><p>
    </div>
    <script src="Scripts/loader.alertas.js?v=2"></script>
    <script src="Scripts/Home/home.js?v=2"></script>
</asp:Content>
