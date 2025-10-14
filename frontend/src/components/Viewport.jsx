import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Viewport = ({ imageUrl }) => {
    const meshRef = useRef();
    const lightRef = useRef();
    const colorMapFront = useLoader(THREE.TextureLoader, imageUrl[0]);
    const colorMapBack = useLoader(THREE.TextureLoader, imageUrl[1]);

    const [dummy] = useState(() => new THREE.Object3D());
    const [prevY, setPrevY] = useState(0.0);

    useEffect(() => {
        meshRef.current.geometry.center();
        // meshRef.current.rotation.y += 1.2;
    }, []);

    const animHandler = (state, delta) => {
        // meshRef.current.rotation.y += prevY + delta;
    };

    useFrame((state, delta) => animHandler(state, delta));

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight color="white" position={[0, 5, 5]} intensity={3.5} ref={lightRef} />
            <mesh ref={meshRef} >
                <boxGeometry args={[4, 4, .05]} />

                {/* <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} /> */}
                {/* <meshBasicMaterial map={colorMap} /> */}
                {/* <meshStandardMaterial map={colorMapBack} /> */}


                <meshStandardMaterial attach="material-0" map={colorMapFront} side={THREE.DoubleSide} />{/* Side (Left)*/}
                <meshStandardMaterial attach="material-1" map={colorMapFront} side={THREE.DoubleSide} />{/* Side (Right)*/}
                <meshStandardMaterial attach="material-2" map={colorMapFront} side={THREE.DoubleSide} />{/* Top */}
                <meshStandardMaterial attach="material-3" map={colorMapFront} side={THREE.DoubleSide} />{/* Bottom */}
                <meshStandardMaterial attach="material-4" map={colorMapFront} side={THREE.DoubleSide} />{/* Front */}
                <meshStandardMaterial attach="material-5" map={colorMapBack} side={THREE.DoubleSide} /> {/* Back */}

            </mesh>
            <OrbitControls
                autoRotate={true}
                onChange={(e) => {
                    if (!e) return;
                    const camera = e.target.object;

                    if (lightRef.current) {
                        lightRef.current.position.set(0, 0, 0);
                        lightRef.current.position.add(camera.position);
                    }
                }}
                enablePan={false}
            />
        </>
    );
};

export default Viewport;