export default (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.token);
    localStorage.setItem('expires_at', expiresAt);
  }