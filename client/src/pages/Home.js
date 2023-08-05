import {Navbar} from "../components/Navbar";
import {Link} from "react-router-dom";
import gsap from "gsap";
import {useLayoutEffect, useRef, useState} from "react";

export const Home = () => {

    //States
    const [search, setSearch] = useState('');

    //Refs
    const header_ref = useRef(null);
    const hero_image = useRef(null);
    const search_ref = useRef(null)
    const cta_ref = useRef(null)

    //GSAP
    useLayoutEffect(() => {
        const timeline = gsap.timeline();
        timeline
            .from(hero_image.current, {clipPath: "inset(35%)", duration: 1, autoAlpha:0, delay: 0.2})
            .from(header_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.6, delay: 0.2}, 0)
            .from(search_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.4}, 1)
            .from(cta_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.4, delay: 0.1}, 1)
    }, []);

    return (
        <>
            <div className="header-container">
                <Navbar/>
            </div>
            <div className="home">
                <section className="hero" id="hero">
                    <div className="hero-container">
                        <div className="hero-left">
                            <div className="hero-left-header" ref={header_ref}>
                                <span className="header-anim">Unleash the Power of Web Scraping for Personalized Tech News!</span>
                            </div>
                            <div className="hero-left-search">
                                <div className="search-container" ref={search_ref}>
                                    <input type="text" name="search" id="search" placeholder="Explore Latest Tech Updates..." onChange={(e)=>{setSearch(e.target.value)}}/>
                                    <Link to="/search" state={search}><i className="fa-solid fa-magnifying-glass"/></Link>
                                </div>
                            </div>
                            <div className="hero-left-cta" ref={cta_ref}>
                                <Link to="/web-scraping">Learn more about web scraping&nbsp;<i className="fa-solid fa-arrow-right"/></Link>
                            </div>
                        </div>
                        <div className="hero-right" ref={hero_image}>
                            <img className="hero-img-anim" src="assets/images/hero-right-temp.jpg" alt="Hero BG"/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}