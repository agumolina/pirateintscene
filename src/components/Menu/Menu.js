import "./Style.css"
import {resetAnimation} from "../Scene/Script"

const Menu = () => {
    return(
        <>
        <div className="MenuContainer">
            <div className="MenuWrapper">
            <div className="VistaGeneral">
                <button onClick={()=> resetAnimation()}>
                    Vista General
                </button>
            </div>
            </div>
            
        </div>
        
        </>
    )
}

export default Menu