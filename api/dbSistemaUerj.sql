-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 12/11/2019 às 13:56
-- Versão do servidor: 10.1.39-MariaDB
-- Versão do PHP: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbSistemaUerj`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `codCurso` bigint(20) NOT NULL,
  `nome` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `codDisciplina` bigint(20) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `credito` int(11) NOT NULL,
  `ementa` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `codProfessor` bigint(20) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `grandeArea` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turma`
--

CREATE TABLE `turma` (
  `codTurma` bigint(20) NOT NULL,
  `codProfessor` bigint(20) NOT NULL,
  `codDisciplina` bigint(20) NOT NULL,
  `periodo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `codLogin` bigint(20) NOT NULL,
  `login1` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `matricula` bigint(20) NOT NULL,
  `dataNascimento` date NOT NULL,
  `nome` varchar(200) NOT NULL,
  `anodeentrada` date NOT NULL,
  `codCurso` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarioturma`
--

CREATE TABLE `usuarioturma` (
  `codLogin` bigint(20) NOT NULL,
  `codTurma` bigint(20) NOT NULL,
  `media` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`codCurso`);

--
-- Índices de tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`codDisciplina`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`codProfessor`);

--
-- Índices de tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`codTurma`),
  ADD KEY `codProfessor` (`codProfessor`),
  ADD KEY `codDisciplina` (`codDisciplina`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codLogin`),
  ADD KEY `codCurso` (`codCurso`);

--
-- Índices de tabela `usuarioturma`
--
ALTER TABLE `usuarioturma`
  ADD KEY `codLogin` (`codLogin`,`codTurma`),
  ADD KEY `codTurma` (`codTurma`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `codCurso` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `disciplina`
--
ALTER TABLE `disciplina`
  MODIFY `codDisciplina` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `codProfessor` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `codTurma` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codLogin` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `turma`
--
ALTER TABLE `turma`
  ADD CONSTRAINT `turma_ibfk_1` FOREIGN KEY (`codProfessor`) REFERENCES `professor` (`codProfessor`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`codCurso`) REFERENCES `curso` (`codCurso`);

--
-- Restrições para tabelas `usuarioturma`
--
ALTER TABLE `usuarioturma`
  ADD CONSTRAINT `usuarioturma_ibfk_1` FOREIGN KEY (`codLogin`) REFERENCES `usuario` (`codLogin`),
  ADD CONSTRAINT `usuarioturma_ibfk_2` FOREIGN KEY (`codTurma`) REFERENCES `turma` (`codTurma`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
