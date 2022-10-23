class StudentAttendance {
    student: Student;
    attendance: Attendance;
    isAbsence: boolean;

    constructor(student: Student, attendance: Attendance, isAbsence: boolean) {
        this.student = student;
        this.attendance = attendance;
        this.isAbsence = isAbsence;
    }

    getIsAbsenceToString(isAbsence: boolean): string {
        if (isAbsence === false) {
            return "Yok";
        }
        return "Var";
    }

    showInfoStudentAttendance() {
        console.log(this.student + " " + this.attendance + " " + this.isAbsence);
    }
}