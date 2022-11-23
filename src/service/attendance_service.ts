import { Attendance } from "../domain/attendance";
import { StudentAttendanceDTO } from "../dto/student_attendance_dto";

var apiUrl: string = 'http://localhost:8080/api/v1/attendances';

export class AttendanceService {
    private _attendances: Array<Attendance> = [];


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