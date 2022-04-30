%{
  configs: [
    %{
      name: "default",
      files: %{
        included: ~w{config lib test}
      },
      strict: true,
      color: true,
      checks: [
        # https://hexdocs.pm/credo/1.4.0/config_file.html
        {Credo.Check.Readability.ModuleDoc, false},
        {Credo.Check.Readability.MaxLineLength, max_length: 100},
        {Credo.Check.Consistency.TabsOrSpaces},
        {Credo.Check.Readability.MaxLineLength, priority: :low, max_length: 100},
        {Credo.Check.Design.TagTODO, exit_status: 2},
        {Credo.Check.Refactor.MapInto, false},
        {Credo.Check.Warning.LazyLogging, false}
      ]
    }
  ]
}
