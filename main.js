

let pagina = 1;
const btnAnterior = document.querySelector("#btnAnterior")
const btnSiguiente = document.querySelector("#btnSiguiente")

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
pagina += 1;
cargarPelis();
}
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
pagina -= 1;
cargarPelis();
}
});

const cargarPelis = async () =>{
try {
//en las funciones async, se trabaja con try y catch


const respuesta =  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ba00a4b29630e70ab57e087fbc0bdec4&language=es-MX&page=${pagina}`)
//fetch lo que hace es traer info de la url
//cuando se usa fetch nos devuelve una promesa.
//await: lo vuelve asincrono. async van de la mano

console.log(respuesta);
if(respuesta.status === 200){
const datos = await respuesta.json();


//El método forEach() recorre cada elemento de un array y 
// ejecuta una función por cada uno de ellos. 
// En este caso, pelicula representa 
// cada elemento dentro de data.results,
//  y con console.log(pelicula.title) se imprime el título de cada película.


let peliculas = '';
datos.results.forEach(pelicula => {
    peliculas +=`
    <div class ="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h2 class ="titulo">${pelicula.title}</h2>
    </div>
    
    `;
    
    
});
document.getElementById('contenedor').innerHTML = peliculas
// console.log(datos.overview);
// console.log(datos.id);
// console.log(datos.popularity);



}else if(respuesta.status ===401){
    console.log('error en la clave');
    

} else if(respuesta.status === 404){
    console.log('la peli que buscas NO EXISTE');
    
}





} catch (error){
    //tiene que ir a huevo catch con el try en catch captura el error
    console.log(error);
    
// este error, se muestra si hay pedos con la llave, de auteticacion, o no encontro lo solicitado.
}

}
cargarPelis();

const languageBtn = document.querySelector('.language-btn');
const languageList = document.querySelector('.language-list');

languageBtn.addEventListener('click', () => {
  languageList.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.language-menu')) {
    languageList.classList.remove('active');
  }
});

