import { useEffect, useRef } from "react";
import {ContainerScene} from "./Scene.elements"
import { initScene, cleanUpScene} from "./ScriptTreasure";
//import { initScene, cleanUpScene, loadModels} from "./ScriptTreasure";

const Treasure = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        initScene(mountRef);
        return () => {
            cleanUpScene();
        };
    }, []);

    return(
        <>
            <ContainerScene 
                ref={mountRef}>
            </ContainerScene>
        </>
    )
};

export default Treasure;