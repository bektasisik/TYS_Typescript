export class Attendance {
    id: number;
    prayerTime: string;
    date: Date = new Date();

    today = this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear() + " " + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();

    constructor(id: number, prayerTime: string) {
        this.id = id;
        this.prayerTime = prayerTime;
    }

    showInfoAttendance() {
        console.log(this.id + " " + this.prayerTime + " " + this.today);
    }
}