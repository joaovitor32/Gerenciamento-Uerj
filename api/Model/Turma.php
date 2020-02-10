<?php
    class Turma{

        private $codTurma;
        private $codProfessor;
        private $codDisciplina;
        private $periodo;
        private $codCurso;

        //GETS
        public function getCodTurma(){
            return $this->codTurma;
        }
        public function getCodProfessor(){
            return $this->codProfessor;
        }
        public function getCodDisciplina(){
            return $this->codDisciplina;
        }
        public function getPeriodo(){
            return $this->periodo;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }
        //SETS
        public function setCodTurma($codTurma){
            $this->codTurma=$codTurma;
        }
        public function setCodProfessor($codProfessor){
            $this->codProfessor=$codProfessor;
        }
        public function setCodDisciplina($codDisciplina){
            $this->codDisciplina=$codDisciplina;
        }
        public function setPeriodo($periodo){
            $this->periodo=$periodo;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }
        public function checkProfessorTurma(){
            try{
                include 'Database.php';
                $sqlCheck="SELECT * FROM turma WHERE codProfessor=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCheck=$conexao->prepare($sqlCheck);
                $stmtCheck->bindParam(1,$this->codProfessor);
                $stmtCheck->execute();
                $check=$stmtCheck->fetch(PDO::FETCH_ASSOC);
                if($check==0){
                    return true;
                }else{
                    return false;
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function checkDisciplinaTurma(){
            try{

                include 'Database.php';
                $sqlCheck="SELECT * FROM turma WHERE codDisciplina=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCheck=$conexao->prepare($sqlCheck);
                $stmtCheck->bindParam(1,$this->codDisciplina);
                $stmtCheck->execute();
                $check=$stmtCheck->fetch(PDO::FETCH_ASSOC);
                if($check==0){
                    return true;
                }else{
                    return false;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function getTurmas(){
            try{

                include 'Database.php';
                $sqlGetTurmas="SELECT * FROM turma AS tu INNER JOIN disciplina AS di ON di.codDisciplina=tu.codDisciplina INNER JOIN professor AS pr ON pr.codProfessor=tu.codProfessor WHERE di.codCurso=?";  
                $conexao->exec('SET NAMES utf8');
                $stmtGetTurmas=$conexao->prepare($sqlGetTurmas);
                $stmtGetTurmas->bindParam(1,$this->codCurso);
        
                if($stmtGetTurmas->execute()){
                    
                    http_response_code(200);
                    $turmas=$stmtGetTurmas->fetchALL(PDO::FETCH_ASSOC);
                    echo json_encode($turmas);

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function deleteTurma(){
            try{
                include 'Database.php';
                $sqlDeleteTurma="DELETE FROM turma WHERE codTurma=?";
                $stmtDeleteTurma=$conexao->prepare($sqlDeleteTurma);
                $stmtDeleteTurma->bindParam(1,$this->codTurma);
                $stmtDeleteTurma->execute();
    
                if($stmtDeleteTurma->execute()){
                    
                    http_response_code(200);
                    return;

                }else{
                    http_response_code(400);
                    return;
                }


            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function checkExistence(){
            try{    
                include "Database.php";
                $sqlCheckExistence="SELECT * FROM turma WHERE codProfessor=? AND codDisciplina=? AND periodo=?";
                $conexao->exec("SET NAMES utf8");
                $stmtCheckExistence=$conexao->prepare($sqlCheckExistence);
                $stmtCheckExistence->bindParam(1,$this->codProfessor);
                $stmtCheckExistence->bindParam(2,$this->codDisciplina);
                $stmtCheckExistence->bindParam(3,$this->periodo);
                $stmtCheckExistence->execute();
                $check=$stmtCheckExistence->fetch(PDO::FETCH_ASSOC);
                if($check==0){
                    return true;
                }else{
                    return false;
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function createTurma(){
            try{
                include "Database.php";
                $sqlInsertTurma="INSERT INTO turma(codProfessor,codDisciplina,periodo) VALUES(?,?,?)";
                $conexao->beginTransaction();
                $stmtInsertTurma=$conexao->prepare($sqlInsertTurma);
                $stmtInsertTurma->bindParam(1,$this->codProfessor);
                $stmtInsertTurma->bindParam(2,$this->codDisciplina);
                $stmtInsertTurma->bindParam(3,$this->periodo);     
                
                if($stmtInsertTurma->execute()){
                    
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
    }
?>