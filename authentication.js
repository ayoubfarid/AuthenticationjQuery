
//fonction permet de visualiser le mot de passe
function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function showPasswordRegister() {
  var x = document.getElementById("passregister");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
$(document).ready(function () {
  
  $("#btnRegister").click(function () {
    registerNewAccount()
  })
  $("#btnLogin").click(function () {
    loginToAccount()
})
})
const loginToAccount = () => {
  var password =$("#password").val();
  var email = $("#email").val();
  if (password.length > 0 && email.length > 0) {
    let user = {
      email: email,
      pass: hashPassword(password),
    };
    let accounts = [];
    accounts = getAccountsList();
    if (checkUserAccount(accounts, user)) {
      // commpte trouver
      alert("You logged Successefuly " + user.email);
    } else {
      alert(
        "password or email " +
          user.email +
          " is incorrect ! please sign up first"
      );
      $("#exampleModal").modal("show");
    }
    $("#password").html(" ")

    $("#email").html(" ") 
  }
};
//fonction de hashage du password
const hashPassword = (pass) => {
  return md5(pass);
};
const checkUserAccountSignUp = (accounts, user) => {
  if (accounts.filter((elem) => elem.email == user.email).length > 0)
    return true;
  else false;
};
const registerNewAccount = () => {
  let password = $("#passregister").val();
  let email = $("#emailregister").val();
  if (password.length > 0 && email.length > 0) {
    let user = {
      email: email,
      pass: hashPassword(password),
    };
    let accounts = [];
    accounts = getAccountsList();
    if (checkUserAccountSignUp(accounts, user)) {
      // commpte trouver
      alert("An email already existe with  " + user.email);
      $("#exampleModal").modal("hide");
    } else {
      accounts.push(user);
      updateAccountList(accounts);
      alert("Your have successefuly registred " + user.email);
      // let modal=getElementById("exampleModal");
      $("#exampleModal").modal("hide");
    }
  }
  $("#passregister").html(" ")

  $("#emailregister").html(" ")

  console.log(accounts);
};
//verifier l utilisateur dans la liste des compte retourne vrai si existe
//sinon false
const checkUserAccount = (accounts, user) => {
  if (
    accounts.filter(
      (elem) => elem.email == user.email && elem.pass == user.pass
    ).length > 0
  )
    return true;
  else false;
};
// fonction de login permet a utilisateur d'acceder a son compte via password et email

const getUserAccount = () => {};
//fonction de mise a jour de la liste des compte stocker localement
const updateAccountList = (accounts) => {
  localStorage.setItem("accounts", JSON.stringify(accounts));
};
//recuperer liste des compte stocker localement
const getAccountsList = () => {
  let accounts = [];
  if (!localStorage.getItem("accounts"))
    accounts = localStorage.setItem("accounts", JSON.stringify(accounts));
  else accounts = JSON.parse(localStorage.getItem("accounts"));
  return accounts;
};
