from django.db import migrations

from core.github.constants import LINGUAGENS


def inserir_linguagens(apps, schema_editor):
    Linguagem = apps.get_model("github", "Linguagem")

    for linguagem in LINGUAGENS:
        Linguagem.objects.create(nome=linguagem)


class Migration(migrations.Migration):
    dependencies = [
        ("github", "0002_alter_repositorio_descricao")
    ]

    operations = [
        migrations.RunPython(inserir_linguagens)
    ]
