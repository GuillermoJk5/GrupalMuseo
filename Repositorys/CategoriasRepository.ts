//Repositorio para obtener las nombres y los ids de las Categorias del 

const urlApiCategorias : string = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
import $ from "jquery";

function getAllCategories(){
    $.getJSON(urlApiCategorias, function(data) {
        console.log("Respuesta JSON:", data);
        return data;
    })
    .fail(function(jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.error("Error al realizar la llamada a la API: " + err);
        return error;
    });
}

getAllCategories();