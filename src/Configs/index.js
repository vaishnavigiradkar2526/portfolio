import { makeAutoObservable } from "mobx"

class AppStore {
    appLoaded = false
    width = window.innerWidth
    device = 0
    height = window.innerHeight
    isTesting = window.location.href.includes("testing")
    depTesting = new URL(window.location.href).searchParams.get("depTesting") === "yes"
    isAndroid = new URL(window.location.href).searchParams.get("device") === "android"
    isIos = new URL(window.location.href).searchParams.get("device") === "ios"
    lazyScript = []
    isToggle = false
    constructor() {
        makeAutoObservable(this)
    }

    setAppLoaded = (data) => (this.appLoaded = data)
    setIsToggle = (data) => (this.isToggle = data)
    setHeight = (data) => (this.height = data)
    setWidth = (data) => (this.width = data)
    setDevice = (data) => (this.device = data)
    setIsTesting = (data) => (this.isTesting = data)
    setLazyScript = (data) => (this.lazyScript = data)
}

export default new AppStore()
