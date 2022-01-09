%{
  configs: [
    %{
      name: "default",
      files: %{
        included: ["lib/", "src/", "web/", "apps/"],
        excluded: ["deps/"]
      },
      plugins: [],
      requires: [],
      strict: false,
      parse_timeout: 5000,
      color: true,
      checks: [
        {Credo.Check.Design.DuplicatedCode},
        {Credo.Check.Readability.FunctionNames},
        {Credo.Check.Warning.MapGetUnsafePass},
        {Credo.Check.Design.TagTODO, false},
        {Credo.Check.Warning.OperationOnSameValues, priority: :normal}
      ]
    }
  ]
}
