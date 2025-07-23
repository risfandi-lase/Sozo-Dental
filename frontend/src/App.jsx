import React from 'react'
import Sidebar from './Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Patients from './Pages/Patients'
import Reservations from './Pages/Reservations'
import PageNotFound from './Pages/PageNotFound'
import ActiveTreatment from './Components/ActiveTreatment'
import InactiveTreatment from './Components/InactiveTreatment'

function App() {
  return (
    <div data-theme = "light" className='h-screen bg-base-100 flex overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex bg-base-100 flex-col overflow-hidden'>
      <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/" element={<Patients />}>
            <Route index element={<ActiveTreatment/>} />
            <Route path='inactive-treatment' element={<InactiveTreatment/>} />
          </Route>
          <Route path="reservations" element={<Reservations />} />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </div>
  )
}

export default App