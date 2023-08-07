import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './route/root.jsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider>
  <React.StrictMode>
    <RouterProvider router={router}/>
    </React.StrictMode>
    </ChakraProvider>
)
