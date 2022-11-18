export class Student {
 
    id: number;
    name: string;
    surname: string;
    absent: number;

    constructor(id: number, name: string, surname: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.absent = 0;
    }
    increaseAbsent() {
        this.absent = this.absent + 1;
    }

    decreaseAbsent() {
        this.absent = this.absent - 1;
    }

    setName(name: string) {
        this.name = name;
    }
    setSurname(surname: string) {
        this.surname = surname;
    }

    showInfoStudent() {
        console.log(this.name + " " + this.surname + " " + this.absent);
    }
}
