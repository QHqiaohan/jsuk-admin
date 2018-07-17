/**
 * 生成 uuid
 * @returns {string}
 */
export default function () {
  return new Date().getTime() + Math.random().toFixed(4).toString().replace(/\./g,'');
}
