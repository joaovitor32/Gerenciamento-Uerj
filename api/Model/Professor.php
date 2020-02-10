<?php
    class Professor{
        private $codProfessor;
        private $nome;
        private $grandeArea;
        private $codCurso;
        //Sets
        public function setCodProfessor($codProfessor){
            $this->codProfessor=$codProfessor;
        }
        public function setNome($nome){
            $this->nome=$nome;
        }
        public function setGrandeArea($grandeArea){
            $this->grandeArea=$grandeArea;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }
        //Gets
        public function getNome(){
            return $this->nome;
        }
        public function getGrandeArea(){
            return $this->grandeArea;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }

        public function listaProfessores(){
            try{
                include 'Database.php';
                $sqlSelect='SELECT * FROM professor';
                $conexao->exec('SET NAMES utf8');
                $stmtProfessor=$conexao->prepare($sqlSelect);
    
                
                if($stmtProfessor->execute()){
                    
                    $professores=$stmtProfessor->fetchALL(PDO::FETCH_ASSOC);
                    http_response_code(200);
                    return $professores;
    
                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function listaProfessoresJSON(){
            echo json_encode($this->listaProfessores());
        }
        public function listaProfessoresByCurso(){
            try{
                include 'Database.php';
                $sqlSelect='SELECT * FROM professor AS pr INNER JOIN cursoprofessor AS cp ON cp.codProfessor=pr.codProfessor WHERE cp.codCurso=?';
                $conexao->exec('SET NAMES utf8');
                $stmtProfessor=$conexao->prepare($sqlSelect);
                $stmtProfessor->bindParam(1,$this->codCurso);
                $stmtProfessor->execute();
    
                
                if($stmtProfessor->execute()){

                    http_response_code(200);
                    $professores=$stmtProfessor->fetchALL(PDO::FETCH_ASSOC);
                    return $professores;
    
                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function listaProfessoresJSONByCurso(){
            echo json_encode($this->listaProfessoresByCurso());
        }
        public function objectProfessor(){
            try{
                include 'Database.php';
                $sqlSelectProfessor="SELECT * FROM professor WHERE codProfessor=?";
                $conexao->exec('SET NAMES utf8');
                $stmtProfessor=$conexao->prepare($sqlSelectProfessor);
                $stmtProfessor->bindParam(1,$this->codProfessor);
                $stmtProfessor->execute();
                $professor=$stmtProfessor->fetch(PDO::FETCH_ASSOC);
                http_response_code(200);
                echo json_encode($professor);

   
                if($stmtProfessor->execute()){
                    
                    $professor=$stmtProfessor->fetch(PDO::FETCH_ASSOC);
                    http_response_code(200);
                    echo json_encode($professor);

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function updateProfessor(){
            try{
                include 'Database.php';
                $sqlUpdateProfessor="UPDATE professor SET nome = ? , grandeArea =? WHERE codProfessor=?";
                $conexao->beginTransaction();
                $conexao->exec('SET NAMES utf8');
                $stmtUpdateProfessor=$conexao->prepare($sqlUpdateProfessor);
                $stmtUpdateProfessor->bindParam(1,$this->nome);
                $stmtUpdateProfessor->bindParam(2,$this->grandeArea);
                $stmtUpdateProfessor->bindParam(3,$this->codProfessor);
                
                if($stmtUpdateProfessor->execute()){
                    
                    $conexao->commit();
                    http_response_code(200);
                    return;

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                $conexao->rollback();
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function cadastroProfessor(){
            try{
                include 'Database.php';
                $sqlCadProfessor="INSERT INTO professor(nome,grandeArea) VALUES (?,?)";
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $stmtCadProfessor=$conexao->prepare($sqlCadProfessor);
                $stmtCadProfessor->bindParam(1,$this->nome);
                $stmtCadProfessor->bindParam(2,$this->grandeArea);
                
                if($stmtCadProfessor->execute()){
                    
                    $conexao->commit();
                    http_response_code(202);
                    return;

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                $conexao->rollback();
                echo "Erro: ".$e->getMessage();
                http_response_code(500);               
                return;
            }
        }
        public function LastID(){
            try{
                include 'Database.php';
                $sqlLastId="SELECT codProfessor FROM professor WHERE codProfessor=(SELECT MAX(codProfessor) FROM professor)";
                $stmtLastID=$conexao->prepare($sqlLastId);
                $stmtLastID->execute();
                $dado=$stmtLastID->fetch(PDO::FETCH_ASSOC);
                return $dado['codProfessor'];
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function deleteProfessor(){
            try{
                include 'Database.php';
                $sqlDeleteProfessor="DELETE FROM professor WHERE codProfessor=?";
                $stmtDeleteProfessor=$conexao->prepare($sqlDeleteProfessor);
                $stmtDeleteProfessor->bindParam(1,$this->codProfessor);

                if($stmtDeleteProfessor->execute()){
                    

                    http_response_code(200);
                    return;

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                $conexao->rollback(); 
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
       /* public function getListaTurmasProfessor(){
            try{

                include 'Database.php';
                $sqlTurmasProfessor="SELECT * FROM professor AS pr INNER JOIN turma AS tu ON tu.codProfessor=pr.codProfessor INNER JOIN disciplina AS di ON di.codDisciplina=tu.codDisciplina INNER JOIN cursoprofessor AS cp ON cp.codProfessor=pr.codProfessor WHERE cp.codCurso=?";
                $conexao->exec('SET NAMES utf8');
                $stmtTurmasProfessor=$conexao->prepare($sqlTurmasProfessor);
                $stmtTurmasProfessor->bindParam(1,$this->codCurso);
                $stmtTurmasProfessor->execute();
                $turmasProfessor=$stmtTurmasProfessor->fetchALL(PDO::FETCH_ASSOC);
                echo json_encode($turmasProfessor);

            }catch(PDOException $e){
                echo 'Erro: '.$e->getMessage();
            }
        }*/   
    }  
?>