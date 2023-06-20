import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import {lazy, Suspense} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {

    const Home = lazy(()=>import("./pages/Home.tsx"));
    const Reservation = lazy(()=>import("./pages/Reservation.tsx"));

    return(
        <Suspense fallback = {<h1>loading...</h1>}>
            <BrowserRouter>
                <Routes>
                  <Route exact path = "/" element = {<Home/>}/>
                  <Route path = "/reservation" element = {<Reservation/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </Suspense>
    )
}

export default App;