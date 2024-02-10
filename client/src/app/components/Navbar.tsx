"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);

    const links = [
        { id: 1, link: 'home' },
        { id: 2, link: 'about' },
        { id: 3, link: 'portfolio' },
        { id: 4, link: 'experience' },
        { id: 5, link: 'contact' },
    ];

    return (
        <div className="bg-black text-white fixed top-0 left-0 w-full h-20 px-4 flex justify-between items-center">
            <div>
                <h1 className="text-5xl font-signature ml-2">
                    <a className="link-underline link-underline-black" href="#">
                        Logo
                    </a>
                </h1>
            </div>
            <ul className="hidden md:flex">
                {links.map(({ id, link }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                    >
                        <Link href={`/${link}`}>{link}</Link>
                    </li>
                ))}
            </ul>
            <div
                onClick={() => setNavOpen(!navOpen)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {navOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
            {navOpen && (
                <ul className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 flex flex-col justify-center items-center">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link
                                onClick={() => setNavOpen(!navOpen)}
                                href={`/${link}`}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;
