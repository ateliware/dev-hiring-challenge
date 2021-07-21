# Configurando projeto

Siga as instruções para executar applicativo localmente.

1. Fazer download do [flutter sdk](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_2.2.3-stable.zip)

2. Adicionar o caminho do flutter sdk as variáveis de ambiente

3. Fazer donwload e instalar [Android studio e Android sdk](https://developer.android.com/studio#downloads)

4. Fazer download e instalar [Java SE Development Kit](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html#license-lightbox)

5. Aceitar licensas do android

   `flutter doctor --android-licenses`

6. Criar uma AVD no Android studio

7. Executar o app nessa AVD

8. O Postgre do Docker não vai ser utilizado apenas criei por ser um requisito para do challenge



# Sobre o Desenvolvimento

Quando li no challenge as linguagens, lembrei da minha conversa com a recrutadora que mencionou sobre vocês não serem "apegados" a linguagens, então escolhi a opção outro e fiz o desafio utilizando Flutter (dart), para tanto, a utilização de bancos de dados relacionais se torna um pouco problemática visto que é necessário uma api rest para fazer a transação entre app e banco de dados. Devido o tempo limitado para o desenvolvimento seria inviável tal solução. Para resolver esse problema resolvi utilizar o Firebase como banco de dados. Espero não ser um problema.

Outras opções poderiam ser adotadas para o app, como load infinito e até um tutorial do aplicativo, porém limito novamente minhas escolhas em função do tempo.

## CI Utilizando Github Actions

Foi criado um teste automatizado para o widget do Drawer e para base do CI, após isso é possível implementar diversos tipos de testes para integração.


