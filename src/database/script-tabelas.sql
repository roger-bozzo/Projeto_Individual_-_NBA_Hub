CREATE DATABASE IF NOT EXISTS nba_hub;

USE nba_hub;

CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    criado_em DATETIME DEFAULT NOW()
);

CREATE TABLE quiz_pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pergunta VARCHAR(300) NOT NULL,
    opcao_a VARCHAR(150) NOT NULL,
    opcao_b VARCHAR(150) NOT NULL,
    opcao_c VARCHAR(150) NOT NULL,
    opcao_d VARCHAR(150) NOT NULL,
    resposta CHAR(1) NOT NULL,
    CHECK (resposta IN ('A', 'B', 'C', 'D'))
);

CREATE TABLE quiz_resultado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    acertos INT NOT NULL,
    total INT NOT NULL,
    feito_em DATETIME DEFAULT NOW(),
    CONSTRAINT fk_usuario_quiz_resultado FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE pesquisa_resposta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    time_favorito VARCHAR(100),
    jogador_favorito VARCHAR(100),
    respondido_em DATETIME DEFAULT NOW(),
    CONSTRAINT fk_usuario_pesquisa_resposta FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

INSERT INTO quiz_pergunta (pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta) VALUES
('Qual time ganhou mais títulos da NBA?', 'Los Angeles Lakers', 'Chicago Bulls', 'Boston Celtics', 'Golden State Warriors', 'C'),
('Quem é o maior pontuador da história da NBA?', 'Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Kareem Abdul-Jabbar', 'C'),
('Em que ano a NBA foi fundada?', '1946', '1952', '1956', '1962', 'A'),
('Qual jogador ficou famoso pelo apelido "Black Mamba"?', 'LeBron James', 'Kobe Bryant', 'Kevin Durant', 'Dwyane Wade', 'B'),
('Quantos times compõem a NBA atualmente?', '28', '30', '32', '29', 'B');

INSERT INTO quiz_pergunta (pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta) VALUES
('Qual jogador possui o maior número de MVPs?', 'Kareem Abdul Jabbar', 'Michael Jordan', 'Tim Duncan', 'Lebron James', 'A'),
('Em qual cidade foi fundada a franquia Lakers?', 'Los Angeles', 'St. Louis', 'Las Vegas', 'Minneapolis', 'D'),
('Em que ano ocorreu a fusão da NBA com a ABA?', '1966', '1976', '1978', '1982', 'B'),
('Em qual posição do draft de 1983, o jogador Michael Jordan foi escolhido?', '1ª', '2ª', '3ª', '4ª', 'C'),
('Qual é a única equipe da NBA que não está situada nos Estados Unidos?', 'Grizzlies', 'Magic', 'Pelicans', 'Raptors', 'D');

SELECT * FROM usuario;

SELECT * FROM quiz_resultado;

SELECT* FROM pesquisa_resposta;

SELECT u.nome AS Usuário,
q.acertos AS Quiz_Acertos,
q.total AS Quiz_Total,
p.time_favorito AS Time_Favorito,
p.jogador_favorito AS Jogador_Favorito
FROM usuario u
JOIN quiz_resultado q ON u.id = q.fk_usuario
JOIN pesquisa_resposta p ON u.id = p.fk_usuario;

