export default () => {
  // if (localStorage.getItem('access_token') === null) return false

    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }