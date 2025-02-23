import { useState, useEffect } from 'react';
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'

const Topbar = () => {
    const [bgColor, setBgColor] = useState('bg-fire'); // Start with red
    const [toggleCount, setToggleCount] = useState(0);

    useEffect(()=>{
        if(toggleCount < 10){
            const interval = setInterval(()=>{
                setBgColor(prevColor => prevColor === 'bg-fire' ? 'bg-gray-500' : 'bg-fire');
                setToggleCount(prevCount => prevCount + 1);
        }, 600);//change color every 0.6seconds
        return () => clearInterval(interval);  
    }
    },[toggleCount])
  return (
    <div className={`${bgColor} text-white transition-colors duration-500`}>
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
            <div className='hidden md:flex items-center space-x-4'>
                <a href="#" className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5' />
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5' />
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4' />
                </a>
            </div>
            <div className="text-sm text-center flex-grow">
                <span>We ship worldwide - Fast and reliable shipping!</span>
            </div>
            <div className="text-sm hidden md:block">
                <a href="tel:=080000000"className='hover:text-gray-300'>
                    +800 123 4567
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar