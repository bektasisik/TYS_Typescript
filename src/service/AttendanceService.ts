import { Student } from "../domain/Student";
import { Attendance } from "../domain/Attendance";
import { StudentAttendance } from "../domain/StudentAttendance";

export class AttendanceService {
    attendances!: Array<Attendance>;
    studentAttendances!: Array<StudentAttendance>;
    sequence: number = 1;

    getAttendances(): Array<Attendance> {
        return this.attendances;
    }

    getStudentAttendances(): Array<StudentAttendance> {
        return this.studentAttendances;
    }

    getAttendancesByAttendanceId(attendanceId: number): Array<StudentAttendance> {
        return this.studentAttendances.filter(
            (studentAttendance) =>
                studentAttendance.getAttendance().id === attendanceId
        );
    }

    getAttendancesByStudentId(studentId: number): Array<StudentAttendance> {
        return this.studentAttendances.filter(
            (studentAttendance) => studentAttendance.getStudent().id === studentId
        );
    }

    takeAttendance(prayerTime: string, attendanceMap: Map<Student, Boolean>) {
        let attendance = new Attendance(this.sequence++, prayerTime);
        this.attendances.push(attendance);

        attendanceMap.forEach((isAbsence, student) => {
            let studentAttendance = new StudentAttendance(
                student,
                attendance,
                isAbsence
            );
            student.increaseAbsent();
            this.studentAttendances.push(studentAttendance);
        });
    }
}
function getAttendancesByAttendanceId(attendanceId: any, number: any) {
    throw new Error("Function not implemented.");
}
function getAttendancesByStudentId(studentId: any, number: any) {
    throw new Error("Function not implemented.");
}
