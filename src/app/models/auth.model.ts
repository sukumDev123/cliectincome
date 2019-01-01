export class AuthModel {
  public displayName: string = ""
  public email: string = ""
  public password: string = ""
  constructor(display = "", email = "", password = "") {
    this.displayName = display
    this.email = email
    this.password = password
  }
}
export interface AuthInterFace {
  message: string
  status: number
  data: any
}
