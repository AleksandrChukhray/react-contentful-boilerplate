import axios from 'axios';

function ApiClient(session = {}, SERVER_ENV = {}) {
  return {
    request,
    resolve,

    getPage(params) {
      return request('get', '/api/page', params);
    },

    getPages() {
      return request('get', '/api/pages');
    },

    getProject(params) {
      return request('get', '/api/project', params);
    },

    getProjects() {
      return request('get', '/api/projects');
    },

    getAsset(params) {
      return request('get', '/api/asset', params);
    }
  };

  function resolve(object) {
    return Promise.all(
      Object.keys(object).reduce((promises, key) => (
        [
          ...promises,
          object[key] instanceof Promise
            ? object[key].then(value => ({ key, value }))
            : { key, value: object[key] }
        ]
      ), [])
    )
    .then(values =>
      values.reduce((obj, value) => (
        { ...obj, [value.key]: value.value }
      ), {})
    );
  }

  function request(method, url, data) {
    let config = {
      method,
      url: `${process.env.SERVER_URL}${url}`,
      headers: { 'Accept': 'application/json' }
    };


    if (method === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }

    return axios(config)
      .then(function axiosSuccess(response) {
        let result = response.data || {};
        return result;
      })
      .catch(function axiosError(response) {
        let message = ' got no error message from the server';
        let validation = [];
        if (response.data && response.data.meta) {
          message = ' ' + response.data.meta.errors
            .map(responseError => responseError.message)
            .join(', ');
          validation = response.data.meta.validation;
        }
        let error = new Error(response.status + message);
        error.validation = validation;
        throw error;
      });
  }
}

export default ApiClient;
