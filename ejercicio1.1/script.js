var tabla = document.getElementById('cuerpoTabla');
var fragment = document.createDocumentFragment();
var listaChistes = [];
const url = "https://official-joke-api.appspot.com/random_joke";
const getchiste = async(num) => {
    for(let i=0;i<num;i++) {
        await fetch( url )
            .then( res => res.json() )
            .then( data => {console.log(data);
                    listaChistes.push(data);
            })
            .catch(error => console.log(error));
    }
}
function completarTabla() {
    let num = 0;
    listaChistes.forEach((item) => {
        num++;
        let tr = document.createElement('tr');
        let tdnum = document.createElement('td');
        let td =document.createElement('td');
        let td2 =document.createElement('td');
        tdnum.innerHTML=num;
        td.innerHTML=item.setup;
        td2.innerHTML=item.punchline;
        tr.appendChild(tdnum);
        tr.appendChild(td);
        tr.appendChild(td2);
        fragment.appendChild(tr);
    })
    tabla.appendChild(fragment);
    console.log(fragment);
}
const init = async(nChistes) => {
    await getchiste(nChistes);
    completarTabla();
}
init(10);