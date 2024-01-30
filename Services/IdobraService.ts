class IdobraService {

  private readonly LIMIT = 40;

  constructor(private repository: IdobrasRepository) { };

  /**
  * Method for get the artworks fit for one page
  *
  * params category -> category of the artworks
  * params offset -> position of the first element
  *
  * return ArtWork[] works of the category between the offset and the constant LIMIT
  */
  getArtWorks(category: Category, offset: number): ArtWork[] {

    const artworks: ArtWork = [];
    const array = arr.get(category);
    for (let i = offset; i < offset + this.LIMIT; i++) {
      let element = array[i];
      if (typeof element === 'number') {
        element = this.repository.getArtWork(element);
        array[i] = element;
      }
      artworks.push(element);
    }

    return artworks;
  }
}
