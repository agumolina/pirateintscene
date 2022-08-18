import styled from "styled-components"

export const SceneContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

export const SceneWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export const FloatPoint = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    &: hover {
        .float-point-text{
            opacity: 1;
            transition: 0.3 all ease;
        }
    }
`

export const FloatPointLabel = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    left: -20px;
    top: -20px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50%;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    transition: 0.3 all ease;
    cursor: pointer;

    &:hover{
        transform: scale(1.1,1.1);
        background-color: rgba(0,0,0,0.9);
        transtion: .3 all ease;
    }

`

export const FloatPointText = styled.div`
    width: 200px;
    padding: 1rem;
    position: absolute;
    top: 40px;
    left: -100px;
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    font-align: center;
    transition: 0.3 all ease;
    opacity: 0;
    pointer-events: none;
` 