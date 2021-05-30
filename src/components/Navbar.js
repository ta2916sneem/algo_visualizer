import {Link} from "react-router-dom";
import {paths} from "../paths";
import React, {useState} from "react";

const Navbar = () => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className={"w-full z-30 bg-gray-100 shadow-lg fixed flex sm:flex-row flex-col " +
            "  justify-between sm:items-center z-20 divide-y sm:divide-y-0"}>
            <div className={"flex justify-between"}>
                <span className={"px-4 text-3xl text-transparent bg-gradient-to-r" +
                " flex items-center bg-clip-text from-blue-500 to-green-500"}>
                    Algorithm Visualizer
                </span>
                <button className={"flex sm:hidden p-2 focus:outline-none"} onClick={event => setMenuOpen(!isMenuOpen)}>
                    {
                        isMenuOpen ?
                            <svg className={"w-6 h-6 "} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg> :
                        <svg className={"w-6 h-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    }
                </button>
            </div>
                <div className={`${isMenuOpen ? "flex ": "hidden "} sm:flex flex-col sm:flex-row flex-shrink-0 sm:pr-4`}>
                    <Link to={"/"} className={"p-2 flex " +
                    " sm:justify-center items-center font-montserrat hover:bg-gray-200"}>
                        Sorting
                    </Link>
                    <Link to={paths.pathfinder} className={"p-2 flex " +
                    " sm:justify-center items-center font-montserrat flex-shrink-0 hover:bg-gray-200"}>
                        Path Finders
                    </Link>
                </div>
        </nav>
    )
}

export default Navbar;