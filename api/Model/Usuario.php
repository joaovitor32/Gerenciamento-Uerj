<?php 
    class Usuario{
        private $codLogin;
        private $login1;
        private $senha;
        private $matricula;
        private $nome;
        private $anodeentrada;
        private $datanascimento;
        private $codCurso;
        private $foto;
        private $token;

        //GETS
        public function getCodLogin(){
            return $this->codLogin;
        }
        public function getLogin1(){
            return $this->login1;
        }
        public function getSenha(){
            return $this->senha;
        }
        public function getMatricula(){
            return $this->matricula;
        }
        public function getNome(){
            return $this->nome;
        }
        public function getAnoDeEntrada(){
            return $this->anodeentrada;
        }
        public function getCodCurso(){
            return $this->codCurso;
        }
        public function getDataNascimento(){
            return $this->datanascimento;
        }

     
        //SETS
        public function setCodLogin($codLogin){
            $this->codLogin=$codLogin;
        }
        public function setLogin1($login1){
            $this->login1=$login1;
        }
        public function setSenha($senha){
            $this->senha=$senha;
        }
        public function setMatricula($matricula){
            $this->matricula=$matricula;
        }
        public function setNome($nome){
            $this->nome=$nome;
        }
        public function setAnoDeEntrada($anodeentrada){
            $this->anodeentrada=$anodeentrada;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }
        public function setDataNascimento($datanascimento){
            $this->datanascimento=$datanascimento; 
        }
        public function setFoto($foto){
            $this->foto=$foto;
        }
       
        public function getUser(){
            try{
            
                include "Database.php";
                $sqlLogin="SELECT * FROM usuario AS us INNER JOIN curso AS cu ON cu.codCurso=us.codCurso  WHERE codLogin = ?";
                $conexao->exec('SET NAMES utf8');
                $stmtUser=$conexao->prepare($sqlLogin);
                $stmtUser->bindParam(1,$this->codLogin);
                $stmtUser->execute();
                $user=$stmtUser->fetchALL(PDO::FETCH_ASSOC);
                if($user!=0){
                    echo json_encode($user);
                }else{
                    echo  json_encode(false);
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function checkLogin(){
            try{

                include 'Database.php';
                $sqlCheckUser="SELECT * FROM usuario WHERE login1=?";
                $conexao->exec('SET NAMES utf8');
                $stmtCheckUser=$conexao->prepare($sqlCheckUser);
                $stmtCheckUser->bindParam(1,$this->login1);
                $stmtCheckUser->execute();
                $checkUser=$stmtCheckUser->fetchALL(PDO::FETCH_ASSOC);
    
                if(count($checkUser)!=0){
                    return true;
                }else{
                    return false;
                }

            }catch(PDOException $e){
                http_response_code(400);
                return;
            }
        }
        public function cadastroUser(){
            try{
                
                include 'Database.php';
                $sqlInsertUser="INSERT INTO usuario(login1,senha,matricula,datanascimento,nome,anodeentrada,codCurso) VALUES (?,?,?,?,?,?,?)";
                $conexao->beginTransaction();
                $conexao->exec('SET NAMES utf8');
                $stmtCadUser=$conexao->prepare($sqlInsertUser);
                $stmtCadUser->bindParam(1,$this->login1);
                $stmtCadUser->bindParam(2,$this->senha);
                $stmtCadUser->bindParam(3,$this->matricula);
                $stmtCadUser->bindParam(4,$this->datanascimento);
                $stmtCadUser->bindParam(5,$this->nome);
                $stmtCadUser->bindParam(6,$this->anodeentrada);
                $stmtCadUser->bindParam(7,$this->codCurso);

                if($stmtCadUser->execute()){

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
        public function lastId(){
            try{
                include('Database.php');
                $sqlLastId='SELECT codLogin from usuario WHERE codLogin=(SELECT MAX(codLogin) FROM usuario)';
                $conexao->exec('SET NAMES utf8');
                $stmtLastId=$conexao->prepare($sqlLastId);
                $stmtLastId->execute();
                $dado=$stmtLastId->fetch(PDO::FETCH_ASSOC);
                return $dado['codLogin'];   
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function cadastroFoto($codigo){
            try{
                if($this->foto['error']==0){
                    $arquivo_tmp=$this->foto['tmp_name'];
                    $nome=$this->foto['name'];
                    $path='../../api/fotoPerfil/';
                    $extensao=pathinfo($nome,PATHINFO_EXTENSION);
                    $extensao=strtolower($extensao);
                    if(strstr('.jpg;.jpeg;.git;.png',$extensao)){
                        $destino=$path.$codigo.'.jpg';
                        @move_uploaded_file($arquivo_tmp,$destino);
                    }
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();   
            }
        }
        public function updateUser(){
            try{

                include 'Database.php';
                $sqlUpdateUser="UPDATE usuario SET login1=?, senha=?, nome=?, matricula=?,anodeentrada=?,datanascimento=?,codCurso=? WHERE codLogin=?";
                $conexao->exec('SET NAMES utf8');
                $stmtUpdateUser=$conexao->prepare($sqlUpdateUser);
                $stmtUpdateUser->bindParam(1,$this->login1);
                $stmtUpdateUser->bindParam(2,$this->senha);
                $stmtUpdateUser->bindParam(3,$this->nome);
                $stmtUpdateUser->bindParam(4,$this->matricula);
                $stmtUpdateUser->bindParam(5,$this->anodeentrada);
                $stmtUpdateUser->bindParam(6,$this->datanascimento);
                $stmtUpdateUser->bindParam(7,$this->codCurso);
                $stmtUpdateUser->bindParam(8,$this->codLogin);
                $stmtUpdateUser->execute();
              
                if($stmtUpdateUser->execute()){

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
        public function changeFoto(){
            try{
                $path='../../api/fotoPerfil/';
                $dir= dir($path);
                while($arquivo=$dir->read()){
                    $arqName=pathinfo($arquivo);
                    if($arqName['filename']==$this->codLogin){
                        unlink($path.$arquivo);
                        break;
                    }
                }
                $this->cadastroFoto($this->codLogin);
                $dir->close();
                return;
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();
            }
        } 
    }
?>