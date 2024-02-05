/**
 * Clase encargada de llamar a DepartmentRepository y trabajar con los datos que devuelve, para que puedan ser utilizados
 * en el resto del programa.
 */
class DepartmentService {
    private categoriasRepo = new DepartmentRepository();
    /**
     * Metodo que que en caso de error devulve el error producido y en caso de exito carga los id de los departamentos en 
     * el departamentMap y ademas devuelve los id en un map diferente al llamar la funcion.
     * @param callback 
     */
    public loadAllCategories(callback: (error?: string | undefined, data?: Department[] | undefined) => void): void {
        this.categoriasRepo.getAllCategories((error, data) => {
            if (typeof data === "undefined" ) {
                console.error("Error al realizar la llamada a la API: " + error);
                callback(error, undefined);
            } else {
                const departmentMap = DepartmentArtworkMap.getInstance();
                const categories = JSON.parse(data);
                const departments = categories.departments.map((department : any )=> new Department(department.departmentId, department.displayName));
                departmentMap.generate(departments.map((department: { departmentId: string; }) => parseInt(department.departmentId)));
                callback(undefined, departments);
            }
        });
    }
}