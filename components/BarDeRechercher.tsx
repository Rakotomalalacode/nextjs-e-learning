'use client'

import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Button from './ui/Button'

export default function BarDeRechercher() {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div
        className='border border-oranground rounded-sm lg:w-[43%] flex items-center px-3 '>
        <FiSearch size={28} className='text-oranground' />
        <input
          autoFocus
          type="text"
          placeholder="Rechercher des course..."
          className="w-full p-2 rounded ml-3 focus:outline-none focus:border-0 placeholder:text-md"
        />
        <div
          onClick={() => setOpen(true)}
          className="inline-flex items-center space-x-1 text-gray-500 gap-2 text-sm">
          <p className="px-2 py-1 border border-b-3 border-l-[1.8] rounded border-darkwhite text-xs font-mono shadow-sm">
            CTRL
          </p>
          <p className="px-2 py-1 border border-b-3 border-l-[1.8] border-darkwhite rounded  text-xs font-mono shadow-sm">
            K
          </p>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute h-screen inset-0 bg-black/40 bg-opacity-50 z-50 flex items-start justify-center pt-24 inset-x-0 shadow backdrop-blur-md">
          <div
            onClick={(e) => e.stopPropagation()}
            className=" flex flex-col gap-1 w-full max-w-lg lg:max-w-[45%] shadow-lg">
            <div className='bg-background rounded-t-md '>
              <div className='p-4'>
                <div className='border border-oranground rounded-sm flex items-center pl-3'>
                  <FiSearch size={28} className='text-oranground' />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Rechercher des course..."
                    className="w-full p-2 rounded ml-3 focus:outline-none focus:border-0 placeholder:text-md"
                  />
                </div>
              </div>
              <div className='flex h-20 items-center justify-center'>
                <p>aucune recherche récente</p>
              </div>
            </div>
            <div className='p-4 bg-background rounded-b-md flex justify-between '>
              <Button Variantes={'Links'} Text={'voir plus de cours'} />
              <div
                onClick={() => setOpen(false)}
                className="inline-flex items-center space-x-1 text-gray-500  text-sm">
                <p className="px-2 py-1 border border-b-3 border-l-[1.8] border-darkwhite rounded dark:bg-[#252523] text-xs font-mono shadow-sm">
                  esc
                </p>
                <span>Fermer</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

