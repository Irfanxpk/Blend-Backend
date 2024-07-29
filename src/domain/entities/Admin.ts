// // Admin entity with encapsulated properties
// export class Admin {
//   constructor(
//     private _id: string,
//     private _displayName: string,
//     private _email: string,
//     private _password: string
//   ) {}

//   get id(): string {
//     return this._id;
//   }

//   get displayName(): string {
//     return this._displayName;
//   }

//   get email(): string {
//     return this._email;
//   }

//   get password(): string {
//     return this._password;
//   }
// }

export class Admin {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string
  ) {}
}
