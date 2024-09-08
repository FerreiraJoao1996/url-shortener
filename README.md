<!-- NECESSÁRIOS -->

banco de dados (
    usuarios,
    url (
      caso seja um usuário autenticado, o sistema deve registrar que o URL pertence ao usuário,
      contabilizar a quantidade de cliques quando o usuario listar,
      todos os registros devem ter uma forma de saber quando foram atualizados,
      na deleção deve ter um campo para guardar,
      contabilizar quando o endpoint for clicado
    )
)

Definir o que deve e não deve ser variável de ambiente..

endpoint de autenticação - jwt (deve retornar um token bearer)

1 endpoint para encurtar o url incluindo o domínio ( ele seja encurtado para no máximo 6 caracteres)

CRUD completo para usuario autenticado e sendo dele

README explicando como rodar o projeto.


<!-- DIFERENCIAIS -->

Testes unitários

API está documentada com OPEN API ou Swagger

validator - Ter validação de entrada em todos os lugares necessários.

logs

Utilizar changelog com a realidade do seu desenvolvimento

Código tolerante a falhas.