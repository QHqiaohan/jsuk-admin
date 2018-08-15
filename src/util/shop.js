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
      this.axios.get('/goodsCategory/list')
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
      this.axios.get('/goodsBrand/list')
        .then(({data: {data}}) => {
          this.brands = data;
          resolve(this.brands);
        }).catch(reject);
    });
  }

  getCities(){
    return new Promise((resolve, reject) => {
      if (this.cities) {
        return resolve(this.cities);
      }
      this.axios.get('/cities/all')
        .then(({data: {data}}) => {
          this.cities = data;
          resolve(this.cities);
        }).catch(reject);
    });
  }

  getLabels(){
    return new Promise((resolve,reject) =>{
      if(this.labels){
        return resolve(this.labels);
      }
      this.axios.get('/goodsLabel/list')
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
      this.axios.get('/shopAttribute/list')
        .then(({data: {data}}) => {
          this.attributes = data;
          resolve(this.attributes);
        }).catch(reject);
    });
  }

  getWCities(){
    return new Promise((resolve,reject) =>{
      if(this.wCities){
        return resolve(this.wCities);
      }
      this.axios.get('/cities/wall')
        .then(({data: {data}}) => {
          this.wCities = data;
          resolve(this.wCities);
        }).catch(reject);
    });
  }

  getShops(){
    return new Promise((resolve,reject) =>{
      if(this.shops){
        return resolve(this.shops);
      }
      this.axios.get('/shop/list')
        .then(({data: {data}}) => {
          this.shops = data;
          resolve(this.shops);
        }).catch(reject);
    });
  }

}


export default Shop;














