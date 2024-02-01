class IdArtWorkService{
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[] | null) => void): void {
        const departmentMap = DepartmentArtworkMap.getInstance();
        const idArtWorkRepository = new IdArtWorkRepository();
        if(departmentMap.getDepartment(department).length != 0){
            callback(null,departmentMap.getDepartment(department));
            return;
        }
        idArtWorkRepository.getDepartmentIds(department, (error, data) => {
            if (error) {
                console.error(error);
                callback(error, []);
            } else {
                departmentMap.populate(department, data);
                callback(null, data);
            }
        });
    }
}