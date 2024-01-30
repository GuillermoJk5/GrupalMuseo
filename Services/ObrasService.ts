class ObraService {

  private readonly LIMIT = 40;

  constructor(private repository: ObrasRepository) { };

  /**
  * Method for get the artworks fit for one page
  *
  * params category -> category of the artworks
  * params offset -> position of the first element
  * params callback -> function that specifies what happens when the function fails and when the ArtWorks are correctly fetched
  *
  */
  getArtWorks(department: Department, offset: number, callback: (error: Error | null, artworks: ArtWork[]) => void): void {
    const artworks: ArtWork[] = [];
    // const array = arr.get(department);
    // let completed = 0;
    //
    // for (let i = offset; i < offset + this.LIMIT; i++) {
    //   let element = array[i];
    //   if (typeof element === 'number') {
    //     this.repository.getArtWork(element, (error, artwork) => {
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         artworks.push(artwork);
    //         completed++;
    //         if (completed === this.LIMIT) {
    //           callback(null, artworks);
    //         }
    //       }
    //     });
    //   } else {
    //     artworks.push(element);
    //     completed++;
    //     if (completed === this.LIMIT) {
    //       callback(null, artworks);
    //     }
    //   }
    // }
    this.repository.getArtWork(1, (error, artwork) => {
      if (error) {
        console.log(error);
      } else {
        artworks.push(artwork);
        callback(null, artworks);
      }

    })
  }
}
