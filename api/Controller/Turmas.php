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

        include '../Model/token.php';
        $token= new Token();
        $token->setToken($requestHeaders);

        if($token->verificaJWT()){
            switch($data->action){
                case "GETTURMAS":
                    include '../Model/Turma.php';
                    $turma=new Turma();
                    $turma->setCodCurso($token->getCodCurso());
                    $turma->getTurmas();
                    return;
                break;
                case "DELETETURMA":
                    include '../Model/Turma.php';
                    include '../Model/UsuarioTurma.php';
        
                    $usuarioturma= new UsuarioTurma();
                    $usuarioturma->setCodTurma($data->codTurma);
        
                    if($usuarioturma->checkTurmaUsuario()==true){
                        
                        $turma= new Turma();
                        $turma->setCodTurma($data->codTurma);
                        $turma->deleteTurma();
        
                    }else{
                        echo json_encode("Turma associada a pelo menos um aluno, não pode ser apagada! Tem certeza que deseja prosseguir com a operação?");
                    }
                break;
                case "ERASETURMA":
                    include '../Model/Turma.php';
                    $turma= new Turma();
                    $turma->setCodTurma($data->codTurma);
                    $turma->deleteTurma();
                break;
                case "CADASTRAR_TURMA":
                    include '../Model/Turma.php';
                    $turma=new Turma();
        
                    $turma->setCodProfessor($data->codProfessor);
                    $turma->setCodDisciplina($data->codDisciplina);
                    $turma->setPeriodo($data->periodo);
        
                    if($turma->CheckExistence()==false){
                        echo json_encode("Já existe uma turma com estes dados");
                    }else{
                        $turma->createTurma();    
                    }
                break;
                default:
                    http_response_code(400);
                    echo 'Erro: Opção de Ação inválida!';
                return;
            }
        }
    }
?>