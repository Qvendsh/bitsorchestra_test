import { Outlet } from 'react-router-dom'
import './App.css'
import FooterComponent from "./components/Footer/FooterComponent.tsx";

function App() {
  return (
    <>
        <div>
            <h1> Hello there :) </h1>
            <Outlet/>
        </div>
        <div className='footer'>
            <FooterComponent/>
        </div>
    </>
  )
}

export default App
