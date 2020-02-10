<?php
    class Provas{

        private $codProva;
        private $start;
        private $title;
        private $codTurma;
        private $codCurso;

        //GETS
        public function getCodProva(){
            return $this->codProva;
        }
        public function getStart(){
            return $this->start;
        }
        public function getTitle(){
            return $this->title;
        }
        public function getCodTurma(){
            return $this->codTurma;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }
        //SETS
        public function setCodProvas($codProva){
            $this->codProva=$codProva;
        }
        public function setStart($start){
            $this->start=$start;
        }
        public function setTitle($title){
            $this->title=$title;
        }
        public function setCodTurma($codTurma){
            $this->codTurma=$codTurma;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }

        public function createProva(){
            try{
                include "Database.php";
                $sqlInsertProva="INSERT INTO provas(`start`,title,codTurma) VALUES(?,?,?)";
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $stmtInsertProva=$conexao->prepare($sqlInsertProva);
                $stmtInsertProva->bindParam(1,$this->start);
                $stmtInsertProva->bindParam(2,$this->title);
                $stmtInsertProva->bindParam(3,$this->codTurma);
                $stmtInsertProva->execute();
                $conexao->commit();
                return;

                if($stmtInsertProva->execute()){
                    
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
        public function getProvas(){
            try{

                include "Database.php";
                $conexao->exec("SET NAMES utf8");
                $sqlSelectProvas="SELECT DISTINCT * FROM provas AS pr 
                INNER JOIN turma AS tu ON pr.codTurma=tu.codTurma
                INNER JOIN disciplina AS disc ON disc.codDisciplina=tu.codDisciplina
                INNER JOIN curso AS cu ON cu.codCurso=disc.codCurso
                WHERE cu.codCurso=?";
                $stmtSelectProvas=$conexao->prepare($sqlSelectProvas);
                $stmtSelectProvas->bindParam(1,$this->codCurso);

                if($stmtSelectProvas->execute()){
                    
                    http_response_code(200);
                    $provas=$stmtSelectProvas->fetchALL(PDO::FETCH_ASSOC);
                    echo json_encode($provas);

                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function deleteProvas(){
            try{

                include "Database.php";
                $sqlDeleteProva="DELETE FROM provas WHERE `start`=?";
                $stmtDeleteProva=$conexao->prepare($sqlDeleteProva);
                $stmtDeleteProva->bindParam(1,$this->start);

                if($stmtDeleteProva->execute()){
                    
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
