/**
 * Class that retrieves department IDs from the Met Museum API.
 */
class IdArtWorkRepository{
    /**
     * Retrieves department IDs from the Met Museum API.
     * @param department - The department number.
     * @param callback - A function to handle the result or error of the AJAX request.
     */
    getDepartmentIds(department: number, callback: (error: Error | null, data: artWork[]) => void) {
        $.ajax({
            url: "https://collectionapi.metmuseum.org/public/collection/v1/objects",
            method: "GET",
            data: {
                departmentIds: department
            },
            dataType: "json",
            success: function (data) {
                // Sort the object IDs before passing them to the callback
                callback(null, data.objectIDs.sort());
            },
            error: function () {
                // Handle errors by calling the callback with an Error object and an empty array
                callback(new Error('The request was unsuccesfull'), []);
            }
        });
    }    
}