export const Navbar = () => {

    //Big Menu Toggle
    function toggleBigMenu() {
        let bigMenu = document.getElementById("bigMenu");
        let menu = document.getElementById("menu");
        let close = document.getElementById("close");
        if (bigMenu.classList.contains("opened")) {
            bigMenu.classList.remove("opened");
            close.classList.add("invisible");
            menu.classList.remove("invisible");
            setTimeout(() => {
                bigMenu.style.display = "none";
            }, 100)
        } else {
            bigMenu.style.display = "initial";
            menu.classList.add("invisible");
            close.classList.remove("invisible");
            setTimeout(() => {
                bigMenu.classList.add("opened");
            }, 100)
        }
    }

    return (
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <span>Ares.Web</span>
                    </div>
                    <div className="navbar-menu-option">
                        <span onClick={toggleBigMenu} id="menu">[ MENU ]</span>
                        <span className="invisible" onClick={toggleBigMenu} id="close">[ CLOSE ]</span>
                    </div>
                    <div className="navbar-about-option">
                        <span>About</span>
                    </div>
                </div>
            </nav>
            {/*  Big Menu  */}
            <section className="bigMenu" id="bigMenu">
                <div className="bigMenu-container">
                    <div className="bigMenu-item">
                        <span>Menu Option</span>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                    <div className="bigMenu-item">
                        <span>Menu Option</span>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                    <div className="bigMenu-item">
                        <span>Github</span>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                    <div className="bigMenu-item">
                        <span>About</span>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                </div>
            </section>
            {/*  Big Menu End  */}
        </>
    )
}