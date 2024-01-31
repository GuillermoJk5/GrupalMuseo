class IdArtWorkService{
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[] | null) => void): void {
        const idArtWorkRepository = new IdArtWorkRepository();
        idArtWorkRepository.getDepartmentIds(department, (error, data) => {
            if (error) {
                console.error(error);
                callback(error, []);
            } else {
                const departmentMap = DepartmentArtworkMap.getInstance();
                departmentMap.populate(department, data);
                callback(null, data);
            }
        });
    }
}