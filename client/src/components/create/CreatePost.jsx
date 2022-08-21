import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";


const initialPost = {
    title : '',
    description : '',
    picture : '',
    username : '',
    categories : '',
    createdate : new Date()
}


const CreatePost = ()=> {

    
    const [post, setPost] = useState(initialPost);
    const [file,setFile] = useState('');
    
    const url = post.picture ? post.picture  : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const location = useLocation();
    const navigate = useNavigate();
    const {account} = useContext(DataContext);

    
    
    useEffect(()=>{
        const getImg = async()=>{
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                
                //API call
                const res = await API.uploadFile(data);
                if(res.isSuccess){
                    post.picture = res.data;
                }
            }
        }
        getImg();
        post.categories = location.search?.split("=")[1] || "all";
        post.username = account.username;
    },[file])
    
    const handleChange = (e)=>{
        setPost({...post,[e.target.name]:e.target.value});
    }
  
    const savePost = async()=>{
        if(post.picture === ''){
            post.picture = url;
        }
        let res = await API.createPost(post);
        if(res.isSuccess){
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
  )
}


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

export default CreatePost;