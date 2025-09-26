export const CURRENT_ENVIRONMENT = 'LOCAL' // Change this as needed: 'PROD', 'DEV', or 'LOCAL'

export const getGetBackendServerLink = () => {
  if (CURRENT_ENVIRONMENT == 'PROD') {
    return ''
  } else {
    return 'http://dev.openfxrates.com:8000/'
  }
}

export const getCurrentDomain = () => {
  if (CURRENT_ENVIRONMENT == 'PROD') {
    return ''
  } else if (CURRENT_ENVIRONMENT == 'DEV') {
    return ''
  } else {
    return 'http://localhost:3000'
  }
}