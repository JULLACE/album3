import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { GUI } from 'lil-gui';

const Viewport = ({ imageUrl }) => {
    const meshRef = useRef();
    const lightRef = useRef();
    const cameraRef = useRef();

    const colorMapFront = useLoader(THREE.TextureLoader, imageUrl[0]);
    const colorMapBack = useLoader(THREE.TextureLoader, imageUrl[1]);

    const [dummy] = useState(() => new THREE.Object3D());
    const [prevY, setPrevY] = useState(0.0);

    useEffect(() => {
        const options = {
            'Auto Rotate': true,
            'Enable Pan': false,
            'Reset Position': () => { cameraRef.current.reset(); },
            'Fullscreen': () => {
                console.log('i am not fullscreen');
                document.getElementById('cc-box').requestFullscreen().catch((err) => {
                    alert('Open in a seperate tab to allow fullscreen access');
                });
            },
        };

        const gui = new GUI({ title: 'Options', container: document.getElementById('gui-box'), width: 150 });
        gui.open(false);

        // In order to get custom names for each option, run on change
        gui.add(options, 'Auto Rotate').onChange(value => {
            cameraRef.current.autoRotate = value;
        });
        gui.add(options, 'Enable Pan').onChange(value => {
            cameraRef.current.enablePan = value;
        });

        gui.add(options, 'Reset Position');
        gui.add(options, 'Fullscreen');

        return () => {
            gui.destroy();
        };
    }, []);


    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight color="white" position={[0, 5, 5]} intensity={2.5} ref={lightRef} />
            <mesh ref={meshRef} >
                <boxGeometry args={[4, 4, .05]} />

                <meshStandardMaterial attach="material-0" map={colorMapFront} side={THREE.DoubleSide} />{/* Side (Left)*/}
                <meshStandardMaterial attach="material-1" map={colorMapFront} side={THREE.DoubleSide} />{/* Side (Right)*/}
                <meshStandardMaterial attach="material-2" map={colorMapFront} side={THREE.DoubleSide} />{/* Top */}
                <meshStandardMaterial attach="material-3" map={colorMapFront} side={THREE.DoubleSide} />{/* Bottom */}
                <meshStandardMaterial attach="material-4" map={colorMapFront} side={THREE.DoubleSide} />{/* Front */}
                <meshStandardMaterial attach="material-5" map={colorMapBack} side={THREE.DoubleSide} /> {/* Back */}

            </mesh>
            <OrbitControls
                autoRotate={true}
                ref={cameraRef}
                onChange={(e) => {
                    if (!e) return;
                    const camera = e.target.object;

                    // Constantly move light with camera 
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