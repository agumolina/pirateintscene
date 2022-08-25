import { useEffect, useRef } from "react";
import {ContainerScene} from "./Scene.elements"
import { SceneContainer, SceneWrapper, FloatPoint, FloatPointLabel, FloatPointText} from "./Style";
import { initScene, cleanUpScene, loadGroups, loadModels, fetchFloatPointsElements, gsapAnimation} from "./Script";

// Value of animations
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
    },
    treasure: {
        target: {
            x: 0.72071,
            y: 0.20534,
            z: -0.13824
        },
        camera: {
            x: 2.3527,
            y: 4.84365,
            z: 1.57965
        },
        zoom: 2.08
    },
    shovel: {
        target: {
            x: 3.61351,
            y: 0.5,
            z: 0.84595
        },
        camera: {
            x: 2.0473,
            y: 0.75,
            z: 2.4365
        },
        zoom: 0.71536
    }
}


const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        initScene(mountRef);
        loadGroups()
        loadModels("./model/ship_dark.glb", "ship")
        loadModels("./model/palm_short.gltf", "palms")
        loadModels("./model/palm_detailed_long.gltf", "palms")
        loadModels("./model/formation_stone.gltf", "stones")
        loadModels("./model/formation_stone.gltf", "stones")
        loadModels("./model/tower.gltf", "tower")
        loadModels("./model/rockFlat.glb","beach")
        loadModels("./model/map.glb","map")
        loadModels("./model/historia_map.glb","history")
        loadModels("./model/x_map.glb","xMap")
        loadModels("./model/shovel.glb","shovel")
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
                    <FloatPointLabel onClick={() => {
                        gsapAnimation(
                            animations.treasure.target,
                            animations.treasure.camera,
                            animations.treasure.zoom
                            )
                    }}>
                        3
                    </FloatPointLabel>
                    <FloatPointText className="float-point-text">
                        Mapa del tesoro
                    </FloatPointText>
                </FloatPoint>
                <FloatPoint className="float-point-4">
                    <FloatPointLabel onClick={() => {
                        gsapAnimation(
                            animations.shovel.target,
                            animations.shovel.camera,
                            animations.shovel.zoom
                            )
                        window.open('https://arvo.ar')
                    }}>
                        4
                    </FloatPointLabel>
                    <FloatPointText className="float-point-text">
                        arvo Pagina Oficial
                    </FloatPointText>
                </FloatPoint>
                
            </SceneWrapper>
            
        </SceneContainer>
        </>
    )
};

export default Scene;