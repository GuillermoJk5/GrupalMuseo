class ArtWorkService {
  private readonly LIMIT = 40;

  constructor(private repository: ArtWorkRepository) {}

  /**
   * Method for get the artworks fit for one page
   *
   * params departmentId -> id of the department of the artworks
   * params offset -> position of the first element
   * params callback -> function that specifies what happens when the function fails and when the ArtWorks are correctly fetched
   *
   */
  getArtWorks(
    departmentId: number,
    offset: number,
    callback: (error?: Error, artworks?: ArtWork[]) => void,
  ): void {
    const artworks: ArtWork[] = [];
    const departmentArtworks = DepartmentArtworkMap.getInstance();
    const array = departmentArtworks.getDepartment(departmentId);
    let completed = 0;

    for (let i = offset; i < offset + this.LIMIT; i++) {
      if (i === array.length) {
        departmentArtworks.populate(departmentId, array);
        callback(undefined, artworks);
      }
      let element = array[i];
      if (typeof element === "number") {
        this.repository.getArtWork(element, (error, artwork) => {
          if (typeof artwork === "undefined") {
            console.log(error);
          } else {
            artworks.push(artwork);
            array[i] = artwork;
            completed++;
            if (completed === this.LIMIT) {
              departmentArtworks.populate(departmentId, array);
              callback(undefined, artworks);
            }
          }
        });
      } else {
        artworks.push(element);
        completed++;
        if (completed === this.LIMIT) {
          departmentArtworks.populate(departmentId, array);
          callback(undefined, artworks);
        }
      }
    }
  }
}
