<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="AteliwareChallenge.Index" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="theme-color" content="#E72742" />
    <title>Ateliware Challenge</title>
    <link rel="icon" sizes="192x192" href="<%=ResolveClientUrl("Images/github_logo.png") %>" />
    <link rel="icon" type="image/png" href="<%=ResolveClientUrl("Images/github_logo.png") %>" />
    <link href="Framework/css/bootstrap.min.css" rel="stylesheet" />
    <link href="Framework/css/all.min.css" rel="stylesheet" />
    <link href="Styles/Index.css?v=1" rel="stylesheet" />
    <script src="<%=ResolveClientUrl("Framework/js/jquery-3.4.1.min.js") %>" type="text/javascript"></script>
    <script src="<%=ResolveClientUrl("Framework/js/popper.min.js") %>" type="text/javascript"></script>
    <script src="<%=ResolveClientUrl("Framework/js/bootstrap.min.js") %>" type="text/javascript"></script>
    <script src="<%=ResolveClientUrl("Framework/js/all.min.js") %>" type="text/javascript"></script>
    <script src="<%=ResolveClientUrl("Framework/js/vue.min.js") %>" type="text/javascript"></script>
    <script src="<%=ResolveClientUrl("Scripts/AJAXCalls.js") %>" type="text/javascript"></script>
    <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
</head>
<body>
    <div>
        <!-- Formulário Principal -->
        <form id="formChallenge" runat="server">
            <!-- Header -->
            <div class="masthead d-flex h-100 p-3 mx-auto flex-column">
                <header class="my-2 mx-3">
                    <div class="inner">
                        <h2 class="masthead-brand text-center float-sm-left mt-1">
                            <i class="fas fa-share-alt fa-rotate-90"></i><span class="mx-3">Ateliware Challenge</span>
                        </h2>
                    </div>
                </header>
            </div>
            <!-- Body -->
            <main id="divMain" role="main" class="container-fluid mt-2">
                <div class="row my-5">
                    <!-- Repositórios -->
                    <div id="divRepos" class="col-12 col-lg-8 text-center">
                        <!-- Botão -->
                        <div class="row">
                            <div class="col-12">
                                <button id="btnBuscar" type="button" class="btn btn-lg btn-danger my-3" v-bind:disabled="Controles.btnBuscar">
                                    <span v-show="!Controles.btnBuscar">Buscar Repositórios</span>
                                    <span v-show="Controles.btnBuscar"><i class="fas fa-spinner fa-spin"></i></span>
                                </button>
                                <br />
                                <small>Este botão pesquisa e demonstra os 10 repositórios do <b class="text-danger">GitHub</b> com mais destaque das seguintes linguagens:
                                    <br />
                                    <b>C#</b>, <b>VB.NET</b>, <b>Java</b>, <b>JavaScript</b> e <b>Python</b>.
                                </small>
                            </div>
                        </div>
                        <!-- Início -->
                        <div v-show="!PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-5">
                                <h1 class="text-danger">Vamos começar? <i class="fas fa-smile-wink"></i></h1>
                                <strong>Só clicar no botão acima...</strong>
                            </div>
                        </div>
                        <!-- Cards para C# -->
                        <div v-show="PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-3 mb-4">
                                <div v-show="!Controles.CSharp" class="row LinguagemNome text-left">
                                    <div class="col-12">
                                        <strong>C#</strong><br />
                                        <small>Esses são os repositórios que se destacam para essa linguagem segundo o <b>GitHub</b>!</small>
                                    </div>
                                </div>
                                <div v-show="!Controles.CSharp" class="row px-2">
                                    <div class="col card text-justify m-2 LinguagemCartao" v-for="repo in Repos.CSharp">
                                        <div class="card-body">
                                            <h5 class="card-title">{{repo.name}}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-users"></i>&nbsp;&nbsp;{{repo.owner.login}}</h6>
                                            <p class="card-text">{{repo.description}}</p>
                                            <button type="button" class="btn btn-sm btn-dark" v-on:click="VerDetalhes(1, repo.id)">Detalhes</button>
                                            <a v-bind:href="repo.html_url" target="_blank" class="btn btn-sm btn-success" data-toggle="tooltip" data-placement="top" title="Ver no GitHub">
                                                <i class="fas fa-code-branch"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="Controles.CSharp" class="row my-3">
                                    <div class="col-12 CarregandoCards">
                                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cards para VB.NET -->
                        <div v-show="PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-3 mb-4">
                                <div v-show="!Controles.VB" class="row LinguagemNome text-left">
                                    <div class="col-12">
                                        <strong>VB.NET</strong><br />
                                        <small>Esses são os repositórios que se destacam para essa linguagem segundo o <b>GitHub</b>!</small>
                                    </div>
                                </div>
                                <div v-show="!Controles.VB" class="row px-2">
                                    <div class="col card text-justify m-2 LinguagemCartao" v-for="repo in Repos.VB">
                                        <div class="card-body">
                                            <h5 class="card-title">{{repo.name}}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-users"></i>&nbsp;&nbsp;{{repo.owner.login}}</h6>
                                            <p class="card-text">{{repo.description}}</p>
                                            <button type="button" class="btn btn-sm btn-dark" v-on:click="VerDetalhes(2, repo.id)">Detalhes</button>
                                            <a v-bind:href="repo.html_url" target="_blank" class="btn btn-sm btn-info" data-toggle="tooltip" data-placement="top" title="Ver no GitHub">
                                                <i class="fas fa-code-branch"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="Controles.VB" class="row my-3">
                                    <div class="col-12 CarregandoCards">
                                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cards para Java -->
                        <div v-show="PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-3 mb-4">
                                <div v-show="!Controles.Java" class="row LinguagemNome text-left">
                                    <div class="col-12">
                                        <strong>Java</strong><br />
                                        <small>Esses são os repositórios que se destacam para essa linguagem segundo o <b>GitHub</b>!</small>
                                    </div>
                                </div>
                                <div v-show="!Controles.Java" class="row px-2">
                                    <div class="col card text-justify m-2 LinguagemCartao" v-for="repo in Repos.Java">
                                        <div class="card-body">
                                            <h5 class="card-title">{{repo.name}}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-users"></i>&nbsp;&nbsp;{{repo.owner.login}}</h6>
                                            <p class="card-text">{{repo.description}}</p>
                                            <button type="button" class="btn btn-sm btn-dark" v-on:click="VerDetalhes(3, repo.id)">Detalhes</button>
                                            <a v-bind:href="repo.html_url" target="_blank" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title="Ver no GitHub">
                                                <i class="fas fa-code-branch"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="Controles.Java" class="row my-3">
                                    <div class="col-12 CarregandoCards">
                                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cards para JavaScript -->
                        <div v-show="PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-3 mb-4">
                                <div v-show="!Controles.JavaScript" class="row LinguagemNome text-left">
                                    <div class="col-12">
                                        <strong>JavaScript</strong><br />
                                        <small>Esses são os repositórios que se destacam para essa linguagem segundo o <b>GitHub</b>!</small>
                                    </div>
                                </div>
                                <div v-show="!Controles.JavaScript" class="row px-2">
                                    <div class="col card text-justify m-2 LinguagemCartao" v-for="repo in Repos.JavaScript">
                                        <div class="card-body">
                                            <h5 class="card-title">{{repo.name}}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-users"></i>&nbsp;&nbsp;{{repo.owner.login}}</h6>
                                            <p class="card-text">{{repo.description}}</p>
                                            <button type="button" class="btn btn-sm btn-dark" v-on:click="VerDetalhes(4, repo.id)">Detalhes</button>
                                            <a v-bind:href="repo.html_url" target="_blank" class="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Ver no GitHub">
                                                <i class="fas fa-code-branch"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="Controles.JavaScript" class="row my-3">
                                    <div class="col-12 CarregandoCards">
                                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cards para Python -->
                        <div v-show="PesquisaFeita" class="row my-5">
                            <div class="offset-1 col-10 ColunaAnimacao py-3">
                                <div v-show="!Controles.Python" class="row LinguagemNome text-left">
                                    <div class="col-12">
                                        <strong>Python</strong><br />
                                        <small>Esses são os repositórios que se destacam para essa linguagem segundo o <b>GitHub</b>!</small>
                                    </div>
                                </div>
                                <div v-show="!Controles.Python" class="row px-2">
                                    <div class="col card text-justify m-2 LinguagemCartao" v-for="repo in Repos.Python">
                                        <div class="card-body">
                                            <h5 class="card-title">{{repo.name}}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-users"></i>&nbsp;&nbsp;{{repo.owner.login}}</h6>
                                            <p class="card-text">{{repo.description}}</p>
                                            <button type="button" class="btn btn-sm btn-dark" v-on:click="VerDetalhes(5, repo.id)">Detalhes</button>
                                            <a v-bind:href="repo.html_url" target="_blank" class="btn btn-sm btn-warning" data-toggle="tooltip" data-placement="top" title="Ver no GitHub">
                                                <i class="fas fa-code-branch"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="Controles.Python" class="row my-3">
                                    <div class="col-12 CarregandoCards">
                                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div id="divModalFixa">
                            <div class="modal fade" id="mdRepoDetalhes" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <!-- Conteúdo da Modal -->
                                    <div class="modal-content text-left py-3 px-4">
                                        <div class="row my-3 ModalHead">
                                            <div class="col-12 text-center">
                                                <strong>{{RepoDetalhe.name}}</strong><br />
                                                <small class="text-secondary">#{{RepoDetalhe.id}}</small>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-12">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-id-badge"></i>&nbsp;&nbsp;Full Name</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.full_name}}</p>
                                            </div>                                            
                                        </div>
                                        <div class="row my-3">
                                            <div class="col-4">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-utensils"></i>&nbsp;&nbsp;Forks</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.forks}}</p>
                                            </div>
                                            <div class="col-4">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Issues</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.open_issues}}</p>
                                            </div>
                                            <div class="col-4">
                                                <label class="text-warning">
                                                    <b><i class="fas fa-star"></i>&nbsp;&nbsp;Stars</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.stargazers_count}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-12">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-book-open"></i>&nbsp;&nbsp;Description</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.description}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-3">
                                            <div class="col-4">
                                                <label class="text-danger">
                                                    <b><i class="far fa-calendar-plus"></i>&nbsp;&nbsp;Created</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.created_at}}</p>
                                            </div>
                                            <div class="col-4">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-wrench"></i>&nbsp;&nbsp;Updated</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.updated_at}}</p>
                                            </div>
                                            <div class="col-4">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-arrow-circle-up"></i>&nbsp;&nbsp;Pushed</b>
                                                </label>
                                                <p class="InfoModal">{{RepoDetalhe.pushed_at}}</p>
                                            </div>
                                        </div>
                                        <div v-if="RepoDetalhe.owner != null" class="row my-2">
                                            <div class="col-12">
                                                <label class="text-danger">
                                                    <b><i class="fas fa-users"></i>&nbsp;&nbsp;Owner</b>
                                                </label>
                                            </div>
                                            <div class="col-12">
                                                <img class="img-thumbnail" v-bind:src="RepoDetalhe.owner.avatar_url" v-bind:alt="RepoDetalhe.owner.login" width="50" />
                                                <span class="mx-3 InfoModal"><strong class="text-secondary">{{RepoDetalhe.owner.type}}:</strong>&nbsp;{{RepoDetalhe.owner.login}}</span>
                                            </div>
                                        </div>
                                        <!-- Botões da Modal -->
                                        <div v-if="RepoDetalhe.owner != null" class="row my-2 text-right">
                                            <div class="col-12">
                                                <a class="btn btn-dark" v-bind:href="RepoDetalhe.owner.html_url" target="_blank" data-toggle="tooltip" data-placement="top" title="Ver Perfil">
                                                    <i class="fas fa-users"></i>
                                                </a>
                                                <a class="btn btn-dark" v-bind:href="RepoDetalhe.html_url" target="_blank" data-toggle="tooltip" data-placement="top" title="Ver Repositório">
                                                    <i class="fas fa-code-branch"></i>
                                                </a>
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Sair</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Desenvolvedor -->
                    <div class="col-12 col-lg-4 text-center">
                        <div class="row my-3">
                            <div class="col-12">
                                <strong>Desenvolvido por:</strong>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="LI-profile-badge" data-version="v1" data-size="medium" data-locale="pt_BR" data-type="vertical" data-theme="light" data-vanity="adrianofcosta">
                                    <a class="LI-simple-link" href='https://br.linkedin.com/in/adrianofcosta?trk=profile-badge' target="_blank">Adriano Fonseca da Costa&nbsp;&nbsp;<i class="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="row my-3 mb-5">
                            <div class="col-12">
                                <small>Dá uma olhada no meu perfil!&nbsp;&nbsp;<i class="fas fa-hand-point-up"></i></small>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <!-- Footer -->
            <footer class="mastfoot text-center p-3 fixed-bottom">
                <div class="inner">
                    <span>Esse projeto está disponível no <a href="https://github.com/DracoFC/AteliwareChallenge" target="_blank" class="btn-link">GitHub <i class="fas fa-code-branch"></i></a>.</span>
                </div>
            </footer>
        </form>
    </div>
    <!-- Footer Scripts -->
    <div>
        <script type="text/javascript" src="<%=ResolveClientUrl("Scripts/Index.js?v=1") %>"></script>
    </div>
</body>
</html>
