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
      let params = {};
      let config = this.getConfig();
      if ((pageNumber && pageNumber !== 0)|| pageSize) {
        params = {
          page: pageNumber,
          page_size: pageSize,
          search: search,
          assigned_to__username: searchFields.assigned,
          submitted_by__username: searchFields.submitted,
          tracker__title: searchFields.tracker,
          project__projectname: searchFields.project,
          status__statusname: searchFields.status.join(),
        }
      }

      const url = `${apiURL}/api/issues/`;

      return axios.get(url, {
        params: params,
        headers: config
        }).then(response => response.data);
    }

    getIssuesByURL(link){
        const url = `${link}`;
        let config = this.getConfig();
        return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }

    getIssue(pk) {
        const url = `${apiURL}/api/issues/${pk}`;
        let config = this.getConfig();
        return axios.get(url, {headers: config}).then(response => response).catch(error => error);
          ;
    }

    deleteIssue(issue){
        let config = this.getConfig();
        const url = `${apiURL}/api/issues/${issue.pk}`;
        return axios.delete(url, {headers: config}).catch(function (error) {
            console.log(error);
          });
    }
    createIssue(issue){
        let config = this.getConfig();
        const url = `${apiURL}/api/issues/`;
        return axios.post(url, issue, {headers: config}).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }

    updateIssue(issue){
        let config = this.getConfig();
        const url = `${apiURL}/api/issues/${issue.pk}`;
        return axios.put(url, issue, {headers: config}).then(response => response.data).catch(function (error) {
          console.log(error);
          });
    }
    getUsers() {
        let config = this.getConfig();
        const url = `${apiURL}/api/users/`;
        return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
            console.log(error);
          });
    }

    createComment(comment) {
        // let storageLogin = localStorage.getItem('login');
        // let acsess_token = JSON.parse(storageLogin).token
    
        // let AuthStr = 'Token '.concat(acsess_token); 
        let config = this.getConfig();
    
        return axios({
            method: 'post',
            url: `${apiURL}/api/comments/`,
            withCredentials: true, 
            headers: config,
            data: comment,
          }).catch(function (error) {
            console.log(error);
          });
          
    };

    deleteComment(pk){
        // let storageLogin = localStorage.getItem('login');
        // let acsess_token = JSON.parse(storageLogin).token
    
        // let AuthStr = 'Token '.concat(acsess_token); 
        let config = this.getConfig();
    
        return axios({
            method: 'delete',
            url: `${apiURL}/api/comments/${pk}`,
            withCredentials: true, 
            headers: config,
          }).catch(function (error) {
            console.log(error);
          });
          
    };

    // TODO Переделать обновление комментов на собственный endpoint
    updateComment(issue){
        let config = this.getConfig();
        const url = `${apiURL}/api/comments/${issue.pk}`;
        return axios.put(url, issue, {headers: config}).catch(function (error) {
            console.log(error);
          });
    }
    
    // Tracker
    getTrackers() {
      let config = this.getConfig();
      const url = `${apiURL}/api/trackers/`;
      return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Project
    getProjects() {
      let config = this.getConfig();
      const url = `${apiURL}/api/projects/`;
      return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Status
    getStatuses() {
      let config = this.getConfig();
      const url = `${apiURL}/api/statuses/`;
      return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }

    // Priority
    getPriority() {
      let config = this.getConfig();
      const url = `${apiURL}/api/priority/`;
      return axios.get(url, {headers: config}).then(response => response.data).catch(function (error) {
          console.log(error);
        });
    }
}
