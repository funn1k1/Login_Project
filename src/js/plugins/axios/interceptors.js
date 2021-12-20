const tokenKey= "my_app_token";

function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes("login");
  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(tokenKey, token);
  }

  return res;
}

function setToken(req) {
  const isAuthUrl = req.url.includes("auth");
  if (!isAuthUrl) {
    const token = localStorage.getItem(tokenKey);
    req.headers["x-access-token"] = token
  }
  return req;
}

function getClearResponse(res) {
  return res.data;
}



export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse);
}