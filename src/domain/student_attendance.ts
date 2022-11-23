import { Student } from "./student";
import { Attendance } from "./attendance";

export class StudentAttendance {
    private _student: Student;
    private _attendance: Attendance;
    private _isAbsence: Boolean;

    constructor(student: Student, attendance: Attendance, isAbsence: Boolean) {
        this._student = student;
        this._attendance = attendance;
        this._isAbsence = isAbsence;
    }

    public getAttendance():Attendance{
        return this._attendance;
    }
    public getStudent():Student{
        return this._student;
    }
    public getIsAbsence():Boolean{
        return this._isAbsence;
    }
    public getIsAbsenceToString(): string {
        return this._isAbsence ? "Var" : "Yok";
    }
}