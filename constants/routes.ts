const ROUTES = {
  HOME: '/',
  RESET_PASSWORD: '/reset-password',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VERIFY_EMAIL:(email: string) => `/verify-email?e=${email}`,
}

export default ROUTES