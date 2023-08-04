import {Navbar} from "../components/Navbar";

export const Search = () => {

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
                        <div className="result-item">
                            <div className="result-img">
                                <img src="https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Search Result"/>
                            </div>
                            <div className="result-content">
                                <div className="result-title">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                </div>
                                <div className="result-des">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda consectetur dolorum ea eum id maxime minus nemo rem reprehenderit?</span>
                                </div>
                                <div className="result-cta">
                                    <a href="https://github.com/HemantDutta" target="_blank">View full article&nbsp;<i className="fa-solid fa-arrow-right"/></a>
                                </div>
                            </div>
                        </div>
                        <div className="result-item">
                            <div className="result-img">
                                <img src="https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Search Result"/>
                            </div>
                            <div className="result-content">
                                <div className="result-title">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                </div>
                                <div className="result-des">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda consectetur dolorum ea eum id maxime minus nemo rem reprehenderit?</span>
                                </div>
                                <div className="result-cta">
                                    <a href="https://github.com/HemantDutta" target="_blank">View full article&nbsp;<i className="fa-solid fa-arrow-right"/></a>
                                </div>
                            </div>
                        </div>
                        <div className="result-item">
                            <div className="result-img">
                                <img src="https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Search Result"/>
                            </div>
                            <div className="result-content">
                                <div className="result-title">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                </div>
                                <div className="result-des">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda consectetur dolorum ea eum id maxime minus nemo rem reprehenderit?</span>
                                </div>
                                <div className="result-cta">
                                    <a href="https://github.com/HemantDutta" target="_blank">View full article&nbsp;<i className="fa-solid fa-arrow-right"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}