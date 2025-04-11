const main = document.getElementsByTagName("main").item(0);
const modalTitulo = document.getElementById("modalTitulo");
const modalBody = document.getElementsByClassName("modal-body").item(0);
const ulMenu = document.getElementById("ulMenu");
//main.style.display="flex";
//La diagonal al final es importante.
const URLmain = "https://fakestoreapi.com/products/";
//Obtener datos
getData();
//Rellena el botón de categorías
getCategories();

function getData(cat="") {
  const options = { method: "GET" };
  fetch(URLmain+cat, options) // crea una promesa que de cumplirse genera un objeto de tipo response
    .then((response) => {
      //json(): Regresa otra promesa ya que no sabemos cuánto tardará en convertir
      response.json().then((res) => {
        main.innerHTML="";
        res.forEach(createCards);
      });
    })//then
    .catch((err) => {
      // La promesa no se cumple y lanza el error.
      main.insertAdjacentElement(
        "beforeend",
            `
            <div class="alert alert-danger" role="alert">
              ${err.message}
            </div>
            `
      );
    })//catch;
} //getData

function createCards(prods) {
  main.insertAdjacentHTML(
    "beforeend",
        `
        <div id="${prods.id}" class="card p-2" style="width: 18rem;">
            <div class="ratio ratio-1x1">
                <img src="${prods.image}" class="card-img-top" alt="">
            </div>        
            <div class="card-body d-flex flex-wrap justify-content-center gap-3">
                <h5 class="card-title">${prods.title}</h5>
                <p class="card-text text-truncate text-break">${
                  prods.description
                }</p>
                <button type="button" onclick=modalProducto(event)  class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modalDescripcion">
                    Saber más...
                </button>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">$ ${prods.price}</li>
                <li class="list-group-item">⭐ ${prods.rating.rate} (${
                prods.rating.count
                }) </li>
                <li class="list-group-item">${prods.category.toUpperCase()}</li>
            </ul>
        </div>
        `);//insertAdjacentHTML
} //createCards()

function modalProducto(event) {
  event.preventDefault();
  //let nombreProducto = event.target.parentElement.getElementsByTagName("h5").item(0).innerText.trim();
  //let producto = productos.find(producto=> producto.title === nombreProducto);
  const contenedorPadre = event.target.parentElement;
  modalTitulo.innerText = contenedorPadre
    .getElementsByTagName("h5")
    .item(0)
    .innerText.trim();
  modalBody.innerText = contenedorPadre
    .getElementsByTagName("p")
    .item(0)
    .innerText.trim();
};//modalProducto

function getCategories() {
  const options = { "method": "GET" };
  fetch(URLmain+"categories/", options) // crea una promesa que de cumplirse genera un objeto de tipo response
    .then((response) => {
      //json(): Regresa otra promesa ya que no sabemos cuánto tardará en convertir
      response.json().then((res) => {
        res.forEach(cat=>{
          ulMenu.insertAdjacentHTML("afterbegin",`
              <li><a class="dropdown-item" style="cursor: pointer;" onclick="getData('category/${cat.replace("'","%27")}');">${cat}</a></li>
            `);
        });//foreach
      });
    })//then
    .catch((err) => {
      // La promesa no se cumple y lanza el error.
      main.insertAdjacentElement(
        "beforeend",
            `
            <div class="alert alert-danger" role="alert">
              ${err.message}
            </div>
            `
      );
    })//catch;
} //getCategories
