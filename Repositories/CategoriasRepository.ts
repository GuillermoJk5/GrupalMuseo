/**
 * Repositorio para acceder a los datos de de la api, a las categorias 
 */

const urlApiCategorias: string = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
import $ from "jquery";

function getAllCategories() {
    $.getJSON(urlApiCategorias, function(data) {
        console.log("Respuesta JSON:", data);
    })
    .fail(function(jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.error("Error al realizar la llamada a la API: " + err);
    });
}

getAllCategories();
