// Authentication service

class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  login(credentials) {
    // TODO: Implement login logic
    console.log('Login:', credentials);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated() {
    return this.token !== null;
  }

  getToken() {
    return this.token;
  }
}

export default new AuthService();
