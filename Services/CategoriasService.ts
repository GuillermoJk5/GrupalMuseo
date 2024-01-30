class CategoriasService {
    private categoriasRepo = new CategoriasRepository();

    public loadAllCategories() {
        this.categoriasRepo.getAllCategories(function(error, data) {
            if (error) {
                console.error("Error al realizar la llamada a la API: " + error);
            } else {
                console.log("Respuesta JSON:", data);
            }
        });
    }
}