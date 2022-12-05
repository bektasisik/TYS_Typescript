export class Attendance {
    private _id: number;
    private _prayerTime: string;
    private _date: string;
    
    constructor(id: number, prayerTime: string, date: string) {
        this._id = id;
        this._prayerTime = prayerTime;
        this._date = date;
    }
    public getId(): number {
        return this._id;
    }
    public getPrayerTime(): string {
        return this._prayerTime;
    }
    public getToday(): string {
        return this._date;
    }
}