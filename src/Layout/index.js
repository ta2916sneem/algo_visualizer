import Navbar from "../components/Navbar";

const Layout = ({children, className}) => {
    return (
        <div className={"relative"}>
            <Navbar/>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;