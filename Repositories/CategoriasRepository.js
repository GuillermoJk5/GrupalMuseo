"use strict";
/**
 * Repositorio para acceder a los datos de de la api, a las categorias
 */
Object.defineProperty(exports, "__esModule", { value: true });
var urlApiCategorias = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
var jquery_1 = require("jquery");
function getAllCategories() {
    jquery_1.default.getJSON(urlApiCategorias, function (data) {
        console.log("Respuesta JSON:", data);
    })
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("Error al realizar la llamada a la API: " + err);
    });
}
getAllCategories();
