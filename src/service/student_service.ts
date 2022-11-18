import { Student } from "../domain/student";
import fetch from 'node-fetch';
import { validate } from "schema-utils";

var apiUrl: string = 'http://localhost:3000/api/v1';
var regName = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{3,20}$/;
var regSurname = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{2,20}$/;

export class StudentService {
    private _students: Student[] = [];
    private _sequence: number = 0;


    constructor() {
    }

    async fetchStudents(): Promise<Student[]> {
        const response = await fetch(apiUrl + '/students', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        result.forEach((object: any) => {
            this._students.push(new Student(Number.parseInt(object.id), object.name, object.surname));
        });
        this._sequence = this._students.length;
        return this._students;
    }

    getStudents(): Array<Student> {
        return this._students;
    }

    async addStudent(name: string, surname: string) {
        this.validateStudent(name, surname);
        const response = await fetch(apiUrl + '/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this._sequence++,
                name: name,
                surname: surname,
                absent: 0
            }),
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('result is: ', JSON.stringify(result));
        const student = new Student(this._sequence, name, surname);
        this._students.push(student);
    }

    async updateStudent(student: Student, name: string, surname: string) {
        this.validateStudent(name, surname);
        const response = await fetch(apiUrl + '/students/' + student.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                surname: surname
            }),
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('result is: ', JSON.stringify(result));
        student.name = name;
        student.surname = surname;
    }

    validateStudent(name: string, surname: string) {
        if (!(this.isValid(name, surname))) {
            throw new Error("Name or surname is not valid");
        }
    }

    isValid(name: string, surname: string): boolean {
        return regName.test(name) && regSurname.test(surname);
    }


    async deleteStudent(studentId: number) {
        const response = await fetch(apiUrl + '/students/' + studentId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('result is: ', JSON.stringify(result));
        const students = this._students.filter(student => student.id !== studentId);
        this._students = students;
    }

    async deleteStudentWithId(studentId: number) {
        const response = await fetch(apiUrl + '/students/' + studentId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result));
        const students = this._students.filter(student => student.id !== studentId);
        this._students = students;
    }
}
