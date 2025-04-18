import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
      <img src={assets.bottom_banner_image} alt='banner' className='w-full hidden md:block'/>
      <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full md:hidden'/>
        <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
            <h1 className='text-3xl md:text-4xl font-semibold text-green-800 mb-6'>Why we are the Best?</h1>
            <div className='flex flex-col'>           
            {features.map((feature, index) => (
                <div key={index} className='flex items-center gap-5 mt-4'>
                    <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
                    <h3 className='text-lg md:text-xl font-semibold'> {feature.title}</h3>
                    <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner
