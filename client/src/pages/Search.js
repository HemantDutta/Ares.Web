import {Navbar} from "../components/Navbar";
import axios from "axios";
import {useEffect, useState, useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";

export const Search = () => {

    //Refs
    const newsGrid = useRef(null);

    //States
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(false);
    const [newAnim, setNewsAnim] = useState(false);

    function toggleSearchOn() {
        let btn = document.getElementById("search-btn");
        let ser = document.getElementById("search");
        if (!btn.classList.contains("show")) {
            btn.classList.add("show");
            ser.style.transform = "none";
        }
    }

    function toggleSearchOff() {
        let btn = document.getElementById("search-btn");
        let ser = document.getElementById("search");
        if (btn.classList.contains("show")) {
            btn.classList.remove("show");
            ser.style.transform = "translateX(12%)";
        }
    }

    //Fetching News from Backend
    function fetchNews() {
        setNewsAnim(false);
        setNews([]);
        setLoader(true);
        axios.get(`http://localhost:5000/test-scraping?search=${search}`).then((res) => {
            setNews(res.data);
            setLoader(false)
            setNewsAnim(true);
        });
    }

    useEffect(() => {
    }, [news])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".result-container .result-item", {
                yPercent: 200,
                duration: 0.4,
                delay: 0.2,
                stagger: 0.1,
                ease: "power2.out"
            })
        }, newsGrid)
        return () => ctx.revert();
    }, [newAnim])

    return (
        <>
            <div className="header-container">
                <Navbar/>
            </div>
            <div className="search">
                <div className="search-bar-container" onFocus={toggleSearchOn} onBlur={toggleSearchOff}>
                    <input type="text" name="search" id="search" placeholder="Search Latest Tech Updates..." onChange={(e) => {
                        setSearch(e.target.value)
                    }}/>
                    <button onClick={fetchNews} id="search-btn"><i className="fa-solid fa-magnifying-glass"/></button>
                </div>
                <div className="search-results-container">
                    <div className="search-results-grid" ref={newsGrid}>
                        {
                            news.map((value, index) => {
                                return (
                                    <div className="result-container">
                                        <div className="result-item" key={index}>
                                            <div className="result-img">
                                                <img src={value.imgSrc} alt="Search Result"/>
                                            </div>
                                            <div className="result-content">
                                                <div className="result-title">
                                                    <span>{value.title}</span>
                                                </div>
                                                <div className="result-des">
                                                    <span>{value.desc}</span>
                                                </div>
                                                <div className="result-cta">
                                                    <a href={value.link} target="_blank" rel="noreferrer">View full article&nbsp;<i className="fa-solid fa-arrow-right"/></a>
                                                    <span>By<span className={`inside color-${value.color}`}> {value.from}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        loader &&
                        <div className="search-loader">
                            <span>Scraping The Digital Surface</span>
                            <img src="assets/loader/ares_loading.svg" alt="Loading..."/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}