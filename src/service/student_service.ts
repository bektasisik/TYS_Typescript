import { Student } from "../domain/student";
import fetch from 'node-fetch';

var apiUrl: string = 'http://localhost:3002/api/v1';

export class StudentService {
    private _students: Array<Student> = [];
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
        this._students = <Student[]>JSON.parse(JSON.stringify(result));
        this._sequence = this._students.length;
        return this._students;
    }

    getStudents(): Array<Student> {
        return this._students;
    }

    async addStudent(name: string, surname: string) {
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

    async addStudentWithId(id: number, name: string, surname: string) {
        const response = await fetch(apiUrl + '/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
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
        const student = new Student(id, name, surname);
        this._students.push(student);
    }

    getStudent(studentId: number): Student | undefined {
        window.fetch(apiUrl + '/students/' + studentId, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            }
            );
        return this._students.find(student => student.id === studentId);
    }

    getStudentById(studentId: number): Student | undefined {
        return this._students.find(student => student.id === studentId);
    }

    async updateStudent(student: Student, name: string, surname: string) {
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
