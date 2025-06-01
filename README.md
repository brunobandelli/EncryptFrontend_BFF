  

# **Descrição**

Este projeto é o frontend desenvolvido com Vite para consumir a API do Backend For Frontend (BFF),

Para seu funcionamento o ideal eh clonar os dois repositorios.

  

backend repositorio:


[BFF_BackendForFrontend](https://github.com/brunobandelli/BFF_BackendForFrontend)

  
# **Requisitos**

* Node.js LTS

* Backend rodando separadamente (em Docker Compose ou local) na porta 3000
  

## Como rodar

*Clone o repositório:*

git clone "url"

  

### **Para instalar as dependências:**


```bash

npm  install

```
  

### **Para rodar o frontend em modo desenvolvimento:**

  
```bash

npm  run  dev

```


O frontend ficará disponível provavelmente em:
>  ou na porta que o Vite escolher automaticamente, que aparecerá no terminal ao executar o projeto.

```
http://localhost:5173
```



# **Configuração**

O frontend está configurado para consumir o backend via variável de ambiente no arquivo `.env`:

  

```env

VITE_API_URL=http://localhost:3000

```


> **Importante:**

> O backend deve estar rodando na URL acima para que o frontend funcione corretamente. Caso o backend esteja em outro endereço ou porta, atualize esta variável.

  

# **Scripts úteis**


```bash

npm  run  dev  # Roda o frontend em modo desenvolvimento

npm  run  build  # Gera o build de produção na pasta /dist

npm  run  preview  # Roda o build local para preview

npm  run  lint  # Executa o linter para verificar o código

```


# **Dependências**


Este projeto depende diretamente do backend que está em outro repositório/projeto, o qual precisa estar ativo e acessível para que o frontend funcione sem erros.

