import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar"

import { BiCartAlt, BiLogOutCircle } from "react-icons/bi";


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import { SearchBar } from "../../components/searchBar/index"
import { useAuth, useAuthActions } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
    const [current, setCurrent] = useState("");
    const [search, setSearch] = useState("");
    const [hidden, setHidden] = useState(true);
    const router = useRouter();
    const [navState, setNavState] = useState(false);

    const [mounted, setMounted] = useState(false);

    const { user, loading } = useAuth();
    const dispatch = useAuthActions();



    useEffect(() => {
        setMounted(true);

    }, []);

    const navItems = [
        { "href": "/", "text": "خانه" },
        { "href": "/courses", "text": "دوره ها" },
        { "href": "/blogs", "text": "بلاگ" },
        { "href": "/signin", "text": "ورود" },
    ]

    const userActions = [
        {
            href: "/profile",
            text: "profile",
            icon: <UserIcon className="w-6 h-6" />
        },
        {
            href: "/cart",
            text: "سبد خرید",
            icon: <BiCartAlt className="w-6 h-6" />
        },
        {
            href: "/signout",
            text: "خروج",
            icon: <BiLogOutCircle className="w-6 h-6" />
        }
    ]
    if (!mounted) return null;
    return (

        <nav className="sticky top-0  z-10 font-bold bg-white  border-b dark:bg-slate-800 border-2 shadow-lg border-slate-200 dark:border-slate-800 px-1 sm:px-2 py-1.5 w-full ">


            <div className=" flex  items-center justify-between  w-full  ">
                <div className="flex">
                    {/* logo */}
                    <div className="flex">
                        <SideBar />
                        {/* <Link href="/" className="md:flex items-center font-bold text-base  justify-start hidden">
                            <Image src={profile} className="h-2 w-2 ml-1 sm:h-9 rounded-full" alt="Coursell Logo" />
                            {/* <span className=" text-xl font-semibold whitespace-nowrap dark:text-white">Coursell</span> */}
                        {/* </Link> */}

                    </div>

                    {/* desktop nav */}
                    <div className="items-center mr-4 justify-between w-full hidden md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary_light focus:border-primary_light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary_dark dark:focus:border-primary_dark" placeholder="جستجو..." />
                        </div>
                        <ul className="flex items-center mt-4 border border-slate-800 rounded-lg  md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  ">
                            {
                                navItems.map(item =>
                                    <li key={item.href} className="justify-center items-center">
                                        <Link href={item.href} className={`block  py-2  text-lg ${item.href === "/courses" ? 'whitespace-nowrap' : ""}`}>
                                            <h2 className={`border-b-2 rounded-lg  border-slate-50 dark:border-slate-800 dark:hover:border-slate-100 p-2 ml-6 hover:border-b-2 hover:rounded-lg  hover:border-slate-800 ${item.href != router.pathname ? `text-purple-900 dark:text-purple-100` : `text-slate-900  dark:text-slate-900 bg-purple-400 dark:hover:border-slate-800 hover:border-slate-100 `}`}> {item.text}</h2>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                {/* search - profile  - cart */}
                <div className="flex md:order-2  items-center justify-end ">
                    {/* new searchbar */}
                    <SearchBar />
                    {/* dropdown */}
                    <Menu as="div" className="relative inline-block text-right">
                        <div>
                            <Menu.Button className="flex items-center  justify-center rounded-md text-sm font-medium text-gray-700 shadow-sm hover:text-purple-600 hover:dark:text-purple-800">
                                {/* <Image className="w-8 h-8 p-1 rounded-full ml-1 mr-4 first-letter:rounded-full ring-2 ring-gray-300 dark:ring-gray-100" src={profile} alt="Bordered avatar" /> */}
                                <ChevronDownIcon className=" h-6 w-6 dark:text-slate-100" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-100 dark:text-slate-100 dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {
                                        userActions.map(item =>
                                            <Menu.Item key={item.href}>
                                                {({ active }) => (
                                                    <Link
                                                        href={item.href}
                                                        className={` px-4 flex rounded-md justify-between py-2 text-sm ${active ? "bg-purple-100 text-gray-900" : "text-gray-700 dark:text-slate-100"}`}
                                                    >
                                                        <p className="w-full">
                                                            <div>
                                                                {item.text}
                                                            </div>
                                                            {item.href === "/cart" &&
                                                                <div className="w-4 h-4 text-white bg-red-500 rounded-full p-1 flex items-center justify-center">
                                                                    1
                                                                </div>}
                                                            <div>{item.icon}</div>
                                                        </p>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )
                                    }
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <div className="hidden md:block">
                        {mounted && <ThemeToggle />}
                    </div>
                </div>
            </div>
        </nav >

    );
}

export default Header;


