# Manejo de Promesas
## _Saul Omar Arguello Hernandez_


En esta página se puso en práctica el uso de las siguientes tecnologias

- Promesas: then/catch.
- Solicitudes a una API: fetch().
- Inserción de HTML mediante JS: Tarjetas y modales.

## Funcionalidad

- Se obtiene una lista de productos desde [FakeAPIStore](https://fakestoreapi.com/products)
- Una función se encarga de crear e insertar cada tarjeta a partir del arreglo de productos obtenido del paso anterior
- Para ahorrar espacio se colocó la descripción completa de los productos en un modal activado por un botón contenido en cada tarjeta de forma individual.

## Tecnologías

- JavaScript: Lógica de la página web
- HTML/BootStrap: Libreria de componentes HTML.
- APIs: La información se obtiene de manera remota.

```javascript
function getData() {
  const options = { method: "GET" };
  fetch(URLmain, options) // crea una promesa que de cumplirse genera un objeto de tipo response
    .then((response) => {
      //json(): Regresa otra promesa ya que no sabemos cuánto tardará en convertir
      response.json().then((res) => {
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
```

## Vista previa
![Productos](./images/catalogo.webp)