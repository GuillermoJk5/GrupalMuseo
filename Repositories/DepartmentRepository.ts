/**
 * Clase encargada de recoger datos de los departamentos desde el endPoint de la Api
 */
class DepartmentRepository {
    private urlApiCategorias: string = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
    /**
     * 
     * @param callback Metodo que retorna lo que pasa segun la respuesta de la api, devuelve los datos o el codigo de error
     */
    public getAllCategories(callback: (error?: string, data?: string) => void): void {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", this.urlApiCategorias);
        ajax.onload = function () {
            if (this.status == 200) {
                callback(undefined, ajax.responseText);
            } else {
                callback("Ha ocurrido un problema: " + this.status + " " + this.statusText, undefined);
            }
        };

        ajax.send();
    }
}

/*const categoriasRepo = new CategoriasRepository();
categoriasRepo.getAllCategories(function(error, data) {
    if (error) {
        console.error("Error al realizar la llamada a la API: " + error);
    } else {
        console.log("Respuesta JSON:", data);
    }
});*/