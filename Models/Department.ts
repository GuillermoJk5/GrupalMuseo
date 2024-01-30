class Department {
    
    private _id: number;
    private _nombre: string;

    constructor(id: number, nombre: string) {
        this._id = id;
        this._nombre = nombre;
    }

    get id(): number {
        return this._id;
    }

    set id(newId: number) {
        this._id = newId;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(newNombre: string) {
        this._nombre = newNombre;
    }
}