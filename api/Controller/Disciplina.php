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
        $token= new Token();
        $token->setToken($requestHeaders);

        if($token->verificaJWT()){
            switch($data->action){
                case "DISCIPLINAS_BYCURSO":
                    include "../Model/Disciplina.php";
                    $disciplina=new Disciplina();
                    $disciplina->setCodCurso($token->getCodCurso());
                    $disciplina->listaDisciplinaByCurso();
                    return;
                break;
                case "CHANGEDATADISCIPLINA":
                    include "../Model/Disciplina.php";
                    $disciplina=new Disciplina();
                    $disciplina->setNomeDisc($data->nomeDisc);
                    $disciplina->setCredito($data->credito);
                    $disciplina->setEmenta($data->ementa);
                    $disciplina->setCodCurso($token->getCodCurso());
                    $disciplina->setCodDisciplina($data->codDisciplina);
                    $disciplina->updateDisciplina();
                    return;
                break;
                case "CADASTRARDISCIPLINA":
                    include "../Model/Disciplina.php";
                    $disciplina=new Disciplina();
                    $disciplina->setNomeDisc($data->nomeDisc);
                    $disciplina->setCredito($data->credito);
                    $disciplina->setEmenta($data->ementa);
                    $disciplina->setCodCurso($token->getCodCurso());
                    $disciplina->cadastroDisciplina();
                    return;
                break;
                case "DELETADISCIPLINA":
                    include "../Model/Disciplina.php";
                    include "../Model/Turma.php";
                    $disciplina=new Disciplina();
                    $turma=new Turma();
    
                    $turma->setCodDisciplina($data->codDisciplina);
    
                    if($turma->checkDisciplinaTurma()==true){
    
                        $disciplina->setCodDisciplina($data->codDisciplina);
                        $disciplina->deleteDisciplina();
    
                    }else{
                        echo json_encode("Disciplina associada a uma turma, não pode ser excluída! Deseja efetuar a operação mesmo assim?");
                    }
                break;
                case "ERASEDISCIPLINA":
                    include "../Model/Disciplina.php";
                    $disciplina=new Disciplina();
                    $disciplina->setCodDisciplina($data->codDisciplina);
                    $disciplina->deleteDisciplina();
                break;
                default:
                    http_response_code(400);
                    echo 'Erro: Opção de Ação inválida!';
                return;
            }
        }
    }
?>