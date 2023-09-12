# projetosM2-AdminEmpresas

Nesta atividade final do módulo 2, o objetivo era desenvolver uma aplicação para auxiliar proprietários de empresas e seus colaboradores a encontrar informações relevantes de acordo com seus níveis de acesso. Era necessário criar uma interface web para consumir uma fake API e exibir as informações na tela, prestando atenção na estética, mas priorizando a funcionalidade e fluidez do processo. Um ponto relevante da aplicação era simular um MVP de um aplicativo de gestão de RH com dois tipos de usuários: o usuário comum (funcionário) com acesso limitado a funcionalidades, e o usuário administrador responsável por gerenciar toda a aplicação.
O desafio principal era identificar cada usuário e determinar suas permissões na aplicação.
Foram criadas 4 páginas: 
# Página Inicial:
Exibir todas as empresas cadastradas e permitir filtrar por categoria. Deve também redirecionar ou criar os modais para que o usuário faça cadastro e/ou login.
# Página/modal de Cadastro:
Permitir a criação de novos usuários (não administradores). 
# Página/modal de Login:
Realizar o login e direcionar o usuário para sua respectiva área.
# Página do Usuário Comum:
Renderizar as informações do usuário, nome, email, empresa e departamento que trabalha e colegas de departamento.

Com o CRUD o administrador pode tanto criar, atualizar, listar quanto deletar usuários ou departamentos.
Proteção de rotas foi estabelecida, e autenticação com jsonwebtoken.

# Restrições:
Caso o login seja bem-sucedido:
Armazenar a resposta da requisição no localStorage.
Deverá redirecionar o usuário para a tela de dashboard correspondente.
Caso contrário, ou seja, a requisição seja inválida, deverá retornar um feedback para o usuário (uma mensagem de erro). 

A estilização foi usando CSS com maior responsividade, baseada num figma e usando a biblioteca Toastify para gerar as mensagens de sucesso ou erro na requisição do usuário.

# Tecnologias usadas: HTML5,JavaScript(ES6), CSS3 ,interação com backend através de APIs (Application Programming Interfaces).
