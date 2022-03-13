-- Criar um banco de dados chamado projetos_api 

-- Criar a tabela projetos

create table projetos (
codigo serial not null primary key, 
nome varchar(50) not null, 
cidade varchar(40) not null, 
email varchar(40) not null);

-- inserir alguns registros
insert into projetos (nome, cidade, email) values ('LEO Clube', 'Passo Fundo', 'leoclube@gmail.com'), ('Projeto Transformação', 'Passo Fundo', 'projetotransformacao@gmail.com');
