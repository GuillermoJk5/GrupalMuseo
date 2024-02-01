class IdArtWorkRepository{
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[]) => void) {
        $.ajax({
            url: "https://collectionapi.metmuseum.org/public/collection/v1/objects",
            method: "GET",
            data: {
                departmentIds: department
            },
            dataType: "json",
            success: function (data) {
                callback(null, data.objectIDs.sort());
            },
            error: function () {
                callback(new Error('La solicitud no fue exitosa'), []);
            }
        });
    }    
}