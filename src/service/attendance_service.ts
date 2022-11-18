import { Attendance } from "../domain/attendance";
import { Student } from "../domain/student";
import { StudentAttendance } from "../domain/student_attendance";
import { StudentAttendanceDTO } from "../domain/student_attendance_dto";
import { StudentService } from "./student_service";

var apiUrl: string = 'http://localhost:8080/api/v1/attendances';

export class AttendanceService {
    private _attendances: Array<Attendance> = [];
    private _studentAttendances: Array<StudentAttendance> = [];


    public async getAttendances(): Promise<Attendance[]> {
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
        this._attendances = [];
        result.forEach((object: any) => {
            this._attendances.push(new Attendance(object.id, object.prayerTime, object.date));
        });
        return this._attendances;
    }

    public async getAttendance(id: number): Promise<Attendance> {
        const response = await fetch(apiUrl + '/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        return new Attendance(result.id, result.prayerTime, result.date);
    }

    public async getStudentAttendances(): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl + '/studentAttendances', {
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



    public async getAttendancesByAttendanceId(id: number): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl + '/attendance/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result: StudentAttendance[] = (await response.json());
        const studentAttendances: StudentAttendance[] = [];
        result.forEach((object: any) => {
            studentAttendances.push(new StudentAttendance(
                new Student(object.student.id, object.student.name, object.student.surname, object.student.absent),
                new Attendance(object.attendance.id, object.attendance.prayerTime, object.attendance.date),
                object.isAbsence));
        });
        return studentAttendances;
    }

    public async getAttendancesByStudentId(studentId: number): Promise<StudentAttendance[]> {
        const response = await fetch(apiUrl + '/student/' + studentId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result: StudentAttendance[] = (await response.json());
        const studentAttendances: StudentAttendance[] = [];
        result.forEach((object: any) => {
            studentAttendances.push(new StudentAttendance(
                new Student(object.student.id, object.student.name, object.student.surname, object.student.absent),
                new Attendance(object.attendance.id, object.attendance.prayerTime, object.attendance.date),
                object.isAbsence));
        });
        return studentAttendances;
    }

    public async isEmpty(prayerTime: string): Promise<boolean> {
        return prayerTime !== '' && prayerTime !== undefined && prayerTime !== null;
    }

    public async takeAttendance(prayerTime: string, studentAttendanceDto: Array<StudentAttendanceDTO>) {
        if (!this.isEmpty(prayerTime)) {
            throw new Error('Prayer time cannot be empty!');
        }
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prayerTime: prayerTime,
                studentAttendanceDto: studentAttendanceDto
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    public async updateAttendance(id: number, prayerTime: string, studentAttendanceDto: Array<StudentAttendanceDTO>) {
        const response = await fetch(apiUrl + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                prayerTime: prayerTime,
                studentAttendanceDto: studentAttendanceDto
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

    }

    public async deleteAttendance(id: number) {
        const response = await fetch(apiUrl + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
}