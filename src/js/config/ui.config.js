const loginUI = {
  loginForm: document.forms["loginForm"],
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
};

const registerUI = {
  regForm: document.forms["registerForm"],
  regEmail: document.getElementById("email"),
  regPassword: document.getElementById("password"),
  regNickname: document.getElementById("nickname"),
  regFirstname: document.getElementById("firstname"),
  regLastname: document.getElementById("lastname"),
  regPhone: document.getElementById("phone"),
  regGender: document.getElementById("gender"),
  regCity: document.getElementById("city"),
  regCountry: document.getElementById("country"),
  birthday: document.getElementById("birthday"),
  birthmonth: document.getElementById("birthmonth"),
  birthyear: document.getElementById("birthyear"),
}

export { loginUI, registerUI };