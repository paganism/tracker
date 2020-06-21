import axios from 'axios';
export const apiURL = 'http://localhost:8000';

export default class AuthService{

    login(email, password) {
        let params = {
            'username': email,
            'password': password,
        }
        const url = `${apiURL}/api/login`;
        return axios.post(url, params).then(response => response).catch(error => error);
    }

    logout(user) {

    }
}
