import 'package:flutter/material.dart';
import 'package:hiring_app/dao/database.dart';
import 'package:hiring_app/models/repository.dart';

class DialogRepository extends StatefulWidget {
  final Repository repository;

  DialogRepository({this.repository});

  @override
  _DialogRepositoryState createState() => _DialogRepositoryState();
}

class _DialogRepositoryState extends State<DialogRepository> {
  final _banco = Banco.get();
  List<Repository> _listRepositories = new List();

  final _nameController = TextEditingController();
  final _avatarController = TextEditingController();
  final _languageController = TextEditingController();
  final _starsController = TextEditingController();
  final _descriptionController = TextEditingController();

  Repository _repositoryAtual = Repository();

  @override
  void initState() {
    super.initState();

    if (widget.repository != null) {
      _repositoryAtual = widget.repository;
    }

    //método para salvar no banco
    void _insertRepository(Repository repository) async {
      _banco.insert(repository);
    }

    _nameController.text = _repositoryAtual.name;
    _avatarController.text = _repositoryAtual.avatar;
    _languageController.text = _repositoryAtual.language;
    _starsController.text = _repositoryAtual.stars.toString();
    _descriptionController.text = _repositoryAtual.description;
  }

  @override
  void dispose() {
    super.dispose();
    _nameController.clear();
    _avatarController.clear();
    _languageController.clear();
    _starsController.clear();
    _descriptionController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text("Detalhes"),
      content: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Card(
              color: Colors.white,
              clipBehavior: Clip.antiAlias,
              child: AspectRatio(
                aspectRatio: 18 / 13,
                child: Image.network(_repositoryAtual.avatar),
              ),
            ),
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: "Nome",
              ),
              autofocus: true,
              readOnly: true,
            ),
            TextField(
              controller: _languageController,
              decoration: InputDecoration(labelText: "Linguagem:"),
              autofocus: true,
              readOnly: true,
            ),
            TextField(
              controller: _starsController,
              decoration: InputDecoration(labelText: "Stars:"),
              autofocus: false,
              readOnly: true,
            ),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(
                hintText: '',
                labelText: 'Caracteristicas:',
              ),
              autofocus: false,
              readOnly: true,
              maxLines: 5,
              scrollPadding: EdgeInsets.all(10.0),
            ),
          ],
        ),
      ),
      actions: <Widget>[
        FlatButton(
          child: Text('Voltar', style: TextStyle(color: Colors.white)),
          color: Colors.red[900],
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        FlatButton(
          child: Text('Salvar', style: TextStyle(color: Colors.white)),
          color: Colors.green[900],
          onPressed: () {
            Navigator.of(context).pop(_repositoryAtual);
          },
        ),
      ],
    );
  }
}
