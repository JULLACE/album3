import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { easing } from 'maath'
import * as THREE from 'three';

const Viewport = ({ imageUrl }) => {
    const meshRef = useRef();
    const colorMapFront = useLoader(THREE.TextureLoader, imageUrl[0])
    const colorMapBack = useLoader(THREE.TextureLoader, imageUrl[1])

    const [ dummy ] = useState(() => new THREE.Object3D())

    useEffect(() => {
        meshRef.current.geometry.center();
        meshRef.current.rotation.y += 1.2
    }, [])

    const animHandler = (state, delta) => {
        const section = document.getElementById('cc-box')

        // using CSS selectors hacks
        if (section.matches(":hover") && section.matches(":active")) {
            dummy.lookAt(state.pointer.x, state.pointer.y, 1)
            easing.dampQ(meshRef.current.quaternion, dummy.quaternion, 0.15, delta)
        }
        else {
            meshRef.current.rotation.y += delta
            if (meshRef.current.rotation.x !== 0) meshRef.current.rotation.x = 0
            if (meshRef.current.rotation.z !== 0) meshRef.current.rotation.z = 0
        }
    }

    useFrame((state, delta) => animHandler(state, delta));

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight color="white" position={[0, 5, 5]} intensity={2.5}/>
            <mesh ref={meshRef} >
                {/* <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} /> */}
                <boxGeometry args={[4, 4, .05]} />
                {/* <meshBasicMaterial map={colorMap} /> */}
                {/* <meshStandardMaterial map={colorMapBack} /> */}
            

                <meshStandardMaterial attach="material-0" map={colorMapFront} />
                <meshStandardMaterial attach="material-1" map={colorMapFront} />
                <meshStandardMaterial attach="material-2" map={colorMapFront} />
                <meshStandardMaterial attach="material-3" map={colorMapFront} />
                <meshStandardMaterial attach="material-4" map={colorMapFront} />
                <meshStandardMaterial attach="material-5" map={colorMapBack} />
                <meshStandardMaterial attach="material-6" map={colorMapFront} />

            </mesh>
        </>
    );
}

export default Viewport