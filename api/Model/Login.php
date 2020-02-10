<?php
    require __DIR__ . '/vendor/autoload.php';
    use Firebase\JWT\JWT;
    class Login{
        private $Login;
        private $Senha;

        //Gets
        public function getLogin(){
            return $this->Login;
        }
        public function getSenha(){
            return $this->Senha;
        }
        //Sets
        public function setLogin($log){
            $this->Login=$log;
        }
        public function setSenha($senha){
            $this->Senha=$senha;
        }

        public function grantAcess(){
            try{
                include "Database.php";
                $sqlLogin="SELECT * FROM usuario WHERE login1=? AND senha=? ";
                $conexao->exec('SET NAMES utf8');
                $stmtAcesso=$conexao->prepare($sqlLogin);
                $stmtAcesso->bindParam(1,$this->Login);
                $stmtAcesso->bindParam(2,$this->Senha);
                $stmtAcesso->execute();
                $dado=$stmtAcesso->fetch(PDO::FETCH_ASSOC);
                if($dado!=0){
                    $this->creatJWToken($dado);
                }else{
                    echo json_encode(false); 
                    http_response_code(401);
                }
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();              
            }
        }
        public function creatJWToken($dado){
           
           /* 
            $key='gerenciamento-uerj'; 
            $header=[
                    'alg' => 'HS256',
                    'typ' => 'JWT'
                ];

                $header=json_encode($header);
                $header=base64_encode($header);
            
                $login=$dado['login1'];
                $codUser=$dado['codLogin'];

                $payload=[
                    'iss' => 'localhost',
                    'login'=>$login,
                    'codUser'=>$codUser
                ];
            
                $payload=json_encode($payload);
                $payload=base64_encode($payload);

                $signature = hash_hmac('sha256',"$header.$payload",$key,true);
                $signature = base64_encode($signature);
                
                http_response_code(200);
                echo json_encode(["token"=>"$header.$payload.$signature"]);
            */
            $key='gerenciamento-uerj';
            
            $login=$dado['login1'];
            $codUser=$dado['codLogin'];
            $codCurso=$dado['codCurso'];

            $token=array(
                "iss"=>"localhost",
                "codLogin"=>$codUser,
                "codCurso"=>$codCurso,
                "login"=>$login
            );

            $jwt = JWT::encode($token, $key);
            echo json_encode($jwt);
        }
    }
?>