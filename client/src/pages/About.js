import {Navbar} from "../components/Navbar";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useLayoutEffect, useRef} from "react";

export const About = () => {

    //Animation Code
    gsap.registerPlugin(ScrollTrigger);

    //Refs
    const header = useRef(null);
    const headDes = useRef(null);
    const headImg = useRef(null);
    const awLogo = useRef(null);
    const mot = useRef(null);
    const learn = useRef(null);

    //GSAP Head Section
    useLayoutEffect(() => {
        const tl = gsap.timeline();
        tl
            .from(header.current, {yPercent: 50, autoAlpha: 0, duration: 0.6, delay: 0.2})
            .from(headImg.current, {yPercent: 50, rotate: -10, autoAlpha: 0, delay: 0.4}, 0)
            .from(headDes.current, {autoAlpha: 0, xPercent: -20})
    }, [])

    //GSAP Motivation Section
    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: awLogo.current,
                toggleActions: "play pause none reset"
            }
        })

        tl
            .from(awLogo.current, {xPercent: 50, duration: 0.8, delay: 0.2})
            .from(mot.current, {xPercent: -10, duration: 0.6, autoAlpha: 0, delay: 0.4}, 0)
            .from(learn.current, {xPercent: -10, duration: 0.6, autoAlpha: 0, delay: 0.5}, 0)
    }, [])


    return (
        <>
            {/*Header*/}
            <Navbar/>
            {/*Header End*/}
            <div className="about">
                <div className="about-container">
                    {/*About the project*/}
                    <div className="atp-container">
                        <div className="atp-left">
                            <div className="atp-left-header" ref={header}>
                                <span className="gray">Why Run After The Latest</span>
                                <span className="gray">Tech Updates? <span className="black">Let them</span></span>
                                <span>Come To You!</span>
                            </div>
                            <div className="atp-left-des" ref={headDes}>
                                <span>Stay Ahead of The Curve! Thanks to the Power of Web Scraping.</span>
                            </div>
                        </div>
                        <div className="atp-right">
                            <img src="assets/images/wsh_1_img.webp" alt="About" ref={headImg}/>
                        </div>
                    </div>
                    {/*  About the developer  */}
                    <div className="atd-container">
                        <div className="atd-left" ref={awLogo}>
                            <span>AW<span className="accent-color">.</span></span>
                        </div>
                        <div className="atd-right">
                            <div className="atd-right-item" ref={mot}>
                                <div className="atd-item-header">
                                    <span>Motivation</span>
                                </div>
                                <div className="atd-item-content">
                                    <span>Fascinated by a project one of my friends was working on for a client that included scraping user's carts on an e-commerce website, I found myself curious about how web scraping works. After watching a few YouTube tutorials, I got the gist of it. I have always struggled with staying up-to-date with all the latest tech updates, and this idea came to my mind.</span>
                                </div>
                            </div>
                            <div className="atd-right-item" ref={learn}>
                                <div className="atd-item-header">
                                    <span>What I learned</span>
                                </div>
                                <div className="atd-item-content">
                                    <span>Learning a new technology is one of the best parts of being a developer. Every project broadens my horizons in the technological landscape. Here's some stuff I learned during this project: </span>
                                    <ul>
                                        <li>Web Scraping using Puppeteer and Node JS</li>
                                        <li>Horizontal Scrolling GSAP</li>
                                        <li>Clip-path Property in CSS</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}