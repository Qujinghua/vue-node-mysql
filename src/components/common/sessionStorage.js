const getQueryString = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return unescape(r[2]);  
  }
  return null;
}
export default getQueryString

/**
 * 存储localStorage
 */
export const setSessionStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getSessionStorage = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeSessionStorage = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}


