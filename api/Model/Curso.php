<?php
    class Curso{
        private $codCurso;
        private $curso;

        //GETS
        public function getCodCurso(){
            return $this->codCurso;
        } 
        public function getCurso(){
            return $this->curso;
        }
        //SETS
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }
        public function setCurso($curso){
            $this->curso=$curso;
        }

        public function cursoJSON(){
            try{
                include 'Database.php';
                $sqlCurso="SELECT * FROM curso WHERE codCurso=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCurso=$conexao->prepare($sqlCurso);
                $stmtCurso->bindParam(1,$this->codCurso);
                if($stmtCurso->execute()){
                    $curso=$stmtCurso->fetch(PDO::FETCH_ASSOC);
                    http_response_code(200);
                    echo json_encode($curso);
                }else{
                    http_response_code(400);
                    return;
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function getAllCursos(){
            try{
                include 'Database.php';
                $sqlCursos="SELECT * FROM curso";
                $conexao->exec('SET NAMES utf8');
                $stmtCursos=$conexao->prepare($sqlCursos);
    
              if($stmtCursos->execute()){
                    $cursos=$stmtCursos->fetchALL(PDO::FETCH_ASSOC);
                    http_response_code(200);
                    echo json_encode($cursos);
    
                }else{
                    http_response_code(400);
                    return;
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function createCurso(){
            try{
                
                include "Database.php";
                $sqlCadastroCurso="INSERT INTO curso(curso) VALUES(?)";
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $stmtCadastroCurso=$conexao->prepare($sqlCadastroCurso);
                $stmtCadastroCurso->bindParam(1,$this->curso);
                $stmtCadastroCurso->execute();
                $conexao->commit();
                
                if($stmtCadastroCurso->execute()){
                    $cursos=$stmtCadastroCurso->fetchALL(PDO::FETCH_ASSOC);
                    http_response_code(202);
                    echo json_encode($cursos);
    
                }else{
                    http_response_code(400);
                    return;
                }

                return;
            }catch(PDOExcepion $e){
                $conexao->rollback();
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
    }
?>