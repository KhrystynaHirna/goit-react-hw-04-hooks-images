import { Component } from "react";
import ImageInfo from "../image/imageInfo/ImageInfo";
import s from "./App.module.css";


class App extends Component {
    state = {
        input: "",
    }
    

    render() {
        const { input } = this.state;

        return (
            <div className={s.App}>
                <ImageInfo input={input} />  
            </div>
        )}
}

export default App;