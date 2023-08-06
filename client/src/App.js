import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {Search} from "./pages/Search";
import {WebScraping} from "./pages/WebScraping";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/search"} element={<Search/>}/>
              <Route path={"/web-scraping"} element={<WebScraping/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
