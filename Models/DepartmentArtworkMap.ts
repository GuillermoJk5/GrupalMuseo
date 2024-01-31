/**
* Singleton class with a dictionary that the key is the id of a deparment and the value is an array with the artworks of that department
*/
class DepartmentArtworkMap {

  private static instance: DepartmentArtworkMap;
  private map: { [key: number]: artWork[] } = {};

  private constructor() { }

  public static getInstance(): DepartmentArtworkMap {
    console.log("la")
    if (!this.instance) {
      console.log("Hola")
      DepartmentArtworkMap.instance = new DepartmentArtworkMap();
    }

    return DepartmentArtworkMap.instance;
  }

  /*
  * Method to generate the keys of the dictionary
  *
  * param departmentIds -> ids of the departments
  */
  public generate(departmentIds: number[]) {
    departmentIds.map(id => this.map[id] = []);
  }

  /*
  * Method to populate a department with it's artworks
  *
  * param departmentId -> id of the wanted department
  * param artwork -> artworks of the specified department
  */
  public populate(departmentId: number, artwork: artWork[]) {
    this.map[departmentId] = artwork;
  }

  /*
  * Method to get the artworks of the specified department
  *
  * param departmentId -> id of the wanted department
  */
  public getDepartment(departmentId: number): artWork[] {
    if (typeof this.map[departmentId] === undefined) return [];

    return this.map[departmentId];
  }
}
