export default class Time {
    static SECOND = 1000;
    static MINUTE = this.SECOND * 60;
    static HOUR = this.MINUTE * 60;
    static DAY = this.HOUR * 24;
    static WEEK = this.DAY * 7;
    static MONTH = this.DAY * 30;
    static YEAR = this.DAY * 365;

    static seconds = (n: number) => n * this.SECOND;
    static minutes = (n: number) => n * this.MINUTE;
    static hours = (n: number) => n * this.HOUR;
    static days = (n: number) => n * this.DAY;
    static weeks = (n: number) => n * this.WEEK;
    static months = (n: number) => n * this.MONTH;
    static years = (n: number) => n * this.YEAR;
}
