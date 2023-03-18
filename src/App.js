import {useLayoutEffect} from 'react';
import './App.css';
import { observer } from "mobx-react"
import AppStore from "../src/Configs/index"
const App = observer(() => {
  useLayoutEffect(() => {
    const handleResize = async (e) => {
      const width = await window.innerWidth
      var isLocalHost = window.location.hostname === "localhost"
      // console.info("Host :", window.location.hostname)
      AppStore.setHeight(window.innerHeight)
      AppStore.setWidth(window.innerWidth)
      // Firefox 1.0+
      if (width < 1021) {
        AppStore.setDevice(0)
      } else {
        AppStore.setDevice(1)
      }
      if (!isLocalHost && !AppStore.depTesting) {
        console.log = () => {}
        console.info = () => {}
      }
    }

    const scrollPast = async (e) => {
      var elementTarget = document.getElementsByClassName("GuaranteedIncome_Background")[0]
      if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
        AppStore.setFooter(true)
      } else {
        AppStore.setFooter(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", scrollPast, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", scrollPast)
    }
  }, [])
  return (
    <div className="App">
      <div className="App-header">
       
      </div>
    </div>
  );
})

export default App;
