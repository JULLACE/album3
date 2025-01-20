import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { TextureLoader } from 'three';

const Viewport = ({imageUrl}) => {
    const meshRef = useRef();

    const colorMap = useLoader(TextureLoader, imageUrl)

    useEffect(() => {
        meshRef.current.geometry.center();
    }, [])

    const animHandler = (state, delta) => {
        meshRef.current.rotation.y += delta

        const section = document.getElementById('cc-box')
        section.addEventListener("mousemove", event => {
            // Looking functionality goes here            
        })
    }

    useFrame((state, delta) => animHandler(state, delta));

    return (
        <>
            <ambientLight intensity={0.1} />
            {/* <directionalLight color="white" position={[0, 0, 5]} /> */}
            <mesh
                ref={meshRef} >
                {/* <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} /> */}
                <boxGeometry args={[.04, 4, 4]} />
                <meshBasicMaterial map={colorMap} />

                {/* <meshBasicMaterial attach="material-0" map={colorMap} /> */}
                {/* <meshBasicMaterial attach="material-1" map={colorMap} /> */}
                {/* <meshBasicMaterial attach="material-2" map={colorMap} /> */}
                {/* <meshBasicMaterial attach="material-3" map={colorMap} /> */}
            </mesh>
        </>
    );
}

export default Viewport