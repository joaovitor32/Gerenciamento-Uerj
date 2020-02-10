<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With,content-type");
    header("Access-Control-Allow-Methods:GET,POST");          
    header("Access-Control-Request-Method:POST");
    header("Content-type: application/json");
    //session_start();
    
    $data=json_decode(file_get_contents('php://input'));
    $requestHeaders=getallheaders();

    if(!empty($data) && !empty($requestHeaders)){

        include("../Model/token.php");
        $token= new Token();
        $token->setToken($requestHeaders);

        if($token->verificaJWT()){
            switch($data->action){
                case "CADASTRAR_PROVA":
                    include '../Model/Provas.php';
                    $prova=new Provas();
                    $prova->setTitle($data->title);
                    $prova->setStart($data->start);
                    $prova->setCodTurma($data->codTurma);
                    $prova->createProva();
                return;
                break;
                case "GET_PROVAS":
                    include '../Model/Provas.php';
                    $provas=new Provas();
                    $provas->setCodCurso($token->getCodCurso());
                    $provas->getProvas();
                return;
                break;
                case "DELETE_PROVAS":
                    include "../Model/Provas.php";
                    $provas=new Provas();
                    $provas->setStart($data->start);
                    $provas->deleteProvas();
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