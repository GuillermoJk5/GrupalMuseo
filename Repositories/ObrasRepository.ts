class ObrasRepository {

  readonly url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

  /**
  * Method for get the artwork with the passed id
  *
  * params id -> id of the artwork wanted
  * params callback -> function that specifies what happens when the function fails and when the ArtWork is correctly fetched
  * 
  */
  getArtWork(id: number, callback: (error: Error, artwork: ArtWork) => void): void {
    $.getJSON(this.url + id, (response) => {
      console.log(response);
      callback(null, response);
    }).fail(_ => callback(new Error("Failed to fetch artwork"), null));
  }
}
