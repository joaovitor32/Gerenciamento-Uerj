<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With,content-type");
    header("Access-Control-Allow-Methods:GET,POST");          
    header("Access-Control-Request-Method:POST");
    header("Content-type: application/json");
    //session_start();

    $data=json_decode(file_get_contents('php://input'));
    $requestHeaders = getallheaders();
    if(!empty($data) && !empty($requestHeaders)){
        require("../Model/token.php");
        
        $token=new Token();
        $token->setToken($requestHeaders);
        
        if($token->VerificaJWT()){
            
            switch($data->action){
                case "GET_USER":

                    include '../Model/Usuario.php';
                    $usuario=new Usuario();
                    $usuario->setCodLogin($token->getCodUser());
                    return $usuario->getUser();
                break;
                default:
                    http_response_code(400);
                    echo 'Erro: Opção de Ação inválida!';
                return;
            }
        }
    }
    if(!empty($_POST) && !empty($requestHeaders)){

        include '../Model/token.php';
        $token= new Token();
        $token->setToken($requestHeaders);

            switch($_POST['action']){
                case "UPDATE_USER":
                    if($token->verificaJWT()){
                        include '../Model/Usuario.php';
                        $usuario= new Usuario();
                        $usuario->setCodLogin($token->getCodUser());
                        $usuario->setLogin1($_POST['login']);
                        $usuario->setSenha(sha1($_POST['senha']));
            
                        $dataNascimento=date('Y-m-d',strtotime(( $_POST['nascimento'])));
                        $usuario->setDataNascimento($dataNascimento);
                        
                        $usuario->setMatricula($_POST['matricula']);
            
                        $dataAnoEntrada=date('Y-m-d',strtotime(( $_POST['anoDeIngresso'])));
                        $usuario->setAnoDeEntrada($dataAnoEntrada);
            
                        $usuario->setNome($_POST['nome']);
                        $usuario->setCodCurso($_POST['curso']);
                        $usuario->setFoto($_FILES['foto']);
                        $usuario->changeFoto($token->getCodUser());
                        $usuario->updateUser();
                        return;
                    }
                break;
                
                case "cadastroUser":
                    include '../Model/Usuario.php';
                    $usuario=new Usuario();
                    $usuario->setLogin1($_POST['login1']);
                    $usuario->setSenha(sha1($_POST['senha']));
    
                    $dataNascimento=date('Y-m-d',strtotime(( $_POST['datanascimento'])));
                    $usuario->setDataNascimento($dataNascimento);
                        
                    $usuario->setMatricula($_POST['matricula']);
    
                    $dataAnoEntrada=date('Y-m-d',strtotime(( $_POST['anoEntrada'])));
                    $usuario->setAnoDeEntrada($dataAnoEntrada);
    
                    $usuario->setNome($_POST['nome']);
                    $usuario->setCodCurso($_POST['codCurso']);
                    $usuario->setFoto($_FILES['fotoPerfil']);
    
                        if($usuario->checkLogin()==true){
                            echo json_encode("Login já existente, escolha outro");
                        }else{
    
                            $usuario->cadastroUser(); 
                            $usuario->cadastroFoto($usuario->lastId());
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