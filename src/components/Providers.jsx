'use client'
import ReduxProvider from '@/redux/ReduxProvider'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }) => {
  return (
    <ReduxProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />
      {children}
    </ReduxProvider>
  )
}

export default Providers