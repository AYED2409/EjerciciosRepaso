const chiste = document.getElementById('chiste');
const respuetaChiste = document.getElementById('respuesta');
const btn = document.getElementById('btn');
const url = "https://official-joke-api.appspot.com/random_joke";
var respuesta;
btn.addEventListener('click', () => {
    respuetaChiste.innerHTML = respuesta;
})
const getchiste = async() => {
    await fetch(url)
            .then( res => res.json())
            .then( data => {chiste.innerHTML=data.setup;
                            respuesta=data.punchline;
            })
            .catch(error => console.log(error));
}
getchiste();