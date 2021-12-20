import "bootstrap/dist/css/bootstrap.css";
import { Tab } from "bootstrap";
import "../css/style.css";
import { registerUI, loginUI } from "./config/ui.config";
import { validate } from "./helpers/validate";
import { removeInputError, showInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import { register } from "./services/register.service";
import {
  optionCountryTemplate,
  optionCityTemplate,
  serializeCountries,
} from "./views/register_form";
import { getCountries } from "./services/countries.service";
import { getCities } from "./services/cities.service";

const { loginForm, loginEmail, loginPassword } = loginUI;
const loginInputs = [loginEmail, loginPassword];

const {
  regForm,
  regEmail,
  regPassword,
  regNickname,
  regFirstname,
  regLastname,
  regPhone,
  regGender,
  regCity,
  regCountry,
  birthday,
  birthmonth,
  birthyear,
} = registerUI;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onLoginSubmit();
});
loginInputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

async function loadListCountries() {
  let countries = await getCountries();
  countries = serializeCountries(countries);
  countries.forEach((country) => {
    const option = optionCountryTemplate(country);
    regCountry.insertAdjacentHTML("beforeend", option);
  });
}

async function loadListCities() {
  regCountry.addEventListener("change", (e) => {
    regCity.removeAttribute("disabled");
    regCity.innerHTML = "";
    const id = e.target.value;
    (async function () {
      const cities = await getCities(id);
      for (let i = 0; i < cities.length; i++) {
        const option = optionCityTemplate({ id: i + 1, city_name: cities[i] });
        regCity.insertAdjacentHTML("beforeend", option);
      }
    })();
  });
}

loadListCountries();
loadListCities();

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onRegisterSubmit();
});

async function onLoginSubmit() {
  const isValidForm = loginInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(loginEmail.value, loginPassword.value);
    await getNews();
    notify({ msg: "Login success", className: "alert-success" });
    form.reset();
  } catch (err) {
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}

async function onRegisterSubmit() {
  const isValidEmail = validate(regEmail);
  if (!isValidEmail) {
    showInputError(regEmail);
  }
  const isValidPassword = validate(regPassword);
  if (!isValidPassword) {
    showInputError(regPassword);
  }

  if (!isValidEmail && !isValidPassword) {
    return;
  }

  try {
    const user = {
      email: regEmail.value,
      password: regPassword.value,
      nickname: regNickname.value,
      first_name: regFirstname.value,
      last_name: regLastname.value,
      phone: regPhone.value,
      gender_orientation: regGender.options[regGender.selectedIndex].text,
      city: regCity.options[regCity.selectedIndex].text,
      country: regCountry.options[regCountry.selectedIndex].text,
      date_of_birth_day: birthday.value,
      date_of_birth_month: birthmonth.value,
      date_of_birth_year: birthyear.value,
    };
    const response = await register(user);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

var triggerTabList = [].slice.call(document.querySelectorAll("#myTab button"));
triggerTabList.forEach((triggerEl) => {
  var tabTrigger = new Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});
