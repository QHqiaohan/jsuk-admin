class Dict {

  constructor(axios) {
    this.axios = axios;
  }

  promises = {};

  loading = {};

  dicts = {};

  load(type, code) {
    if (!type) {
      type = "enum";
    }
    const key = type + code;
    if (this.promises[key]) {
      return this.promises[key];
    }
    const promise = new Promise((resolve, reject) => {
      if (this.loading[key]) {
        return;
      }
      this.loading[key] = true;
      this.axios.get('/dict', {params: {type, code}}).then(({data: {data}}) => {
        this.loading[key] = false;
        this.dicts[key] = data;
        resolve(data);
      }).catch(e => {
        this.loading[key] = false;
        reject(e);
      });
    });
    return this.promises[key] = promise;
  }


}

export default Dict;
