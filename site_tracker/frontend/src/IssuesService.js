import axios from 'axios';
export const apiURL = 'http://localhost:8000';

export default class IssueService{

    getConfig() {
      let storageLogin = localStorage.getItem('login');
      let config = {};
      if (storageLogin) {
        let acsess_token = JSON.parse(storageLogin).token
        let AuthStr = 'Token '.concat(acsess_token); 
        config = { 'Authorization': AuthStr}

        return config
      }
      return config
    }


    getIssues(pageNumber, pageSize, search, searchFields) {
      let params = {}
      if ((pageNumber && pageNumber !== 0)|| pageSize) {
        params = {
          page: pageNumber,
          page_size: pageSize,
          search: search,
          search_fields: searchFields 
        }
      }

      const url = `${apiURL}/api/issues/`;

      return axios.get(url, {
        params: params
        }).then(response => response.data);
    }

    getIssuesByURL(link){
        const url = `${link}`;
        return axios.get(url).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }

    getIssue(pk) {
        const url = `${apiURL}/api/issues/${pk}`;
        return axios.get(url).then(response => response).catch(error => error);
          ;
    }

    deleteIssue(issue){
        const url = `${apiURL}/api/issues/${issue.pk}`;
        return axios.delete(url).catch(function (error) {
            console.log(error);
          });
    }
    createIssue(issue){
        let config = this.getConfig();
        const url = `${apiURL}/api/issues/`;
        return axios.post(url,issue, {headers: config}).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }
    updateIssue(issue){
        // console.log(issue);
        const url = `${apiURL}/api/issues/${issue.pk}`;
        return axios.put(url, issue).then(response => response.data).catch(function (error) {
          console.log(error);
          });
    }
    getUsers() {
        const url = `${apiURL}/api/users/`;
        return axios.get(url).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }

    createComment1(issue){
        const url = `${apiURL}/api/comments/`;
        return axios.post(url,issue).catch(function (error) {
            console.log(error);
          });
    }
    
    createComment(comment) {
        let storageLogin = localStorage.getItem('login');
        let acsess_token = JSON.parse(storageLogin).token
    
        let AuthStr = 'Token '.concat(acsess_token); 
    
        return axios({
            method: 'post',
            url: `${apiURL}/api/comments/`,
            withCredentials: true, 
            headers: { 'Authorization': AuthStr},
            data: comment,
          }).catch(function (error) {
            console.log(error);
          });
          
    };


    deleteComment(pk){
        let storageLogin = localStorage.getItem('login');
        let acsess_token = JSON.parse(storageLogin).token
    
        let AuthStr = 'Token '.concat(acsess_token); 
    
        return axios({
            method: 'delete',
            url: `${apiURL}/api/comments/${pk}`,
            withCredentials: true, 
            headers: { 'Authorization': AuthStr},
          }).catch(function (error) {
            console.log(error);
          });
          
    };

    // TODO Переделать обновление комментов на собственный endpoint
    updateComment(issue){
        const url = `${apiURL}/api/comments/${issue.pk}`;
        return axios.put(url,issue).catch(function (error) {
            console.log(error);
          });
    }
    
    // Tracker
    getTrackers() {
      const url = `${apiURL}/api/trackers/`;
      return axios.get(url).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Project
    getProjects() {
      const url = `${apiURL}/api/projects/`;
      return axios.get(url).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Status
    getStatuses() {
      const url = `${apiURL}/api/statuses/`;
      return axios.get(url).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Priority
    getPriority() {
      const url = `${apiURL}/api/priority/`;
      return axios.get(url).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    getName(pk, field, array)  {
        array.forEach((item) => {
            if (item.pk === pk) {
              return item.username;
            }
            console.log(item.username);
            });
        }
}
