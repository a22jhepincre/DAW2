"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            MyApp
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                Home
                            </Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                About
                            </Link>
                            <Link href="/services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                Services
                            </Link>
                            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="bg-gray-900 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Home
                        </Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            About
                        </Link>
                        <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Services
                        </Link>
                        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
