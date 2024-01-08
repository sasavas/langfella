export class User {
  constructor(
    public email: string,
    public userId: string,
    private _jwt: string
  ) {}

  get jwt() {
    return this._jwt;
  }
}
