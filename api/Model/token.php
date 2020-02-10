<?php
    require __DIR__ . '/vendor/autoload.php';
    use Firebase\JWT\JWT;
    require('key.php');
    class token{
        
        private $token;
        private $codUser;
        private $login;
        private $tokenDecoded;
    
        public function setToken($token){
            $this->token=$token;
        }
        public function setCodUser($codUser){
            $this->codUser=$codUser;
        }
        public function setLogin($login){
            $this->login=$login;
        }
        public function setCodCurso($codCurso){
            $this->codCurso=$codCurso;
        }

        public function getLogin(){
            return $this->login;
        }

        public function getCodCurso(){
            return $this->codCurso;
        }

        public function getCodUser(){
            return $this->codUser;
        }

        public function VerificaJWT(){
            try{
                $token=explode(" ",$this->token["authorization"]);
                $this->tokenDecoded=JWT::decode($token[1],key,array('HS256'));
                if($this->tokenDecoded){
                    $this->setCodUser($this->tokenDecoded->codLogin);
                    $this->setLogin($this->tokenDecoded->login);
                    $this->setCodCurso($this->tokenDecoded->codCurso);
                    return true;
                }else{
                    return false;
                    http_response_code(401);
                }
                
            }catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();
            }
        }
        public function destroyJWT(){
            try{
                $this->tokenDecoded->destroy();
            }
            catch(PDOException $e){
                http_response_code(500);
                echo "Erro: ".$e->getMessage();
            }
        }
    }
?>