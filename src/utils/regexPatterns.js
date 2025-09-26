export const emailRegex = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Please enter a valid email address'
}

export const passwordRegex = {
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
}

export const websiteRegex = {
  pattern: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
  message: 'Please enter a valid website URL'
}