import { useState } from "react";
import { useEffect } from "react"
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import {API} from '../../service/api';
import Post from "./Post";

const Posts = ()=> {

  const [posts , setPosts] = useState([]);
  
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get('category');
  const userName = SearchParams.get('username');
  useEffect(()=>{
    const getAllpost = async()=>{
      let res = await API.getAllPost({ category : category || '' ,username : userName || ''});
      if(res.isSuccess){
        setPosts(res.data);
      }
    }
    getAllpost();
  },[category,userName]);


  return (
    <>
        {
          posts?.length ? posts.map((post) => (
              <Grid item lg={3} sm={4} xs={12} key={post._id}>
                  <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                      <Post post={post} />
                  </Link>
              </Grid>
              )) : 
              <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
    </>
  )
}

export default Posts