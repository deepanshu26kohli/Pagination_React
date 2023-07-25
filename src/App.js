import React, { useState } from 'react'

import Form1 from './Components/Form1'
import Form2 from './Components/Form2'
import { DataProvider } from './MyHooks/ShareData'
const App = () => {

  return (
    <>
      <DataProvider>
        <Form1 />
        <Form2 />
      </DataProvider>

    </>
    // <Pagination/>
    // <LoginFormValidation/>
  )
}

export default App
