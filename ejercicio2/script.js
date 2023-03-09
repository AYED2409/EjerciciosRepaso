const inputEmail = document.getElementById('email');
const inputPasswd = document.getElementById('passwd');
const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin')
const alert = document.getElementById('alert');
const target = document.getElementById('target');
const titulo = document.getElementById('titulo');
var urlRegister= "http://localhost:3000/register"
var urlLogin= "http://localhost:3000/login";

btnRegister.addEventListener("click", async() => {
    var user = {
        email:inputEmail.value,
        password:inputPasswd.value
    }
    var result = await registerLoginPost(urlRegister, user);
    if(!result.error) {
        alert.classList.remove('alert-danger');
        alert.classList.add('alert-success');
        alert.innerHTML = "usuario creado correctamente <a href='./login.html'>Login</a>";
        inputEmail.value = "";
        inputPasswd.value = "";
    }else {
        alert.classList.add('alert-danger');
        alert.innerHTML = result.error;
    }
}, false);
btnLogin.addEventListener("click", async() => {
    var user = {
        email:inputEmail.value,
        password:inputPasswd.value
    }
    var result = await registerLoginPost(urlLogin, user);
    if(!result.error) {
        target.style.display = "none"
        titulo.innerHTML = `Welcome ${user.email}`; 
    }else {
        alert.classList.add('alert-danger');
        alert.innerHTML = result.error;
    }
})

const registerLoginPost = async(url, user) => {
    let r;
    try {
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res) => res.json())
          .then((data) => {r=data;})
    } catch(e) {
        console.log(e);
    }
    return r;
}