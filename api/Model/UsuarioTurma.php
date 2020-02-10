<?php
    class UsuarioTurma{
        private $codLogin;
        private $codTurma;
        private $media;

        //SETS
        public function setCodLogin($codLogin){
            $this->codLogin=$codLogin;
        }
        public function setCodTurma($codTurma){
            $this->codTurma=$codTurma;
        }
        public function setMedia($media){
            $this->media=$media;
        }

        //GETS
        public function getCodLogin(){
            return $this->codLogin;
        }
        public function getCodTurma(){
            return $this->codTurma;
        }
        public function getMedia(){
            return $this->media;
        }
    
        public function listaTurmasUserJSON(){
            try{

                include 'Database.php';
                $sqlSelectUserTurma="SELECT * FROM usuarioturma AS ut INNER JOIN 
                turma AS tu ON tu.codTurma=ut.codTurma INNER JOIN disciplina AS di 
                ON di.codDisciplina=tu.codDisciplina INNER JOIN professor AS po 
                ON po.codProfessor = tu.codProfessor WHERE ut.codLogin=?";
                $conexao->exec('SET NAMES utf8');
                $stmtTurmaUser=$conexao->prepare($sqlSelectUserTurma);
                $stmtTurmaUser->bindParam(1,$this->codLogin);

                if($stmtTurmaUser->execute()){

                    http_response_code(200);
                    $turmas=$stmtTurmaUser->fetchALL(PDO::FETCH_ASSOC);
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
        public function checkTurmaUsuario(){
            try{
                
                include 'Database.php';
                $sqlCheckTurmaUsuario="SELECT * FROM usuarioturma WHERE codTurma=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCheckTurmasUsuario=$conexao->prepare($sqlCheckTurmaUsuario);
                $stmtCheckTurmasUsuario->bindParam(1,$this->codTurma);
                $stmtCheckTurmasUsuario->execute();
                $check=$stmtCheckTurmasUsuario->fetch(PDO::FETCH_ASSOC);
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
        public function createUsuarioTurma(){
            try{

                include 'Database.php';
                $sqlInsertTurmaUsuario="INSERT INTO usuarioturma(codLogin,codTurma,media) VALUES (?,?,?)";
                $conexao->beginTransaction();
                $conexao->exec("SET NAMES utf8");
                $stmtInsertTurmaUsuario=$conexao->prepare($sqlInsertTurmaUsuario);
                $stmtInsertTurmaUsuario->bindParam(1,$this->codLogin);
                $stmtInsertTurmaUsuario->bindParam(2,$this->codTurma);
                $stmtInsertTurmaUsuario->bindParam(3,$this->media);
            
                if($stmtInsertTurmaUsuario->execute()){

                    $conexao->commit();
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
        public function deleteUsuarioTurma(){
            try{

                include "Database.php";
                $sqlDeleteUsuarioTurma="DELETE FROM usuarioturma WHERE codLogin =? AND codTurma=?";
                $stmtDeleteUsuarioTurma=$conexao->prepare($sqlDeleteUsuarioTurma);
                $stmtDeleteUsuarioTurma->bindParam(1,$this->codLogin);
                $stmtDeleteUsuarioTurma->bindParam(2,$this->codTurma);

                if($stmtDeleteUsuarioTurma->execute()){

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
        public function checkTurmaUsuarioAssociated(){
            try{
                
                include 'Database.php';
                $sqlCheckTurmaUsuario="SELECT * FROM usuarioturma WHERE codTurma=? AND codLogin=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCheckTurmasUsuario=$conexao->prepare($sqlCheckTurmaUsuario);
                $stmtCheckTurmasUsuario->bindParam(1,$this->codTurma);
                $stmtCheckTurmasUsuario->bindParam(2,$this->codLogin);
                $stmtCheckTurmasUsuario->execute();
                $check=$stmtCheckTurmasUsuario->fetch(PDO::FETCH_ASSOC);
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
    }
?>