import { useEffect, useRef } from "react";
import {ContainerScene} from "./Scene.elements"
import { SceneContainer, SceneWrapper, FloatPoint, FloatPointLabel, FloatPointText} from "./Style";
import { initScene, cleanUpScene, loadGroups, loadModels, fetchFloatPointsElements, gsapAnimation} from "./Script";

const animations = {
    pirateShip: {
        target: {
            x: -1.51255,
            y: 1.23608,
            z: 0.03355
        },
        camera: {
            x: 5.27312,
            y: 2.86807,
            z: 6.73332
        },
        zoom: 1
    },
    tower: {
        target: {
            x: 2.61039,
            y: 1.32197,
            z: -0.39592
        },
        camera: {
            x: -6.58032,
            y: 2.95397,
            z: 10
        },
        zoom: 1.61119
    }
}


const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        initScene(mountRef);
        loadGroups()
        loadModels("./model/ship_dark.gltf", "ship")
        loadModels("./model/palm_short.gltf", "palms")
        loadModels("./model/palm_detailed_long.gltf", "palms")
        loadModels("./model/formation_stone.gltf", "stones")
        loadModels("./model/formation_stone.gltf", "stones")
        loadModels("./model/tower.gltf", "tower")
        loadModels("./model/rockFlat.glb","beach")
        fetchFloatPointsElements()

        //loadGui()
        return () => {
            cleanUpScene();
        };
    }, []);

    return(
        <>
        <SceneContainer>
            <SceneWrapper>
                <ContainerScene 
                    ref={mountRef}>
                </ContainerScene>

                <FloatPoint className="float-point-0">
                    <FloatPointLabel onClick={() => {
                        gsapAnimation(
                            animations.pirateShip.target,
                            animations.pirateShip.camera,
                            animations.pirateShip.zoom
                            )
                    }}>
                        1
                    </FloatPointLabel>
                    <FloatPointText className="float-point-text">
                    El Arvonoque, barco pirata del siglo XVII, 
                    temido por su gran puntería con solo 3 cañones.
                    </FloatPointText>
                </FloatPoint>
                <FloatPoint className="float-point-1">
                    <FloatPointLabel onClick={() => {
                        gsapAnimation(
                            animations.tower.target,
                            animations.tower.camera,
                            animations.tower.zoom
                            )
                    }}>
                        2
                    </FloatPointLabel>
                    <FloatPointText className="float-point-text">
                        La Torre es la guarida de los piratas que entran en vacaciones.
                    </FloatPointText>
                </FloatPoint>
                <FloatPoint className="float-point-3">
                    <FloatPointLabel>
                        3
                    </FloatPointLabel>
                    <FloatPointText className="float-point-text">
                        Busqueda del tesoro: Proximamente!
                    </FloatPointText>
                </FloatPoint>
                
            </SceneWrapper>
            
        </SceneContainer>
        </>
    )
};

export default Scene;