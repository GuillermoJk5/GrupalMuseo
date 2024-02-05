/**
 * Class responsible for retrieving department IDs and artwork data.
 */
class IdArtWorkService{
    /**
     * Retrieves department IDs and artwork data.
     * @param department - The department number.
     * @param callback - A function to handle the result or error of the retrieval process.
     */
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[] | null) => void): void {
        const departmentMap = DepartmentArtworkMap.getInstance();
        const idArtWorkRepository = new IdArtWorkRepository();
        // Check if the department IDs are already available in the department map
        if(departmentMap.getDepartment(department).length != 0){
            // If so, return the department IDs directly from the map
            callback(null,departmentMap.getDepartment(department));
            return;
        }
        // If the department IDs are not available, get them from the repository
        idArtWorkRepository.getDepartmentIds(department, (error, data) => {
            if (error) {
                callback(error, []);
            } else {
                // When successful, populate the department map with the retrieved data
                departmentMap.populate(department, data);
                callback(null, data);
            }
        });
    }
}