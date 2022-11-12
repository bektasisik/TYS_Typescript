import { Student } from "../domain/student";
import { Attendance } from "../domain/attendance";
import { StudentAttendance } from "../domain/student_attendance";

var apiUrl: string = 'http://localhost:3000/api/v1';

export class AttendanceService {
    private _attendances: Array<Attendance> = [];
    private _studentAttendances: Array<StudentAttendance> = [];
    private _sequence: number = 1;

    getAttendanceList(): Array<Attendance> {
        return this._attendances;
    }

    getAttendance(attendanceId: number): Attendance {
        return this._attendances.filter(
            (attendance) => attendance.id === attendanceId)[0];
    }

    getStudentAttendances(): Array<StudentAttendance> {
        return this._studentAttendances;
    }

    async getAttendancesByAttendanceId(attendanceId: number): Promise<Array<StudentAttendance>> {
        const response = await fetch(apiUrl + '/attendances/' + attendanceId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        console.log('result is: ', JSON.stringify(result));
        return this._studentAttendances.filter(
            (studentAttendance) =>
                studentAttendance.getAttendance().id === attendanceId);
    }

    async getAttendancesByStudentId(studentId: number): Promise<Array<StudentAttendance>> {
        const response = await fetch(apiUrl + '/attendances/' + studentId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = (await response.json());
        console.log('result is: ', JSON.stringify(result));
        return this._studentAttendances.filter(
            (studentAttendance) => studentAttendance.getStudent().id === studentId);
    }

    isEmpty(prayerTime: string): boolean {
        if (prayerTime === undefined || prayerTime === null || prayerTime === '') {
            return false;
        }
        return true;
    }

    async takeAttendance(prayerTime: string, attendanceMap: Map<Student, boolean>) {
        if (!this.isEmpty(prayerTime)) {
            throw new Error('Prayer time cannot be empty!');
        }
        const attendance = new Attendance(this._sequence++, prayerTime);
        attendanceMap.forEach(async (isAbsence, student) => {
            const studentAttendance = new StudentAttendance(student, attendance, isAbsence);
            if (!isAbsence) {
                student.increaseAbsent();
            }
            this._studentAttendances.push(studentAttendance);
        });
        const response = await fetch(apiUrl + '/attendances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this._sequence,
                prayerTime: prayerTime,
                attendanceMap: attendanceMap
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const result = await response.json();
        console.log('result is: ', JSON.stringify(result));
        this._attendances.push(attendance);
    }

    async updateAttendance(attendanceId: number, prayerTime: string, attendanceMap: Map<Student, boolean>) {
        const attendance = this.getAttendance(attendanceId);
        attendance.prayerTime = prayerTime;

        let oldAttendance = this._studentAttendances.filter(
            (studentAttendance) => studentAttendance.getAttendance().id === attendanceId);

        this._studentAttendances = this._studentAttendances.filter(
            (studentAttendance) => studentAttendance.getAttendance().id !== attendanceId);

        attendanceMap.forEach(async (isAbsence, student) => {
            const studentAttendance = new StudentAttendance(student, attendance, isAbsence);
            if (!isAbsence) {
                student.increaseAbsent();
            }
            this._studentAttendances.push(studentAttendance);
        });
        const newAttendances = this._studentAttendances.filter(
            (studentAttendance) => studentAttendance.getAttendance().id === attendanceId);

        oldAttendance.forEach((oldStudentAttendance) => {
            const newAttendance = newAttendances.find(
                (newStudentAttendance) => (newStudentAttendance.getStudent().id === oldStudentAttendance.getStudent().id));
            if (newAttendance) {
                if (oldStudentAttendance.isAbsence !== newAttendance.isAbsence) {
                    if (oldStudentAttendance.isAbsence) {
                        newAttendance.getStudent().increaseAbsent();
                    } else {
                        newAttendance.getStudent().decreaseAbsent();
                    }
                }
            }
        });

        const response = await fetch(apiUrl + '/attendances/' + attendanceId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: attendanceId,
                prayerTime: prayerTime,
                attendanceMap: attendanceMap
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    async deleteAttendance(attendanceId: number) {
        const attendance = this.getAttendance(attendanceId);
        if (attendance) {
            this._studentAttendances.forEach((studentAttendance) => {
                if (!studentAttendance.isAbsence) {
                    studentAttendance.getStudent().decreaseAbsent();
                }
            });
            this._attendances = this._attendances.filter(
                (attendance) => attendance.id !== attendanceId);
            this._studentAttendances = this._studentAttendances.filter(
                (studentAttendance) => studentAttendance.getAttendance().id !== attendanceId);

        }

        const response = await fetch(apiUrl + '/attendances/' + attendanceId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: attendanceId
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
}