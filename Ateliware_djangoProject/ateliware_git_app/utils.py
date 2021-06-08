from .models import TbLanguages


def register_languages():
    """
    This function registers some allowed linguages (chosen by author) into TbLanguages,
    if they aren´t yet.
    """
    languages = ['Python', 'Java', 'JavaScript', 'C#', 'C', 'C++', 'PHP', 'R', 'Objective-C', 'Swift', 'TypeScript',
                 'MATLAB', 'Kotlin', 'Go (Golang)',	'VBA', 'Ruby', 'Scala', 'Visual Basic',	'Rust',	'Dart', 'Ada',
                 'Lua', 'Abap', 'Groovy', 'Perl', 'Cobol', 'Julia',	'Haskell', 'Delphi', 'Elm', 'PowerShell', 'SQL',
                 'Clojure', 'Elixir', 'Pascal', 'LISP', 'Ballerina', 'FORTRAN', 'BASIC', 'Alice', 'COBOL', 'Speakeasy',
                 'Simula', 'Smalltalk',	'Prolog', 'Erlang',	'Eiffel', 'Rebol', 'Scratch', 'MicroPython', 'Flutter']
    for lang in languages:
        if not(TbLanguages.objects.filter(language=lang)):
            TbLanguages(language=lang).save()

