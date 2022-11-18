export class Student {
 
    private _id: number;
    private _name: string;
    private _surname: string;
    private _absent: number;

    constructor(id: number, name: string, surname: string, absent: number) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._absent = absent;
    }
 
    public getId(): number {
        return this._id;
    }

    public getName(): string {
        return this._name;
    }

    public getSurname(): string {
        return this._surname;
    }

    public getAbsent(): number {
        return this._absent;
    }

    public setName(name: string) {
        this._name = name;
    }
    public setSurname(surname: string) {
        this._surname = surname;
    }

    public showInfoStudent() {
        console.log(this._name + " " + this._surname + " " + this._absent);
    }
}