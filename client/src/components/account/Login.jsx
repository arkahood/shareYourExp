import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

import { API } from '../../service/api';

const Login = ({isUserAuthenticated})=>{


    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const initialAccDetails = {
        name: '',
        username: '',
        password: '',
    }
    const initialLoginValue = {
        username : '',
        password : ''
    }

    const [acc,setAcc] = useState('Login');
    const [accDetail, setAccDetail] = useState(initialAccDetails);
    const [login, setLogin] = useState(initialLoginValue);
    const [error, showError] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toogleAcc = ()=>{
        acc === 'Login' ? setAcc('SignUp') : setAcc('Login');
    }

    const onInputChange = (e)=>{
        setAccDetail({...accDetail,[e.target.name]:e.target.value});
        // console.log(accDetail);
    }

    const signupUser =  async()=>{
        try {
            await API.userSignup(accDetail);
            setAccDetail(initialAccDetails);
            setAcc('Login');
            showError('')
        } catch (error) {
            showError('Something went wrong! please try again later');
        } 
    }

    //For Login

    const onLoginChange = (e)=>{
        setLogin({...login,[e.target.name] : e.target.value});
    }

    const loginUser = async()=>{
        let res = await API.userLogin(login);
        if(res.isSuccess){
            showError('');
            sessionStorage.setItem('accessToken',`Bearer ${res.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${res.data.refreshToken}`);

            setAccount({username: res.data.username, name : res.data.name});
            console.log(res);
            isUserAuthenticated(true);
            navigate("/");
        }else{
            showError('Something went wrong! please try again later');
        }
    }

    return(
        <Component>
            <Image src= {imageURL} alt='blog'/>
            {acc === 'Login' ?
                // This is for Login Screen
                <Wrapper>
                    <TextField label="Username" variant="standard" name='username' onChange={(e)=>onLoginChange(e)}/>
                    <TextField label="Password" variant="standard" name='password' onChange={(e)=>onLoginChange(e)}/>

                    {error && <Error>{error}</Error>}

                    <LoginButton variant='standard' onClick={()=> loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={()=> toogleAcc()}>Create an Account</SignupButton>
                </Wrapper>
            :
                // This is For Sign Up Screen
                <Wrapper>
                    <TextField label="Name" variant="standard" name='name' onChange={(e)=>onInputChange(e)}/>
                    <TextField label="Username" variant="standard" name='username' onChange={(e)=>onInputChange(e)}/>
                    <TextField label="Password" variant="standard" name='password' onChange={(e)=>onInputChange(e)}/>

                    {error && <Error>{error}</Error>}

                    <SignupButton variant='standard' onClick={()=> signupUser()}>Sign Up</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton onClick={()=> toogleAcc()}>Already Have an Account</LoginButton>
                </Wrapper>
            }
        </Component>
    );
}


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

export default Login;