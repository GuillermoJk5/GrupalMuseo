class CategoriasService {
    private categoriasRepo = new CategoriasRepository();
    private arrayDepartment : Department[];

    public loadAllCategories(callback: (error: string | null, data: Department[] | null) => void): void {
        this.categoriasRepo.getAllCategories((error, data) => {
            if (error) {
                console.error("Error al realizar la llamada a la API: " + error);
                callback(error, null);
            } else {
                const categories = JSON.parse(data);
                const departments = categories.departments.map(department => new Department(department.departmentId, department.displayName));
                callback(null, departments);
            }
        });
    }
}