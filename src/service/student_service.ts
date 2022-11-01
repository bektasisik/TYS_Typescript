import { Student } from "../domain/student";
import fetch from 'node-fetch';

var apiUrl: string = 'http://localhost:3002/api/v1';

export class StudentService {
    private _students: Array<Student> = [];
    private _sequence: number = 1;

    constructor() {
        this.getStudents();
    }

    async getStudents() : Promise<Array<Student>> {
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
        const getResult = <Student[]>JSON.parse(JSON.stringify(result, null, 4));

        this._students = getResult as Array<Student>;

        console.log(result);
        return this._students;
    }


    async addStudent(name: string, surname: string) {
        const response = await fetch(apiUrl + '/students', {
            method: 'POST',
            headers: {
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
        console.log('result is: ', JSON.stringify(result, null, 4));
        return result;
    }


    getStudent(studentId: number): Student | undefined {
        window.fetch(apiUrl + 'students' + studentId, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            }
            );
        return this._students.find(student => student.id === studentId);
    }

    async updateStudent(studentId: number, name: string, surname: string) {
        const response = await fetch(apiUrl + '/students/' + studentId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: studentId,
                name: name,
                surname: surname
            }),
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));
    }

    async deleteStudent(studentId: number) {
        const response = await fetch(apiUrl + '/students/1', {
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

        console.log('result is: ', JSON.stringify(result, null, 4));
    }
}
