import {useLayoutEffect, useRef, useState} from "react";
import {gsap} from "gsap";

export const Navbar = () => {

    //States
    const [menuOpen, setMenuOpen] = useState(false);

    //Refs
    const bigMenu_item = useRef(null);

    //Big Menu Toggle
    function toggleBigMenu() {
        let bigMenu = document.getElementById("bigMenu");
        let menu = document.getElementById("menu");
        let close = document.getElementById("close");
        let ham = document.getElementById("hamburger");
        if (bigMenu.classList.contains("opened")) {
            setMenuOpen(false);
            bigMenu.classList.remove("opened");
            close.classList.add("invisible");
            menu.classList.remove("invisible");
            ham.classList.remove("clicked");
            setTimeout(() => {
                bigMenu.style.display = "none";
            }, 100)
        } else {
            setMenuOpen(true);
            bigMenu.style.display = "initial";
            ham.classList.add("clicked");
            menu.classList.add("invisible");
            close.classList.remove("invisible");
            setTimeout(() => {
                bigMenu.classList.add("opened");
            }, 100)
        }
    }

    //bigMenu Item Animation
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".bigMenu-item span", {
                yPercent: 200,
                duration: 0.4,
                delay: 0.2,
                stagger: -0.1,
                ease: "power2.out"
            })
        }, bigMenu_item)
        return () => ctx.revert();
    }, [menuOpen])


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
                    <div className="navbar-hamburger-option">
                        <div className="hamburger" onClick={toggleBigMenu} id="hamburger">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <div className="navbar-about-option">
                        <span>About</span>
                    </div>
                </div>
            </nav>
            {/*  Big Menu  */}
            <section className="bigMenu" id="bigMenu">
                <div className="bigMenu-container" ref={bigMenu_item}>
                    <div className="bigMenu-item">
                        <span>Menu Option</span>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                    <div className="bigMenu-item">
                        <span>Web Scraping</span>
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