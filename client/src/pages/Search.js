import {Navbar} from "../components/Navbar";
import axios from "axios";
import {useEffect, useState} from "react";

export const Search = () => {

    //States
    const [news, setNews] = useState([]);

    function toggleSearchOn() {
        let btn = document.getElementById("search-btn");
        if (!btn.classList.contains("show")) {
            btn.classList.add("show");
        }
    }

    function toggleSearchOff() {
        let btn = document.getElementById("search-btn");
        if (btn.classList.contains("show")) {
            btn.classList.remove("show");
        }
    }

    //Fetching News from Backend
    function fetchNews(){
        axios.get("http://localhost:5000/test-scraping").then((res)=>{setNews(res.data)});
    }

    useEffect(()=>{
        fetchNews()
    },[])


    return (
        <>
            <div className="header-container">
                <Navbar/>
            </div>
            <div className="search">
                <div className="search-bar-container">
                    <input type="text" name="search" id="search" placeholder="Search Latest Tech Updates..." onFocus={toggleSearchOn} onBlur={toggleSearchOff}/>
                    <button id="search-btn"><i className="fa-solid fa-magnifying-glass"/>
                    </button>
                </div>
                <div className="search-results-container">
                    <div className="search-results-grid">
                        {
                            news.map((value,index)=>{
                                return(
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
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}