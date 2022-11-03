import { Student } from "./student";
import { Attendance } from "./attendance";
export class StudentAttendance {
    student: Student;
    attendance: Attendance;
    isAbsence: Boolean;

    constructor(student: Student, attendance: Attendance, isAbsence: Boolean) {
        this.student = student;
        this.attendance = attendance;
        this.isAbsence = isAbsence;
    }

    getAttendance():Attendance{
        return this.attendance;
    }
    getStudent():Student{
        return this.student;
    }

    getIsAbsenceToString(): string {
        return this.isAbsence ? "Var" : "Yok";
    }

    showInfoStudentAttendance() {
        console.log(this.student + " " + this.attendance + " " + this.getIsAbsenceToString);
    }
}