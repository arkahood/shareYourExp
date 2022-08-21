import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URLs } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = "";

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000,
    headers:{
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response){
        //Stop Global loader here
        // console.log("config intercepting while res: ",response);
        return processResponse(response);
    },
    function (err) {
        //Stop Global loader here
        return Promise.reject(processError(err));
    }
)

////////////////

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error)=>{
    if(error.response){
        // Request made and server responded with a status code 
        // that falls out of the range of 200
        console.log("ERROR in response 89: ",error);
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGE.responseFailure,
            code : error.response.status
        }
    }else if(error.request){
        console.log("ERROR in request : ",error.json());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGE.responseFailure,
            code : ""
        }
    }else{
        console.log("ERROR in NETWORK : ",error.json());
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGE.responseFailure,
            code : ""
        }
    }
}



const API = {};

for (const [key, value] of Object.entries(SERVICE_URLs)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers : {
                authorization : getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };

