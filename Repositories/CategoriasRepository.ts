class CategoriasRepository {
    private urlApiCategorias: string = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

    public getAllCategories(callback: (error: string, data: string) => void): void {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", this.urlApiCategorias);
        ajax.onload = function () {
            if (this.status == 200) {
                callback(null, ajax.responseText);
            } else {
                callback("Ha ocurrido un problema: " + this.status + " " + this.statusText, null);
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