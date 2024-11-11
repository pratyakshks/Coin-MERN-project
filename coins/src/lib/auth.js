// Class with static methods lets us use the class without
// instantiating it
class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static getUserId() {
    const token = this.getToken()
    if (!token) return false
    const parts = token.split('.')
    return JSON.parse(atob(parts[1])).sub
  }

  static isAuthorized() {
    return this.getToken()
  }

}

export default Auth

/* Alternatively we could have used an object, like so:

export default {
  setToken(token) {
    localStorage.setItem('token', token)
  },
  getToken() {
    return localStorage.getItem('token')
  }
}
*/
