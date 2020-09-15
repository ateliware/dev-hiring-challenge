export default {
  create(item) {
    console.log(item);
    return true;
  },

  read(linguagem) {
    console.log(linguagem);
    return [
      {
        nome: "Teste 01",
        proprietario: "Aron",
        descricao: "Teste 01",
        url: "https://github.com/CyC2018/CS-Notes",
        linguagem: "Java",
        forks: 36150,
        issues: 66,
        estrelas: 110716,
        seguidores: 110716,
        privado: false,
      },
      {
        nome: "Teste 02",
        proprietario: "ARichter",
        descricao: ":Teste 02",
        url: "https://github.com/CyC2018/CS-Notes",
        linguagem: "Java",
        forks: 36150,
        issues: 66,
        estrelas: 110716,
        seguidores: 110716,
        privado: false,
      },
      {
        nome: "Teste 03",
        proprietario: "ARich",
        descricao: "Teste 03",
        url: "https://github.com/CyC2018/CS-Notes",
        linguagem: "Java",
        forks: 36150,
        issues: 66,
        estrelas: 110716,
        seguidores: 110716,
        privado: false,
      }
    ];
  }, 
}