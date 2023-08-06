import {Navbar} from "../components/Navbar";
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";

export const WebScraping = () => {

    //refs
    const ws_img = useRef(null);
    const ws_wt = useRef(null);
    const ws_ws = useRef(null);

    //Landing Animation
    useLayoutEffect(()=>{
        const tl = gsap.timeline();
        tl
            .from(ws_img.current, {clipPath: "inset(45%)", duration: 0.8, delay: 0.2}, 0)
            .from(ws_ws.current, {yPercent: 100, autoAlpha: 0, duration: 0.4},1)
            .from(ws_wt.current, {yPercent: 100, autoAlpha: 0, duration: 0.4, delay: 0.2}, 1)
    },[])

    return(
        <>
            <Navbar/>
            <div className="web-scraping-header">
                <div className="span-cont"><span ref={ws_ws} className="ws_ws">Web Scraping?</span></div>
                <div className="span-cont"><span ref={ws_wt} className="ws_wt">What's that?</span></div>
                <img ref={ws_img} src="assets/images/ws_landing.svg" alt="landing background"/>
            </div>
            <div className="web-scraping-container">
                <div>
                    <div className="web-scraping-content">
                        <div className="web-scraping-item web-scraping-what"></div>
                        <div className="web-scraping-item web-scraping-how"></div>
                        <div className="web-scraping-item web-scraping-ethics"></div>
                    </div>
                </div>
            </div>
            <div className="web-scraping-conclusion"></div>
        </>
    )
}