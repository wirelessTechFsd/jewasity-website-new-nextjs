import React from 'react'
import SEO from '../commonComponents/SEO'

export default function MaintenanceMode() {
  return (
    <>
     <SEO title={"Maintenance Mode"} />
    <div className='flex flex-col items-center justify-center h-[100vh] w-full'>
        <h1 className='text-[50px] font-bold font-dmSans '>504</h1>
        <h2 className='text-[30px] font-medium font-dmSans'>Target in maintenance</h2>
        <p>The website you were looking for is currently underdoing maintenance.</p>
    </div>
    </>
  )
}
