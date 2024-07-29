export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public dob: Date,
    public image?: string,
    public otp?: string,
    public otpExpires?: Date,
    public isBlocked?: boolean
  ) {}
}
