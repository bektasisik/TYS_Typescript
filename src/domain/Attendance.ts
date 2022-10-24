import {LocalDate} from 'ts-extended-types';

export class Attendance {
    id: number;
    prayerTime: string;
    date!: LocalDate;

    constructor(id: number, prayerTime: string) {
        this.id = id;
        this.prayerTime = prayerTime;
    }
    
    showInfoAttendance() {
        console.log(this.id + " " + this.prayerTime + " " + this.date.getDate);
    }
}