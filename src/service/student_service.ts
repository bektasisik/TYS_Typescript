import { Student } from "../domain/student";
import fetch from 'node-fetch';

var apiUrl: string = 'http://localhost:8080/api/v1/students';
var regName = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{3,20}$/;
var regSurname = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{2,20}$/;

export class StudentService {
    private _students: Student[] = [];

    public async getStudents(): Promise<Student[]> {
        const response = await fetch(apiUrl , {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        this._students = [];
        result.forEach((student: any) => {
            this._students.push(new Student(student.id, student.name, student.surname, student.absent));
        });
        return this._students;
    }

    public async getStudent(id: number): Promise<Student> {
        const response = await fetch(apiUrl + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        return new Student(result.id, result.name, result.surname, result.absent);
    }

    public async addStudent(name: string, surname: string) {
        this.validateStudent(name, surname);
        const response = await fetch(apiUrl , {
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

    }

    public async updateStudent(student: Student, name: string, surname: string) {
        this.validateStudent(name, surname);
        const response = await fetch(apiUrl + '/' + student.getId(), {
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
    }

    public async validateStudent(name: string, surname: string): Promise<void> {
        if (!(this.isValid(name, surname))) {
            throw new Error("Name or surname is not valid");
        }
    }

    public async isValid(name: string, surname: string): Promise<boolean> {
        return regName.test(name) && regSurname.test(surname);
    }


    public async deleteStudent(studentId: number): Promise<void> {
        const response = await fetch(apiUrl + '/' + studentId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
    }
}