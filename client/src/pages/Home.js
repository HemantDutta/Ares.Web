import {Navbar} from "../components/Navbar";
import {Link} from "react-router-dom";
import gsap from "gsap";
import {useLayoutEffect, useRef, useState} from "react";
import axios from "axios";
import {useEffect} from "react";

export const Home = () => {

    //Refs
    const header_ref = useRef(null);
    const hero_image = useRef(null);
    const search_ref = useRef(null)
    const cta_ref = useRef(null)
    const first_render = useRef(true);

    //States
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(true);
    const [headline, setHeadline] = useState([]);
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');

    //GSAP
    useLayoutEffect(() => {
        const timeline = gsap.timeline();
        timeline
            .from(hero_image.current, {clipPath: "inset(35%)", duration: 1, autoAlpha: 0, delay: 0.2})
            .from(header_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.6, delay: 0.2}, 0)
            .from(search_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.4}, 1)
            .from(cta_ref.current, {xPercent: -100, autoAlpha: 0, duration: 0.4, delay: 0.1}, 1)
    }, []);

    //Keydown event handler for search input
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            document.getElementById("searchBtn").click();
        }
    }

    //Fetch Feed Headline
    function fetchHeadline() {
        axios.get("http://localhost:5000/feed-headline")
            .then((res) => {
                if(typeof res.data === "string"){
                    setError(res.data);
                    setLoader(false);
                }
                else{
                    setHeadline(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Fetch Feed Content
    function fetchFeed() {
        axios.get("http://localhost:5000/feed-content")
            .then((res) => {
                if(typeof res.data === "string"){
                    setError(res.data);
                }
                else {
                    setNews(res.data);
                }
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Call headline
    useEffect(() => {
        if (first_render) {
            fetchHeadline();
            fetchFeed();
            first_render.current = false;
        }
    }, []);

    //Change Loading Text
    useEffect(()=>{
        if(loader){
            let lTxt = document.getElementById("loader-txt");
            setTimeout(()=>{
                lTxt.innerText = "Scraping takes time...";
                setTimeout(()=>{
                    lTxt.innerText = "Almost There...";
                    setTimeout(()=>{
                        lTxt.innerText = "It usually doesn't take this long...";
                        setTimeout(()=>{
                            lTxt.innerText = "Thank you so much for your patience...";
                        },8000)
                    },8000)
                },8000)
            },8000)
        }
    },[])


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
                                    <input type="text" name="search" id="search" placeholder="Explore Latest Tech Updates..." onChange={(e) => {
                                        setSearch(e.target.value)
                                    }} onKeyDown={handleKeyDown}/>
                                    <Link to="/search" state={search} id="searchBtn"><i className="fa-solid fa-magnifying-glass"/></Link>
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
                <div className="feed" id="feed">
                    <div className="feed-header">
                        <span>Feed</span>
                    </div>
                    <div className="feed-content">
                        <div className="feed-headline">
                            {
                                error &&
                                <span className="error">{error}</span>
                            }
                            {
                                !error &&
                                headline.map(((value, index) => {
                                    return (
                                        <div className="headline-item" key={index}>
                                            <div className="headline-img">
                                                <img src={value.imgSrc} alt={value.title}/>
                                            </div>
                                            <div className="headline-content">
                                                <div className="headline-title">
                                                    <span>{value.title}</span>
                                                </div>
                                                <div className="headline-des">
                                                    <p>{value.desc}</p>
                                                </div>
                                                <div className="headline-cta">
                                                    <a href={value.link} target={"_blank"} rel="noreferrer">View full article&nbsp;<i className="fa-solid fa-arrow-right"/></a>
                                                    <span>By {value.from}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                            {
                                headline.length!==0 &&
                                <div className="feed-headline-header">
                                    <span>Your Daily Dose</span>
                                    <span>of Tech News</span>
                                </div>
                            }
                        </div>
                        {
                            loader &&
                            <div className="feed-loader">
                                <img src="assets/loader/ares_loading.svg" alt="Loading..."/>
                                <span id="loader-txt">Loading Feed...</span>
                            </div>
                        }
                        <div className="feed-flex">
                            {
                                !error &&
                                news.map((value, index) => {
                                    return (
                                        <div className="result-container" key={index}>
                                            <div className="result-item">
                                                <div className="result-img">
                                                    <img src={value.imgSrc} alt="Search Result" loading={"lazy"}/>
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
                            !loader &&
                            <div className="search-thatS-it">
                                <span className="swirl"></span>
                                <span>That's It</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}