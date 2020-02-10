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
        
        include('../Model/token.php');
        $token=new Token();
        $token->setToken($requestHeaders);

        if($token->verificaJWT()){

            switch($data->action){
                case "LISTA_PROFESSORES":
                    include '../Model/Professor.php';
                    $professor=new Professor();
                    return $professor->listaProfessoresJSON();
                break;
                case "LISTA_PROFESSORESBYCURSO":
                    include '../Model/Professor.php';
                    $professor=new Professor();
                    $professor->setCodCurso($token->getCodCurso());
                    return $professor->listaProfessoresJSONByCurso();
                break;
                case "PROFESSOR_BYID":
                    include '../Model/Professor.php';
                    $professor=new Professor();
                    $professor->setCodProfessor($data->codProfessor);
                    return $professor->objectProfessor();
                break;
                case "CHANGEDATAPROFESSOR":
                    include '../Model/Professor.php';
                    $professor=new Professor();
                    $professor->setCodProfessor($data->codProfessor);
                    $professor->setNome($data->nome);
                    $professor->setGrandeArea($data->grandeArea);
                    $professor->updateProfessor();
                break;
                case "CADASTROPROFESSOR":
               
                    include '../Model/Professor.php';
                    require '../Model/CursoProfessor.php';
                    $professor=new Professor();
                    $cursoProfessor=new CursoProfessor();
                    $professor->setNome($data->nome);
                    $professor->setGrandeArea($data->grandeArea);
                    $professor->cadastroProfessor();
                    $codProfessor=$professor->LastID();
                    
                    $cursoProfessor->setCodProfessor($codProfessor);
                    $cursoProfessor->setCodCurso($token->getCodCurso());
                    $cursoProfessor->createCursoProfessor();
                    return;
                break;
                case "DELETEPROFESSOR":
                    require "../Model/Professor.php";
                    require "../Model/CursoProfessor.php";
                    require "../Model/Turma.php";
                    $professor= new Professor();
                    $cursoProfessor=new CursoProfessor();
                    $turma=new Turma();
                    $turma->setCodProfessor($data->codProfessor);
                    if($turma->checkProfessorTurma()==true){
        
                        $professor->setCodProfessor($data->codProfessor);
                        $professor->deleteProfessor();
                    }else{
                        echo json_encode("Professor associado a uma turma, ele não pode ser deletado! Deseja continuar com a operação?");
                    }
                break;
                case "GETTURMASBYPROFESSOR":
                    require '../Model/Professor.php';
                    $professor= new Professor();
                    $professor->setCodCurso($data->codCurso);
                    $professor->getListaTurmasProfessor();
                    return;
                break;
                case "ERASEPROFESSOR":
                    require '../Model/Professor.php';
                    $professor=new Professor();
                    $professor->setCodProfessor($data->codProfessor);
                    $professor->deleteProfessor();
                break;
                default:
                    http_response_code(400);
                    echo 'Erro: Opção de Ação inválida!';
                return;
            }
        }
    }
?>