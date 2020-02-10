<?php
    class Disciplina{
        private $codDisciplina;
        private $nomeDisc;
        private $credito;
        private $ementa;
        private $codCurso;

        //Gets
        public function getCodDisciplina(){
            return $this->codDisciplina;
        }
        public function getNomeDisc(){
            return $this->nomeDisc;
        }
        public function getCredito(){
            return $this->credito;
        }
        public function getEmenta(){
            return $this->ementa;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }
        //Sets
        public function setCodDisciplina($codDisciplina){
            $this->codDisciplina=$codDisciplina;
        }
        public function setNomeDisc($nomeDisc){
            $this->nomeDisc=$nomeDisc;
        }
        public function setCredito($credito){
            $this->credito=$credito;
        }
        public function setEmenta($ementa){
            $this->ementa=$ementa;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }

        public function listaDisciplinaByCurso(){
            try{
                include 'Database.php';
                $sqlSelect="SELECT * FROM disciplina WHERE codCurso=?";
                $conexao->exec('SET NAMES utf8');
                $stmtDisciplinas=$conexao->prepare($sqlSelect);
                $stmtDisciplinas->bindParam(1,$this->codCurso);

                if($stmtDisciplinas->execute()){
                    
                    $disciplinas=$stmtDisciplinas->fetchALL(PDO::FETCH_ASSOC);
                    http_response_code(200);
                    echo json_encode($disciplinas);
    
                }else{
                    http_response_code(400);
                    return;
                }

            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function updateDisciplina(){
            try{
                include 'Database.php';
                $sqlUpdateDisciplina="UPDATE disciplina SET nomeDisc=?, credito=?, ementa=?,codCurso=? WHERE codDisciplina=? ";
                $conexao->exec('SET NAMES utf8');
                $stmtDisciplinas=$conexao->prepare($sqlUpdateDisciplina);
                $stmtDisciplinas->bindParam(1,$this->nomeDisc);
                $stmtDisciplinas->bindParam(2,$this->credito);
                $stmtDisciplinas->bindParam(3,$this->ementa);
                $stmtDisciplinas->bindParam(4,$this->codCurso);
                $stmtDisciplinas->bindParam(5,$this->codDisciplina);

                if($stmtDisciplinas->execute()){
                    
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
        public function cadastroDisciplina(){
            try{
                include 'Database.php';
                $sqlCadDisciplina="INSERT INTO disciplina(nomeDisc,credito,ementa,codCurso) VALUES (?,?,?,?)";
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $stmtCadDisciplina=$conexao->prepare($sqlCadDisciplina);
                $stmtCadDisciplina->bindParam(1,$this->nomeDisc);
                $stmtCadDisciplina->bindParam(2,$this->credito);
                $stmtCadDisciplina->bindParam(3,$this->ementa);
                $stmtCadDisciplina->bindParam(4,$this->codCurso);
            

                if($stmtCadDisciplina->execute()){
                    
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

        public function deleteDisciplina(){
            try{

                include 'Database.php';
                $sqlDeleteDisciplina="DELETE FROM disciplina WHERE codDisciplina=?";
                $stmtDeleteDisciplina=$conexao->prepare($sqlDeleteDisciplina);
                $stmtDeleteDisciplina->bindParam(1,$this->codDisciplina);
                
                if($stmtDeleteDisciplina->execute()){
                    
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