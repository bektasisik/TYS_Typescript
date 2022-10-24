import { Student } from "./Student";
import { Attendance } from "./Attendance";
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

    getIsAbsenceToString(isAbsence: boolean): string {
        return isAbsence ? "Var" : "Yok";
    }

    showInfoStudentAttendance() {
        console.log(this.student + " " + this.attendance + " " + this.getIsAbsenceToString);
    }
}