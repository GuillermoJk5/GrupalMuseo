class DepartmentsArray {
    private static _instance: DepartmentsArray;
    array: Department[];
  
    private constructor() {
      this.array = [];
    }
  
    public static get instance(): DepartmentsArray {
      if (!this._instance) {
        this._instance = new DepartmentsArray();
      }
      return this._instance;
    }
  
    addItem(item: Department) {
      this.array.push(item);
    }
  
    getArray() {
      return this.array;
    }
  }