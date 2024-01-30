class IdArtWorkRepository{
    getDepartmentIds(department: number, callback: (error: Error | null, data: ArtWork[] | null) => void) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=" + department, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                var responseData = JSON.parse(xhr.responseText);
                callback(null, responseData);
            } else {
                callback(new Error('La solicitud no fue exitosa'), null);
            }
        };
    
        xhr.onerror = function () {
            callback(new Error('Error de red'), null);
        };
    
        xhr.send();
    }
}