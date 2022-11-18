export class Attendance {
    private _id: number;
    private _prayerTime: string;
    private _date: Date = new Date();
    private _today = this._date.getDate() + "/" + (this._date.getMonth() + 1) + "/" + this._date.getFullYear() 
    + " " + this._date.getHours() + ":" + this._date.getMinutes() + ":" + this._date.getSeconds();

    
    constructor(id: number, prayerTime: string, date: string) {
        this._id = id;
        this._prayerTime = prayerTime;
        this._today = date;
    }
    public getId(): number {
        return this._id;
    }
    public getPrayerTime(): string {
        return this._prayerTime;
    }
    public setPrayerTime(prayerTime: string) {
        this._prayerTime = prayerTime;
    }
    public getToday(): string {
        return this._today;
    }

    public showInfoAttendance() {
        console.log(this._id + " " + this._prayerTime + " " + this._today);
    }
}