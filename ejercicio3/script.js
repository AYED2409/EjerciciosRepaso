const inputEmailLogin = document.getElementById('emailLogin');
const inputEmailRegister = document.getElementById('emailRegister');
const inputPasswdLogin = document.getElementById('passwdLogin');
const inputPasswdRegister = document.getElementById('passwdRegister');
const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');
const navProtected = document.getElementById('navProtected');
const navRegister = document.getElementById('navRegister');
const navLogin = document.getElementById('navLogin');
const navHome = document.getElementById('navHome');
const alert = document.getElementById('alert');
const alertRegister = document.getElementById('alertRegister');
const target = document.getElementById('target');
const targetRegister = document.getElementById('targetRegister');
const title = document.getElementById('title');
const titleRegister = document.getElementById('titleRegister');
const titleProtected = document.getElementById('titleProtected');
const index = document.getElementById('index');
const login = document.getElementById('login');
const register = document.getElementById('register');
const protected = document.getElementById('protected');
var urlRegister = "http://localhost:3000/register"
var urlLogin = "http://localhost:3000/login";
var urlProtected = "http://localhost:3000/protected";
var token = null;
navHome.addEventListener("click", () => {
    buildInterface("index");
}, false);
navLogin.addEventListener("click", () => {
    buildInterface("login");
}, false);
navRegister.addEventListener("click", () => {
    buildInterface("register");
}, false);
navProtected.addEventListener("click", () => {
    buildInterface("protected");
}, false);
btnRegister.addEventListener("click", async() => {
    var user = {
        email:inputEmailRegister.value,
        password:inputPasswdRegister.value
    };
    var result = await registerLoginPost(urlRegister, user);
    if(!result.error) {
        alertRegister.classList.remove('alert-danger');
        alertRegister.classList.add('alert-success');
        alertRegister.innerHTML = `${result.message} <a href='./'>Login</a>`;
        inputEmailRegister.value = "";
        inputPasswdRegister.value = "";
    }else {
        alertRegister.classList.add('alert-danger');
        alertRegister.innerHTML = result.error;
    }
}, false);
btnLogin.addEventListener("click", async() => {
    var user = {
        email:inputEmailLogin.value,
        password:inputPasswdLogin.value
    };
    var result = await registerLoginPost(urlLogin, user);
    if(!result.error) {
        target.style.display = "none";
        title.innerHTML = `Welcome ${user.email}`;
        token = result.token;
    }else {
        alert.classList.add('alert-danger');
        alert.innerHTML = result.error;
    }
});
navProtected.addEventListener("click", async() => {
    let res = await routeProtected(urlProtected, token);
    if(!res.error) {
        titleProtected.innerHTML = res.message;
    }else {
        titleProtected.innerHTML = res.error;
    }
})
const registerLoginPost = async(url, user) => {
    let r;
    try {
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json',
            }
        }).then((res) => res.json())
          .then((data) => {r=data;})
    } catch(e) {
        console.log(e);
    }
    return r;
}
const routeProtected = async (url, tkn) => {
    let res;
    await fetch(url,{
            method:'get',
             headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+tkn
            }
        }).then(res => res.json())
          .then(data => {res=data; })
    return res;
}
function buildInterface(option) {
    switch (option) {
        case 'index':
            index.style.display="block";
            login.style.display= "none";
            register.style.display= "none";
            protected.style.display= "none";
            break;
        case 'login':
            login.style.display="flex";
            register.style.display="none";
            index.style.display="none";
            protected.style.display= "none";
            break;
        case 'register':
            if(token) {
                titleRegister.innerHTML ="You are register";
                targetRegister.style.display="none";
            }
            register.style.display="flex";
            login.style.display ="none";
            index.style.display="none";
            protected.style.display= "none";
            break;
        case 'protected' :
            protected.style.display= "flex";
            register.style.display="none";
            index.style.display="none";
            login.style.display="none";
    }
}
buildInterface('index');