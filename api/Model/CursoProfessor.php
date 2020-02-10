<?php
    class CursoProfessor{

        private $codProfessor;
        private $codCurso;

        //GETS
        public function getCodProfessor(){
            return $this->codProfessor;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }
        //SETS
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }
        public function setCodProfessor($codProfessor){
            $this->codProfessor=$codProfessor;
        }

        public function createCursoProfessor(){
            try{
                include 'Database.php';
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $sqlInsertCursoProfessor="INSERT INTO cursoprofessor (codProfessor,codCurso) VALUES (?,?)";
                $stmtInsertCursoProfessor=$conexao->prepare($sqlInsertCursoProfessor);
                $stmtInsertCursoProfessor->bindParam(1,$this->codProfessor);
                $stmtInsertCursoProfessor->bindParam(2,$this->codCurso);
                if($stmtInsertCursoProfessor->execute()){
                    $conexao->commit();
                    http_response_code(202);
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
        public function eraseConnectionProfessorCurso(){
            try{    
                include "Database.php";
                $sqltDeleteCursoProfessor="DELETE FROM cursoprofessor WHERE codCurso=? AND codProfessor=?";
                $stmtDeleteCursoProfessor=$conexao->prepare($sqltDeleteCursoProfessor);
                $stmtDeleteCursoProfessor->bindParam(1,$this->codCurso);
                $stmtDeleteCursoProfessor->bindParam(2,$this->codProfessor);
                if($stmtDeleteCursoProfessor->execute()){
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
    }
?>