import { Student } from "../domain/Student";

export class StudentService {
    students!: Array<Student>;
    sequence: number = 1;

    addStudent(name: string, surname: string) {
        let student = new Student(this.sequence++, name, surname)
        this.students.push(student);
    }

    getStudents(): Array<Student> {
        return this.students;
    }
    getStudent(studentId: number): Student {
        return this.students.filter(student => student.id === studentId)[0];
    }

    updateStudent(studentId: number, name: string, surname: string) {
        let student = this.getStudent(studentId);
        student.setName(name);
        student.setSurname(surname);
    }
    deleteStudent(studentId: number) {
        this.students.splice(studentId);
    }

}