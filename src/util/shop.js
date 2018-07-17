import recu from '@/util/recu';

class Shop {
  constructor(axios) {
    this.axios = axios;
  }
  getCategories() {
    return new Promise((resolve, reject) => {
      if (this.categories) {
        return resolve(this.categories);
      }
      this.axios.get('/api/v1/goodsCategory/list')
        .then(({data: {data}}) => {
          this.categories = recu(data, undefined, 'id', 'parentId');
          resolve(this.categories);
        }).catch(reject);
    });
  }

  getBrands() {
    return new Promise((resolve, reject) => {
      if (this.brands) {
        return resolve(this.brands);
      }
      this.axios.get('/api/v1/goodsBrand/list')
        .then(({data: {data}}) => {
          this.brands = data;
          resolve(this.brands);
        }).catch(reject);
    });
  }

  getLabels(){
    return new Promise((resolve,reject) =>{
      if(this.labels){
        return resolve(this.labels);
      }
      this.axios.get('/api/v1/goodsLabel/list')
        .then(({data: {data}}) => {
          this.labels = data;
          resolve(this.labels);
        }).catch(reject);
    });
  }

  getAttributes(){
    return new Promise((resolve,reject) =>{
      if(this.attributes){
        return resolve(this.attributes);
      }
      this.axios.get('/api/v1/shopAttribute/list')
        .then(({data: {data}}) => {
          this.attributes = data;
          resolve(this.attributes);
        }).catch(reject);
    });
  }

}


export default Shop;














