import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

function Navcheckout() {
    return (
      <>
    <div className="container top-0 flex flex-row justify-between py-8 px-56 w-full bg-white shadow-md z-40">
        <div>
          <Link to={"/"}>
            <span className="font-playwrite text-7xl">lilas</span>
          </Link>
        </div>
        
        <div className="flex flex-row space-x-4 text-2xl pt-3">
          <div className="flex flex-row space-x-4 pt-2">
            <span>
              <CiSearch className="hover:scale-110" />
            </span>
            <Link to="/cart" className="relative">
              <span>
                <HiOutlineShoppingBag className="hover:scale-110" />
              </span>
              
            </Link>
          </div>

          
          
        </div>
      </div>
    </>
  )
}

export default Navcheckout