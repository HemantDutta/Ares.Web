import {Navbar} from "../components/Navbar";
import {useEffect, useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export const WebScraping = () => {

    gsap.registerPlugin(ScrollTrigger);

    //refs
    const ws_img = useRef(null);
    const ws_wt = useRef(null);
    const ws_ws = useRef(null);
    const wsd_1 = useRef(null);
    const wsh_1 = useRef(null);
    const wsi_1 = useRef(null);

    //Horizontal Scroll Refs
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    //Landing Animation
    useLayoutEffect(() => {
        const tl = gsap.timeline();
        tl
            .from(ws_img.current, {clipPath: "inset(45%)", duration: 0.8, delay: 0.2}, 0)
            .from(ws_ws.current, {yPercent: 100, autoAlpha: 0, duration: 0.4}, 1)
            .from(ws_wt.current, {yPercent: 100, autoAlpha: 0, duration: 0.4, delay: 0.2}, 1)
    }, [])

    //Scraping Slide Item Animations
    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wsh_1.current
            }
        });
        tl
            .from(wsh_1.current, {yPercent: 100, duration: 0.6})
            .from(wsd_1.current, {clipPath: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)", backgroundColor: "#FFF"})
            .from(wsi_1.current, {yPercent: 50, autoAlpha: 0, rotate: -20, backgroundColor: "#FFF"})
    }, [])

    //Horizontal Scroll Animation
    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: "-200vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "2000 top",
                scrub: 0.6,
                pin: true,
                snap: 0.50
            }
        });

        return () => {
            pin.kill()
        }

    }, []);

    return (
        <>
            <Navbar/>
            <div className="web-scraping-header">
                <div className="span-cont"><span ref={ws_ws} className="ws_ws">Web Scraping?</span></div>
                <div className="span-cont"><span ref={ws_wt} className="ws_wt">What's that?</span></div>
                <img ref={ws_img} src="assets/images/ws_landing.svg" alt="landing background"/>
            </div>
            <div className="web-scraping-container">
                <div ref={triggerRef}>
                    <div className="web-scraping-content" ref={sectionRef}>
                        <div className="web-scraping-item web-scraping-what">
                            <div className="item-content">
                                <div className="item-text-content">
                                    <div className="item-header">
                                        <span ref={wsh_1} className="dis-ib">What is Web Scraping?</span>
                                    </div>
                                    <div className="item-des" ref={wsd_1}>
                                        <span>Web scraping is a powerful technique used to automatically extract data from websites. In essence, it enables you to transform unstructured and publicly available data into a structured and organized format that can be analyzed and utilized for various purposes. This process is accomplished by using specialized software or tools that access websites, simulate human browsing behavior, and extract the desired information.</span>
                                    </div>
                                </div>
                                <div className="item-img-content">
                                    <img ref={wsi_1} src="assets/images/wsh_1_img.webp" alt="Scraping Code"/>
                                </div>
                            </div>
                        </div>
                        <div className="web-scraping-item web-scraping-how">
                            <div className="item-content">
                                <div className="item-text-content">
                                    <div className="item-header">
                                        <span className="dis-ib">How Does Web Scraping Work?</span>
                                    </div>
                                    <div className="item-des">
                                        <span>Web scraping involves a series of steps that allow you to gather data from websites systematically:</span>
                                        <ul>
                                            <li><span>Identifying the Target Website</span></li>
                                            <li><span>Analyzing the Website Structure</span></li>
                                            <li><span>Selecting a Web Scraping Tool or Library</span></li>
                                            <li><span>Sending HTTP Requests</span></li>
                                            <li><span>Parsing the HTML</span></li>
                                            <li><span>Data Transformation and Storage</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-img-content">
                                    <img src="assets/images/wb_slide_2_img.webp" alt="HTML Code"/>
                                </div>
                            </div>
                        </div>
                        <div className="web-scraping-item web-scraping-ethics">
                            <div className="item-content">
                                <div className="item-text-content">
                                    <div className="item-header">
                                        <span className="dis-ib">Ethical Considerations of Web Scraping</span>
                                    </div>
                                    <div className="item-des">
                                        <span>While web scraping offers numerous benefits, it's essential to be mindful of ethical considerations:</span>
                                        <ul>
                                            <li><span>Respect Website Policies</span></li>
                                            <li><span>Avoid Overloading Servers</span></li>
                                            <li><span>Data Privacy and Copyright</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-img-content">
                                    <img src="assets/images/wsh_2_img.webp" alt="Ethical Guidelines"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="web-scraping-conclusion">
                <span>If you want to know more about this project</span>
                <a href="https://github.com/HemantDutta/Ares.Web" rel="noreferrer" target="_blank">click here!</a>
            </div>
        </>
    )
}