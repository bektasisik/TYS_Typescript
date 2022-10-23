
import {Student} from "../domain/Student";

class StudentService{
    students!: Array<Student>;
    sequence:number = 1;

    addStudent(name:string,surname:string){
        let student = new Student(this.sequence++,name,surname)
        this.students.push(student);
    }

    getStudents():Array<Student>{
        return this.students;
    }
    getStudent(studentId:number){
        this.students.filter(student -> student.getId() == studentId).findFirst().orElseThrow();
    }
    
    updateStudent(studentId:number,name:string,surname:string){
        let student = this.getStudent(studentId);
        student.name = name;
        student.surname = surname;
    }
    deleteStudent(studentId: number){
        this.students.splice(studentId);
    }

}