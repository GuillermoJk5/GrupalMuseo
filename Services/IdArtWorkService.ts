class IdArtWorkService{
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[]) => void): void {
        const idArtWorkRepository = new IdArtWorkRepository();
        idArtWorkRepository.getDepartmentIds(department, (error, data) => {
            if (error) {
                console.error(error);
                callback(error, []);
            } else {
                callback(null, data);
            }
        });
    }
}