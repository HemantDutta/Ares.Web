import {Navbar} from "../components/Navbar";
import axios from "axios";
import {useEffect, useState, useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";
import {useLocation} from "react-router-dom";

export const Search = () => {

    const home_term = useLocation().state;

    //Refs
    const newsGrid = useRef(null);
    const firstRender = useRef(true);

    //States
    const [news, setNews] = useState([]);
    const [news2, setNews2] = useState([]);
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(false);
    const [newAnim, setNewsAnim] = useState(false);
    const [sDone, setSDone] = useState(false);
    const [resultsCount, setResultsCount] = useState(0);

    //Search Term from Home
    useEffect(() => {
        setSearch(home_term);
    }, [])

    //Fetch News when search term received from home
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else {
            if (!sDone) {
                fetchNews()
                setSDone(true);
            }
        }
    }, [search])

    //Search Bar Animation
    function toggleSearchOn() {
        let btn = document.getElementById("search-btn");
        let ser = document.getElementById("search");
        if (!btn.classList.contains("show")) {
            btn.classList.add("show");
            if (window.innerWidth > 500) {
                ser.style.transform = "none";
            }
        }
    }

    //Search Bar Animation
    function toggleSearchOff() {
        let btn = document.getElementById("search-btn");
        let ser = document.getElementById("search");
        if (btn.classList.contains("show")) {
            btn.classList.remove("show");
            if (window.innerWidth > 500) {
                ser.style.transform = "translateX(12%)";
            }
        }
    }

    //Fetching News from Verge
    function fetchNews() {
        setNewsAnim(false);
        setNews([]);
        setNews2([]);
        setLoader(true);
        axios.get(`http://localhost:5000/verge-scraping?search=${search}`).then((res) => {
            setNews(res.data);
            fetchNews2()
        });
    }

    //Fetching News From Venture Beat
    function fetchNews2() {
        axios.get(`http://localhost:5000/vb-scraping?search=${search}`).then((res) => {
            setNews2(res.data);
            setLoader(false)
            setNewsAnim(true);
        })
    }

    //Loader Text Animation
    useEffect(() => {
        if (loader) {
            let text = document.getElementById("searchLoadText");
            text.innerText = "Loading...";
            setTimeout(() => {
                text.innerText = "Sharpening our digital knife...";
                setTimeout(() => {
                    text.innerText = "Scraping The Digital Surface..."
                }, 5000)
            }, 5000)
        }
        let count = news.length + news2.length;
        setResultsCount(count);
    }, [news2])

    //Result Item Animation
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

    //Fix Search Bar on Resize (Mobile)
    window.addEventListener("resize", ()=>{
        let ser = document.getElementById("search");
        if(window.innerWidth < 500){
            ser.style.transform = "none";
        }
    })

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
                    {
                        news2.length !== 0 &&
                        <>
                            <div className="search-result-count">
                                <span>{resultsCount} results found</span>
                            </div>
                            <div className="search-results-grid" ref={newsGrid}>
                                {
                                    news.map((value, index) => {
                                        return (
                                            <div className="result-container" key={index}>
                                                <div className="result-item">
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
                                {
                                    news2.map((value, index) => {
                                        return (
                                            <div className="result-container" key={index}>
                                                <div className="result-item">
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
                        </>
                    }

                    {
                        loader &&
                        <div className="search-loader">
                            <span id="searchLoadText">Scraping The Digital Surface</span>
                            <img src="assets/loader/ares_loading.svg" alt="Loading..."/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}