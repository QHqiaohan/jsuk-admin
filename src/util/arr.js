





/**
 * 值是否在数组中
 * @param {*} va 值
 * @param {*} arr 数组
 */
const isInArr = (va,arr) => {
  if(!va || !arr || arr.length == 0){
    return false;
  }
  for(const ar of arr){
    if (ar == va)
      return true;
  }
  return false;
}


/**
 * 数组是否在目标数组里面
 * 返回 { ctn:[],
 *        nctn:[]}
 * @param {*} arr 数组
 * @param {*} tgtArr 目标数组
 */
const arrIsInArr = (arr , tgtArr) => {
  if(!tgtArr || tgtArr.length == 0){
    return {ctn:[] , nctn : arr || []};
  }
  if(!arr || arr.length == 0 ){
    return {ctn:[],nctn:[]};
  }
  const ctn = [],nctn = [];
  for(const va of arr){
    if(isInArr(va,tgtArr)){
      ctn.push(va);
    } else {
      nctn.push(va);
    }
  }
  return {ctn,nctn};
}

/**
 * 去重
 */
const arrUnique = function(arr){
  if(!arr || arr.length <= 1)
    return arr;
  arr.sort(); //先排序
  var res = [arr[0]];
  for(var i = 1; i < arr.length; i++){
    if(arr[i] !== res[res.length - 1]){
    res.push(arr[i]);
    }
  }
  return res;
}

export {
  isInArr,
  arrIsInArr,
  arrUnique
}


