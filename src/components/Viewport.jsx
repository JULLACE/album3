import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { TextureLoader } from 'three';

const Viewport = ({imageUrl}) => {
    const meshRef = useRef();

    const colorMap = useLoader(TextureLoader, imageUrl)

    const animHandler = (state, delta) => {
        meshRef.current.rotation.y += delta
    }

    useEffect(() => {
        console.log(meshRef.current.geometry);
        meshRef.current.rotation.z = 1.2;
        meshRef.current.geometry.center();
    }, [])

    useFrame((state, delta) => animHandler(state, delta));

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh
                ref={meshRef} >
                <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
                <meshBasicMaterial map={colorMap}/>
            </mesh>
        </>
    );
}

export default Viewport