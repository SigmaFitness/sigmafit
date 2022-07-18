import { ArrowRightIcon, ChevronRightIcon, MenuAlt1Icon, MenuIcon, XIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useGetCurrentUserQuery } from '../api'
import { Logo } from './Logo'
import { Menu } from '@headlessui/react'


export const Navbar = () => {
    const { isError, isLoading } = useGetCurrentUserQuery()
    const topLinkUrl = (!isLoading && !isError) ? '/dash' : '/'
    // const [open, setIsOpen] = useState(false)
    const { route } = useRouter()

    return (
        <Menu>
            {({ open }) =>


            (

                <div className={"navbar min-h-16 h-16 border-b z-50 " + (open ? 'bg-primary border-gray-700 fixed top-0 left-0 w-full' : '')}>
                    <div className="flex-1 h-full">
                        <Link href={topLinkUrl}>
                            <div className='btn btn-ghost normal-case text-base'>
                                {/* <Image src={require('../public/assets/SigmaFit-logo.svg')} /> */}
                                <Logo className={'w-36 ' + (open ? 'text-white' : 'text-black')} />
                            </div>
                        </Link>
                    </div>


                    <Menu.Button className='btn btn-circle btn-ghost transition'>{open ? <XIcon className='w-8 text-white' /> : <MenuIcon className='w-8 text-black' />}</Menu.Button>



                    {open && <Menu.Items as='div' className=' z-50 flex px-6 text-center pt-5 flex-col text-white fixed left-0 bottom-0 w-screen bg-primary' style={{ height: 'calc(100vh - 64px)' }}>
                        {!isLoading && !isError ?

                            <>
                                <Menu.Item>
                                    <Link href='/dash'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/dash' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between w-full h-9 ">Dashboard
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/sessionSchema/top'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/sessionSchema/top' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`} >
                                            <div className="flex justify-between h-9">
                                                Top Workout Routines
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>

                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/workout'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/workout' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                Manage Workouts
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>

                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/profile'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/profile' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                Profile
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>

                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/insights'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/insights' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                <div className="space-x-2">
                                                    <span>Training Insights</span>
                                                    <span className="badge badge-sm badge-warning">New</span>
                                                </div>
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>


                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/auth/logout'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/auth/logout' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                Logout
                                            </div>

                                        </div>
                                    </Link>
                                </Menu.Item>

                            </> : <>
                                <Menu.Item>
                                    <Link href='/about-us'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/about-us' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                About Us
                                                <ChevronRightIcon className='text-red-500 w-7' />

                                            </div>


                                        </div>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item>
                                    <Link href='/pricing'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/pricing' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>

                                            <div className="flex justify-between h-9">

                                                Pricing
                                                <ChevronRightIcon className='text-red-500 w-7' />

                                            </div>


                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/auth/signin'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/auth/signin' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">

                                                Sign In
                                                <ChevronRightIcon className='text-red-500 w-7' />

                                            </div>

                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/auth/signup'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/auth/signup' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                Sign Up
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>

                                        </div>
                                    </Link>
                                </Menu.Item>
                            </>}

                    </Menu.Items>}

                    {/* <div className="flex-none">
    <div className="dropdown dropdown-end md:dropdown">
      
        <ul
            tabIndex={0}
            className="menu menu-compact mt-12 dropdown-content -mr-2 p-2 shadow bg-primary text-white w-screen px-7 fixed top-0 sf-navbar-dropdown"
            
        >



        </ul>
    </div>
</div> */}
                </div>
            )}
        </Menu>


    )
}
