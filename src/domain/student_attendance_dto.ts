export class StudentAttendanceDTO {
    studentId: number;
    isAbsence:boolean;

    getStudentId(): number {
        return this.studentId;
    }
    getIsAbsence(): boolean {
        return this.isAbsence;
    }
    
    constructor(studentId: number, isAbsence: boolean) {
        this.studentId = studentId;
        this.isAbsence = isAbsence;
    }

    public showInfoStudentAttendanceDTO() {
        console.log(this.studentId + " " + this.isAbsence);
    }

}