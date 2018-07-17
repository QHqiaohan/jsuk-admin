/**
 * 递归相关工具类
 */

/**
 * 选择在 list 的 key 值为 val 的数组
 */
const selectIs = (key,val,list) => {
  if(!list||!key) return
  const rtn = []
  for(let i in list){
    if(!val && val !== false && !list[i][key]){
      rtn.push(list[i])
    }
    if(val || val === false){
      if(list[i][key] == val){
        rtn.push(list[i])
      }
    }
  }
  return rtn
}

/**
 * 转换未递归型数据
 * @param {arrar} list
 * @param {string} key 父级的值
 * @param {string} priKey 主键名称
 * @param {string} pntKey 父键名称
 */
const toRecu = (list,key,priKey,pntKey) => {
  if(!list) return
  const rtn = {};
  recu(rtn,key,list,priKey,pntKey);
  return rtn.children
};

/**
 * 递归获取数据
 * @param {array} me
 * @param {string} key 父级的值
 * @param {string} priKey 主键名称
 * @param {string} pntKey 父键名称
 */
const recu = (me,key,list,priKey,pntKey) => {
  if(!me) return
  const chd = selectIs(pntKey,key,list);
  if(!chd || chd.length == 0) return ;
  me.children = chd
  for(let i in chd){
    if(chd[i][priKey]){
      recu(chd[i],chd[i][priKey],list,priKey,pntKey)
    }
  }
}

export default toRecu
