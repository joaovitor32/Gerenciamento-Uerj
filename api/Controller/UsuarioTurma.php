<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With,content-type");
    header("Access-Control-Allow-Methods:GET,POST");          
    header("Access-Control-Request-Method:POST");
    header("Content-type: application/json");
    //session_start();
    
    $data=json_decode(file_get_contents('php://input'));
    $requestHeaders=getallheaders();

    if(!empty($data)&&!empty($requestHeaders)){
        
        require('../Model/token.php');
        $token=new Token();
        $token->setToken($requestHeaders);

            if($token->verificaJWT()){
                switch($data->action){
                    case "GET_TURMASBYUSER":
                        include '../Model/UsuarioTurma.php';
                        $usuarioturma=new UsuarioTurma();
                        $usuarioturma->setCodLogin($token->getCodUser());
                        $usuarioturma->listaTurmasUserJSON();
                        return;
                    break;
                    case "CADASTRAR_USUARIO_TURMA":
                        include '../Model/UsuarioTurma.php';
                        $usuarioturma=new UsuarioTurma();
                        $usuarioturma->setCodLogin($token->getCodUser());
                        $usuarioturma->setCodTurma($data->codTurma);
                        $usuarioturma->setMedia($data->media);
                        $usuarioturma->createUsuarioTurma();
                        return;
                    break;
                    case "DELETE_USUARIO_TURMA":
                        include '../Model/UsuarioTurma.php';
                        $usuarioturma=new UsuarioTurma();
                        $usuarioturma->setCodLogin($token->getCodUser());
                        $usuarioturma->setCodTurma($data->codTurma);
                        $usuarioturma->deleteUsuarioTurma();
                        return;
                    break;
                    default:
                        http_response_code(400);
                        echo 'Erro: Opção de Ação inválida!';
                    return;
            }
        }
    }
?>