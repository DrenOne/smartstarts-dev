import React from 'react'
import PillsVertical from '../../components/tabPills/PillsVertical'

export default function AboutFooter() {
  return (
    <div className="container-xxl p-5 pt-0">
      <h1 className='mb-2 text-danger'>Education Highlights</h1>
      <PillsVertical type={2} />
    </div>
  )
}
