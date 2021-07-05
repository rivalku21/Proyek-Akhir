function getCookie(name) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(`${name}=`);
      if (cStart !== -1) {
        cStart = cStart + name.length + 1;
        let cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = document.cookie.length;
        }
        return unescape(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  }
  
  function setCookie(cname, cvalue) {
    document.cookie = `${cname}=${cvalue}`;
  }
  
  function deleteCookie(name) {
    const cookie = document.cookie.split('; ').find((row) => {
      return row.startsWith(name);
    });
    document.cookie = `${cookie}=;expires=${new Date(0).toUTCString()}`;
  }
  
  const isUserAuthenticated = () => {
    if (getCookie('token')) return true;
    return false;
  };
  
  export { isUserAuthenticated, getCookie, setCookie, deleteCookie };