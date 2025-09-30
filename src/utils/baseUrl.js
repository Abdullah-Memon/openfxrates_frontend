export const CURRENT_ENVIRONMENT = 'DEV' // Change this as needed: 'PROD', 'DEV', or 'LOCAL'

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
    return 'http://dev.openfxrates.com:3001'
  } else {
    return 'http://localhost:3000'
  }
}