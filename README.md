## File Exporter V1

## Descrição

Programa desenvolvido com o intuito de receber um arquivo base com informações de retorno referentes a cliente, telefones, hora de envio e mensagem, o programa verifica e valida as informações de acordo com as regras de negócio estabelecidas e retorna um arquivo delimitado na pasta result_files.

## Regras

* mensagens com telefone inválido deverão ser bloqueadas(DDD+NUMERO);
* mensagens que estão na _blacklist_ deverão ser bloqueadas; _(ver blacklist)_
* mensagens para o estado de São Paulo deverão ser bloqueadas;
* mensagens com agendamento após as 19:59:59 deverão ser bloqueadas;
* as mensagens com mais de 140 caracteres deverão ser bloqueadas;
* caso possua mais de uma mensagem para o mesmo destino, apenas a mensagem apta com o menor horário deve ser considerada;
* o id_broker será definido conforme a operadora; _(ver broker x operadora)_

### Número de telefone celular válido

```
 DDD + CELULAR
```
* DDD com 2 digitos;
* DDD deve ser válido;
* número celular deve conter 9 dígitos;
* numero celular deve começar com 9;
* o segundo dígito deve ser > 6;

Exemplos:

* 41987563653 - ok
* **00**987563653 - nok
* 419**2**7563653 - nok
* 41**8**87563653 - nok

### Broker de envio

Cada broker será responsável pelo envio de algumas operadoras, representado pela tabela abaixo:

| ID_BROKER | OPERADORAS |
|-----------|------------|
|   1       |  VIVO, TIM |
|   2       |  CLARO, OI |
|   3       |  NEXTEL    |


## Tecnologias

O projeto utilizou:

- [Node.js][nodejs]


### Dependências
* Libs
   * axios
   * chokidar
   * mysql2
   * nodemon
   * sequelize
   * express
* SO
   * Windows 10
* IDE
   * Visual Studio Code

### Instalação

* Clone o repositório
* Tenha certeza que possui uma instância de Mysql rodando em sua máquina.
   * É necessário criar uma base com o nome teste_dev_db e senha 12345678 logue com o usuário root.
   * OBS: só é necessário criar essa base de dados caso não queira modificar a conexão com o banco de dados,
     caso queira modificar a conexão de dados a mesma se encontra na raiz do projeto teste-dev\database\database.js
     
configuração padrão da conexão com o banco de dados:
```
const Sequelize = require('sequelize');
   const connection = new Sequelize('teste_dev_db', 'root', '12345678', {
       host:'127.0.0.1',
       dialect:'mysql',
       timezone: "-03:00"
});

module.exports = connection;
```





### Executando o programa

* Abra a pasta do projeto com sua IDE e na raiz digite na linha de comando.
```
# Instala dependências
npm install package.json

# Executar programa
node .\app.json
```




### Como testar
* 1° Execute o programa
* 2° crie um arquivo em qualquer pasta do seu computador com o nome nome_arquivo_valido_yyyyMMdd.csv e copie os dados do exemplo abaixo:

```
bff58d7b-8b4a-456a-b852-5a3e000c0e63;12;996958849;NEXTEL;21:24:03;Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
bff58d7b-8b4a-456a-b852-5a3e000c0e61;41;995390841;NEXTEL;15:24:03;It has survived not only five centuries
bff58d7b-8b4a-456a-b852-5a3e000c0e61;41;995390841;NEXTEL;20:24:03;but also the leap into electronic typesetting, remaining essentially unchanged
b7e2af69-ce52-4812-adf1-395c8875ad30;46;950816645;CLARO;19:05:21;and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
e7b87f43-9aa8-414b-9cec-f28e653ac25e;34;990171682;VIVO;18:35:20;Contrary to popular belief, Lorem Ipsum is not simply random text
c04096fe-2878-4485-886b-4a68a259bac5;43;940513739;NEXTEL;14:54:16;It has roots in a piece of classical Latin literature from 45 BC
d81b2696-8b62-4b8b-af82-586ce0875ebc;21;983522711;TIM;16:42:48;There are many variations of passages of Lorem Ipsum available
d81b2696-8b62-4b8b-af82-586ce0875ebc;22;993522711;VIVO FIBRA;16:42:48;but the majority have suffered alteration in some form
d81b2611-aacv-4b8b-af82-586ce0875ebc;24;986722083;TIM;16:42:48;If you are going to use a passage of Lorem Ipsum
dd71b245-aacv-4b8b-af82-586ce0875ebc;74;997899222;TIM;16:42:48;combined with a handful of model sentence structures
```
* 2° Recorte ou copie esse arquivo do seu diretorio atual para dentro do projeto na pasta teste-dev\files.
* 3° O Comportamento padrão será a leitura do arquivo e gravação das suas linhas no banco de dados.
* 4° Após a gravação dos dados o mesmo irá consultar um validator interno e uma blacklist via API para.
     criar um arquivo de retorno apenas com os dados válidos dentro da pasta teste-dev\result_files.
* OBS: no arquivo exemplo apenas alguns registros serão gravados porque os outros caem nas regras de exclusão.
* 5° Dentro do arquivo de retorno você terá dados formatados no seguinte padrão:
```
e7b87f43-9aa8-414b-9cec-f28e653ac25e;1
d81b2696-8b62-4b8b-af82-586ce0875ebc;1
```
* 6° caso o nome do arquivo esteja fora do padrão o mesmo será movido para teste-dev\invalid_files.
* 7° caso o nome do arquivo esteja dentro do homologado após sua gravação o mesmo será movido para teste-dev\processed_files.

