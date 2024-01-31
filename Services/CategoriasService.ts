class CategoriasService {
    private categoriasRepo = new CategoriasRepository();

    public loadAllCategories(callback: (error?: string | undefined, data?: Department[] | undefined) => void): void {
        this.categoriasRepo.getAllCategories((error, data) => {
            if (typeof data === "undefined" ) {
                console.error("Error al realizar la llamada a la API: " + error);
                callback(error, undefined);
            } else {
                const categories = JSON.parse(data);
                const departments = categories.departments.map((department : any )=> new Department(department.departmentId, department.displayName));
                callback(undefined, departments);
            }
        });
    }
}