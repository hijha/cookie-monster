const clearCookies = ({ cookies }) => {
  cookies.forEach(cookie => {
    const url = `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`;
    const name =  cookie.name;
    chrome.cookies.remove({url, name});
  });
}

const deleteCookies = ({ domain }) => {
  chrome.cookies.getAll({ domain }, (cookies) => {
    console.log("Clearing cookies for domain", domain, cookies);
    clearCookies({ cookies });
  });
}

export { deleteCookies };
