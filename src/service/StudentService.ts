import {Student} from "../domain/Student";

export class StudentService {
    private _students: Array<Student> = [];
    private _sequence: number = 1;

    constructor() {
        this.addStudent("Ahmet", "Yılmaz");
        this.addStudent("Mehmet", "Yılmaz");
        this.addStudent("Ali", "Yılmaz");
        this.addStudent("Veli", "Yılmaz");
    }

    addStudent(name: string, surname: string) {
        const student = new Student(this._sequence++, name, surname)
        this._students.push(student);
    }

    getStudents(): Array<Student> {
        return this._students;
    }

    getStudent(studentId: number): Student {
        return this._students.filter(student => student.id === studentId)[0];
    }

    updateStudent(studentId: number, name: string, surname: string) {
        const student = this.getStudent(studentId);
        student.name = name;
        student.surname = surname;
    }

    deleteStudent(studentId: number) {
        this._students = this._students.filter(student => student.id !== studentId);
    }

   /*  getStudents = async () => {
        const response = await fetch('http://localhost:3002/api/students');
        const data = await response.json();
        return data;
    }
    
    addStudent = async (name: string, surname: string) => {
        const student = new Student(this._sequence++, name, surname)
        this._students.push(student);
        const response = await fetch('http://localhost:3002/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, surname: surname})
        });
        const data = await response.json();
        return data;
    }
    
    updateStudent = async (studentId: number, name: string, surname: string) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, surname: surname})
        });
        const data = await response.json();
        return data;
    }
    
    deleteStudent = async (studentId: number) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    
    getStudent = async (studentId: number) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId);
        const data = await response.json();
        return data;
    } */
}