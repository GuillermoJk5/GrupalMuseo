class CategoriasService {
    private categoriasRepo = new CategoriasRepository();

    public loadAllCategories() {
        this.categoriasRepo.getAllCategories((error, data) => {
            if (error) {
                console.error("Error al realizar la llamada a la API: " + error);
            } else {
                const categories = JSON.parse(data);
                const singletonArray = DepartmentsArray.instance;
    
                categories.departments.forEach(department => {
                    const newDepartment = new Department(department.departmentId, department.displayName);
                    singletonArray.addItem(newDepartment);
                });
            }
        });
    }
}