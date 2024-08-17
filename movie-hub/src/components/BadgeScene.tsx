import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
  Text,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import textureImage from "../assets/favicon.png"; // Path to your texture image
import { useDarkMode } from "../providers/DarkmodeContextProvider";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload(
  "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb"
);

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  userName?: string;
  userEmail?: string;
  userPicture?: string;
}

export default function BadgeScene({
  userEmail,
  userName,
  userPicture,
}: BandProps) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band
          userEmail={userEmail}
          userName={userName}
          userPicture={userPicture}
        />
      </Physics>
      <Environment background blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  userName,
  userEmail,
  userPicture,
}: BandProps) {
  const { darkMode } = useDarkMode();
  const bandColor = darkMode ? "#1b2036" : "#aaa";
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const carabiner = useRef<THREE.Mesh>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as any,
    angularDamping: 2,
    linearDamping: 2,
  };
  const { nodes, materials } = useGLTF(
    "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb"
  ) as any;
  const profileTexture = useTexture(userPicture || textureImage);

  // Adjust texture mapping
  profileTexture.wrapS = THREE.RepeatWrapping;
  profileTexture.wrapT = THREE.RepeatWrapping;
  profileTexture.repeat.set(1, 1); // Adjust these values as needed
  profileTexture.offset.set(0, 0); // Adjust if necessary

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, setDragged] = useState<THREE.Vector3 | boolean>(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged instanceof THREE.Vector3) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current!.lerped)
          ref.current!.lerped = new THREE.Vector3().copy(
            ref.current!.translation() as THREE.Vector3
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current!.lerped.distanceTo(
              ref.current!.translation() as THREE.Vector3
            )
          )
        );
        ref.current!.lerped.lerp(
          ref.current!.translation() as THREE.Vector3,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current!.translation() as THREE.Vector3);
      curve.points[1].copy(j2.current!.lerped);
      curve.points[2].copy(j1.current!.lerped);
      curve.points[3].copy(fixed.current!.translation() as THREE.Vector3);
      (band.current!.geometry as MeshLineGeometry).setPoints(
        curve.getPoints(32)
      );

      ang.copy(card.current!.angvel() as THREE.Vector3);
      rot.copy(card.current!.rotation() as THREE.Vector3);
      card.current!.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  let names = userName?.split(" ") || ["Name1", "Name2"];

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              setDragged(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation() as THREE.Vector3))
              );
            }}
          >
            {/* Carabiner */}
            <mesh
              ref={carabiner}
              position={[1, 0, 0]} // Position between band and card
              scale={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[0.2, 0.05, 16, 100]} />
              <meshStandardMaterial color="gray" />
            </mesh>
            <mesh geometry={nodes.card.geometry}>
              <meshStandardMaterial color="#fff" />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            {/* Profile Picture */}
            <mesh
              position={[0, 0.6, 0.01]} // Adjust the position as needed
              scale={[0.35, 0.35, 1]} // Adjust the scale as needed
            >
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial map={profileTexture} />
            </mesh>

            {/* 3D Text Component */}
            <Text
              position={[0, 0.85, 0.009]} // Adjust the position as needed
              fontSize={0.06} // Adjust the font size
              color="black" // Adjust the color
              anchorX="center" // Align text starting from the left
              anchorY="middle" // Vertical alignment
              rotation={[0, 0, 0]} // Rotate text if needed
            >
              {`V I S I T O R   P A S S`}
            </Text>
            <Text
              position={[-0.186, 0.98, 0.009]} // Adjust the position as needed
              fontSize={0.04} // Adjust the font size
              color="gray" // Adjust the color
              anchorX="center" // Align text starting from the left
              anchorY="middle" // Vertical alignment
              rotation={[0, 0, 0]} // Rotate text if needed
            >
              Discover Shows
            </Text>
            <Text
              position={[0, 0.3, 0.009]} // Adjust the position as needed
              fontSize={0.0659} // Adjust the font size
              color="black" // Adjust the color
              anchorX="center" // Align text starting from the left
              anchorY="middle" // Vertical alignment
              rotation={[0, 0, 0]} // Rotate text if needed
            >
              {names[0]}
            </Text>
            <Text
              position={[0, 0.21, 0.009]} // Adjust the position as needed
              fontSize={0.0659} // Adjust the font size
              color="black" // Adjust the color
              anchorX="center" // Align text starting from the left
              anchorY="middle" // Vertical alignment
              rotation={[0, 0, 0]} // Rotate text if needed
            >
              {names[1]}
            </Text>
            <Text
              position={[0, 0.079, 0.009]} // Adjust the position as needed
              fontSize={0.042} // Adjust the font size
              color="gray" // Adjust the color
              anchorX="center" // Align text starting from the left
              anchorY="middle" // Vertical alignment
              rotation={[0, 0, 0]} // Rotate text if needed
            >
              {userEmail || "email@email.email"}
            </Text>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={bandColor}
          depthTest={false}
          resolution={[width, height]}
          repeat={[0.25, 0.25]} // Adjust these values to fit the texture properly
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
