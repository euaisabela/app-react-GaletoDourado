Galeto Dourado - Dashboard Interno para Restaurante
O Galeto Dourado é um aplicativo desenvolvido para o uso interno de um restaurante, facilitando o gerenciamento de pedidos, pagamentos e relatórios diretamente em um painel administrativo acessível em dispositivos móveis e desktops.

📋 Funcionalidades
Autenticação de Usuário: Página de login para controle de acesso.
Gerenciamento de Pedidos: Exibe lista de pedidos realizados e detalhes, como data, valor total e status.
Relatório de Vendas e Pagamentos: Geração de relatórios para visualização semanal e mensal das vendas.
Exportação de Relatórios em PDF: Opção de exportar dados em PDF.
Envio para WhatsApp: Envio rápido de relatórios diretamente para o WhatsApp.
Visualização Gráfica: Gráficos para acompanhamento de dados de vendas.
Customização para Mobile: Interface responsiva adaptada para uso em dispositivos móveis.


🚀 Tecnologias Utilizadas
Frontend: React com Material-UI para estilização
Backend: Node.js com Express
Banco de Dados: MongoDB (MongoDB Atlas) para armazenamento de dados

![image](https://github.com/user-attachments/assets/238f88e1-605f-4e96-9282-7a91aa17bbdf)
![image](https://github.com/user-attachments/assets/4d4cdbf6-fca0-4bdf-9f78-1946ebdce21d)

Gerador de PDF: jsPDF para exportação de relatórios
Gráficos: ApexCharts para exibir dados de pedidos por dia da semana
📂 Estrutura do Projeto
plaintext
Copiar código
├── src
│   ├── components
│   │   ├── Dashboard.js
│   ├── styles
│   │   └── Dashboard.css
├── public
│   ├── index.html
├── server
│   ├── index.js         # Configuração e rotas do servidor com Node.js e Express
├── README.md
🛠️ Como Executar o Projeto
Clonar o repositório:

bash
Copiar código
git clone <URL_DO_REPOSITORIO>
cd GaletoDourado
Instalar dependências (Frontend e Backend):

bash
Copiar código
# No diretório raiz
npm install
cd server
npm install
Configurar o MongoDB:

No arquivo .env, insira sua string de conexão com o MongoDB Atlas:
makefile
Copiar código
MONGO_URI=sua_string_de_conexao
Executar o Backend:

bash
Copiar código
cd server
npm start
Executar o Frontend:

bash
Copiar código
cd ..
npm start
Acessar o aplicativo: Abra o navegador e acesse http://localhost:3000.

📊 Dados do Banco de Dados
Coleções principais:

Pedidos: Armazena informações sobre pedidos, incluindo data, valor total e status.
Pagamentos: Armazena registros de pagamentos, como valor, método e data.
Atributos comuns:

Pedidos:
data: Data do pedido
total: Valor total do pedido
status: Status do pedido (ex.: "Em andamento", "Concluído")
Pagamentos:
valor: Valor pago
metodo: Método de pagamento (ex.: "Dinheiro", "Cartão")
data: Data do pagamento



