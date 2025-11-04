# TC-001 — Login com credenciais válidas

Metadata
- ID: TC-001
- Versão: 1.0
- Autor: gabrielterciotti
- Data: 2025-11-04
- Status: ready
- Área/Funcionalidade: Autenticação
- Prioridade: alta
- Tipo: manual
- Vinculado a: https://github.com/gabrielterciotti/Projeto-Portifolio-Pessoal_01/issues/1

Pré-condições
- Usuário de teste `testuser@example.com` criado.
- Ambiente: staging.

Dados de Teste
- Email: testuser@example.com
- Senha: Senha123!

Passos
1. Acessar a página de login.
2. Inserir email e senha.
3. Clicar em "Entrar".

Resultado Esperado
- Usuário autenticado e redirecionado para `/dashboard`.
- Nome do usuário exibido no cabeçalho.

Critério de Aceitação
- Autenticação bem-sucedida sem erros e sessão iniciada.

Evidências
- ./evidences/TC-001-screenshot-login-success.png

Histórico de Execuções
- 2025-11-04 — @gabrielterciotti — passed — Execução inicial manual
