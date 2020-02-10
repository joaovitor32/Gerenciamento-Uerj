<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With,content-type");
    header("Access-Control-Allow-Methods:GET,POST");          
    header("Access-Control-Request-Method:POST");
    header("Content-type: application/json");
    session_start();
    $data=json_decode(file_get_contents('php://input'));
    
    if(!empty($data)){
        switch($data->action){
            case "VERIFICA_LOGIN":
                include '../Model/Login.php';
                $login=new Login();
                $login->setLogin($data->login);
                $login->setSenha(sha1($data->senha));
                return $login->grantAcess();
                
            break;
            case "LOGOUT":
                include '../Model/token.php';
                $token=new Token();
                $token->destroyJWT();
                return;
            break;
            default:
                http_response_code(400);
                echo 'Erro: Opção de Ação inválida!';
            return;
        }
    }
?>