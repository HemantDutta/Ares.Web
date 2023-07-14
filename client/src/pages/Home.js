import {Navbar} from "../components/Navbar";
import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <>
            <div className="header-container">
                <Navbar/>
            </div>
            <div className="home">
                <section className="hero" id="hero">
                    <div className="hero-container">
                        <div className="hero-left">
                            <div className="hero-left-header">
                                <span>Unleash the Power of Web Scraping for Personalized Tech News!</span>
                            </div>
                            <div className="hero-left-search">
                                <div className="search-container">
                                    <input type="text" name="search" id="search" placeholder="Explore Latest Tech Updates..."/>
                                    <i className="fa-solid fa-magnifying-glass"/>
                                </div>
                            </div>
                            <div className="hero-left-cta">
                                <Link to="/web-scraping">Learn more about web scraping&nbsp;<i className="fa-solid fa-arrow-right"/></Link>
                            </div>
                        </div>
                        <div className="hero-right">
                            <img src="assets/images/hero-right-temp.jpg" alt="Hero BG"/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}