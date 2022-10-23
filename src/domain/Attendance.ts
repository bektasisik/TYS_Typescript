class Attendance {
    id: number;
    prayerTime: string;
    date: Date;

    constructor(id: number, prayerTime: string, date: Date) {
        this.id = id;
        this.prayerTime = prayerTime;
        this.date = date;
    }
    showInfoAttendance() {
        console.log(this.id + " " + this.prayerTime + " " + this.date);
    }
}