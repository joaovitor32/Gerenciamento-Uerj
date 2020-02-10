<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With,content-type");
    header("Access-Control-Allow-Methods:GET,POST");          
    header("Access-Control-Request-Method:POST");
    header("Content-type: application/json");
    //session_start();
    
    $data=json_decode(file_get_contents('php://input'));
    $requestHeaders=getallheaders();
   
    if(!empty($data) && !empty($requestHeaders) ){

        require('../Model/token.php');
        $token=new Token();
        $token->setToken($requestHeaders);

        switch($data->action){
            case "GET_CURSOS":
                include "../Model/Curso.php";
                $curso=new Curso();
                $curso->getAllCursos();
                return;
            break;
            case "GET_CURSO":
                if($token->verificaJWT()){
                    include '../Model/Curso.php';
                    $curso=new Curso();
                    $curso->setCodCurso($token->getCodCurso());
                    return $curso->cursoJSON();
                }  
            break;
            case "CADASTRAR_CURSO":
                if($token->verificaJWT()){
                include "../Model/Curso.php";
                    $curso=new Curso();
                    $curso->setCurso($data->nomeCurso);
                    $curso->createCurso();
                }
            return;
            break;
            default:
                http_response_code(400);
                echo 'Erro: Opção de Ação inválida!';
                return;
            }
        }
    
?>