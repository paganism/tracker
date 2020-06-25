import axios from 'axios';
import  IssuesService  from  './IssuesService';
import {apiURL} from './IssuesService';


const issuesService = new IssuesService();

export default class AuthService{
    

    getConfig() {
        let storageLogin = localStorage.getItem('login');
        let acsess_token = JSON.parse(storageLogin).token
  
        let AuthStr = 'Token '.concat(acsess_token); 
  
        const config = { 'Authorization': AuthStr}
        return config
      }

    login(email, password) {
        let params = {
            'username': email,
            'password': password,
        }
        const url = `${apiURL}/api/login`;
        return axios.post(url, params).then(response => response).catch(error => error);
    }

    isAuth() {
        const url = `${apiURL}/api/auth`;
        let config = issuesService.getConfig();
        return axios.get(url, {headers: config}).then(response => response).catch(error => error);
    }

    logout() {
        const url = `${apiURL}/api/logout`;
        let config = issuesService.getConfig();
        console.log(config)
        // return axios.post(url, {headers: config}).then(response => response).catch(error => error);

        return axios({
            method: 'post',
            url: `${apiURL}/api/logout`,
            withCredentials: true, 
            headers: config,
          }).catch(function (error) {
            console.log(error);
          });
    }
}
