// API_MESSAGE

export const API_NOTIFICATION_MESSAGE = {
    loading : {
        title : 'loading..,',
        message : 'Data Loading in progress please wait'
    },
    success : {
        title : 'Success',
        message : 'Data loaded Sucessfully.'
    },
    responseFailure :{
        title : 'Error',
        message : 'An Error occurred.'
    },
    requestFailure : {
        title : 'Error',
        message : 'An Error occurred while parsing req data'
    },
    networkError : {
        title : 'Error',
        message : 'Unable to connect with server'
    }
}


//API SERVICE CALL

export const SERVICE_URLs = {
    userSignup : {url : '/signup', method : 'POST'},
    userLogin : {url : '/login' , method:'POST'},
    uploadFile : {url : '/file/upload', method:'POST'},
    createPost : {url : '/create', method:'POST'},
    getAllPost : {url: '/getallpost', method: 'GET',params:true},
    getPostById: { url: '/getPostById', method: 'GET', query: true },
    updatePost : {url:'/updatePost', method:'PUT', query:true},
    deletePost : {url : '/deletePost', method:'DELETE', query:true},
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: 'comments', method: 'GET', query: true },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true }
}