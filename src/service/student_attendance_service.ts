import { Attendance } from "../domain/attendance";
import { Student } from "../domain/student";
import { StudentAttendance } from "../domain/student_attendance";

var apiUrl: string = 'http://localhost:8080/api/v1/student-attendances';

export class StudentAttendanceService {
    private _studentAttendances: Array<StudentAttendance> = [];

    public async getStudentAttendances(): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        this._studentAttendances = [];
        this._studentAttendances = result.map((studentAttendance: any) => new StudentAttendance(
            new Student(studentAttendance.student.id, studentAttendance.student.name, studentAttendance.student.surname, studentAttendance.student.absent),
            new Attendance(studentAttendance.attendance.id, studentAttendance.attendance.prayerTime, studentAttendance.attendance.date),
            studentAttendance.isAbsence));
        return this._studentAttendances;
    }

    public async getStudentsByAttendanceId(attendanceId: number): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl + '/' + attendanceId+ '/students', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        return result.map((studentAttendance: any) => new StudentAttendance(
            new Student(studentAttendance.student.id, studentAttendance.student.name, studentAttendance.student.surname, studentAttendance.student.absent),
            new Attendance(studentAttendance.attendance.id, studentAttendance.attendance.prayerTime, studentAttendance.attendance.date),
            studentAttendance.isAbsence));
    }

    public async getAttendancesByStudentId(studentId: number): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl + '/' + studentId+ '/attendances', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        return result.map((studentAttendance: any) => new StudentAttendance(
            new Student(studentAttendance.student.id, studentAttendance.student.name, studentAttendance.student.surname, studentAttendance.student.absent),
            new Attendance(studentAttendance.attendance.id, studentAttendance.attendance.prayerTime, studentAttendance.attendance.date),
            studentAttendance.isAbsence));
    }
}