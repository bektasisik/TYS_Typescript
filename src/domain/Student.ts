class Student {
    name: string;
    surname: string;
    absence: number;

    constructor(name: string, surname: string, absence: number) {
        this.name = name;
        this.surname = surname;
        this.absence = absence;
    }
    showInfoStudent() {
        console.log(this.name + " " + this.surname + " " + this.absence);
    }
}
