import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { hueThree } from '../data/products'
import type { Product } from '../data/products'

type Hue = Product['hue']
export type Variant = 'bottle' | 'tube' | 'jar' | 'dropper'

interface BottleProps {
  hue: Hue
  variant?: Variant
  scale?: number
  /** subtle idle rotation for product page */
  spin?: boolean
}

/**
 * A friendly, soft-edged skincare vessel built from primitives.
 * Frosted glass body (transmission) + tinted liquid + matte cap.
 */
export function Bottle({ hue, variant = 'bottle', scale = 1, spin = false }: BottleProps) {
  const group = useRef<THREE.Group>(null)
  const colors = hueThree[hue]

  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.35
  })

  const glassProps = {
    thickness: 1.4,
    roughness: 0.12,
    transmission: 1,
    ior: 1.32,
    chromaticAberration: 0.04,
    backside: true,
    backsideThickness: 0.8,
    samples: 6,
    resolution: 256,
    distortion: 0.15,
    distortionScale: 0.25,
    temporalDistortion: 0.05,
    color: colors.glass,
    attenuationColor: colors.glass,
    attenuationDistance: 1.4,
  } as const

  const cap = (
    <mesh castShadow position={[0, dims(variant).capY, 0]}>
      <cylinderGeometry args={[dims(variant).capR, dims(variant).capR, dims(variant).capH, 48]} />
      <meshPhysicalMaterial
        color={colors.cap}
        roughness={0.55}
        clearcoat={0.6}
        clearcoatRoughness={0.4}
        sheen={0.5}
        sheenColor={'#ffffff'}
      />
    </mesh>
  )

  return (
    <group ref={group} scale={scale} dispose={null}>
      {variant === 'jar' ? (
        // wide, low jar
        <>
          <mesh castShadow>
            <cylinderGeometry args={[0.85, 0.82, 0.95, 64]} />
            <MeshTransmissionMaterial {...glassProps} />
          </mesh>
          {/* liquid / cream fill */}
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.74, 0.72, 0.6, 48]} />
            <meshStandardMaterial color={colors.liquid} roughness={0.35} transparent opacity={0.92} />
          </mesh>
          <mesh castShadow position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.9, 0.88, 0.32, 64]} />
            <meshPhysicalMaterial color={colors.cap} roughness={0.5} clearcoat={0.5} />
          </mesh>
        </>
      ) : variant === 'dropper' ? (
        <>
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.56, 1.9, 64]} />
            <MeshTransmissionMaterial {...glassProps} />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.42, 0.48, 1.3, 48]} />
            <meshStandardMaterial color={colors.liquid} roughness={0.3} transparent opacity={0.85} />
          </mesh>
          {/* neck */}
          <mesh castShadow position={[0, 1.12, 0]}>
            <cylinderGeometry args={[0.26, 0.3, 0.45, 32]} />
            <meshPhysicalMaterial color={colors.cap} roughness={0.5} clearcoat={0.5} />
          </mesh>
          {/* rubber bulb */}
          <mesh castShadow position={[0, 1.55, 0]}>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial color={colors.cap} roughness={0.7} />
          </mesh>
        </>
      ) : variant === 'tube' ? (
        <>
          <RoundedBox args={[0.95, 2.1, 0.5]} radius={0.24} smoothness={6} castShadow>
            <MeshTransmissionMaterial {...glassProps} />
          </RoundedBox>
          <RoundedBox args={[0.7, 1.5, 0.32]} radius={0.15} smoothness={5} position={[0, -0.1, 0]}>
            <meshStandardMaterial color={colors.liquid} roughness={0.35} transparent opacity={0.9} />
          </RoundedBox>
          <mesh castShadow position={[0, 1.22, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.42, 40]} />
            <meshPhysicalMaterial color={colors.cap} roughness={0.5} clearcoat={0.5} />
          </mesh>
        </>
      ) : (
        // default rounded bottle
        <>
          <RoundedBox args={[1.05, 1.9, 0.85]} radius={0.34} smoothness={8} castShadow>
            <MeshTransmissionMaterial {...glassProps} />
          </RoundedBox>
          {/* liquid */}
          <RoundedBox args={[0.82, 1.2, 0.62]} radius={0.22} smoothness={6} position={[0, -0.2, 0]}>
            <meshStandardMaterial color={colors.liquid} roughness={0.3} transparent opacity={0.9} />
          </RoundedBox>
          {/* neck */}
          <mesh castShadow position={[0, 1.02, 0]}>
            <cylinderGeometry args={[0.3, 0.34, 0.3, 40]} />
            <meshPhysicalMaterial color={colors.cap} roughness={0.5} clearcoat={0.5} />
          </mesh>
          {/* pump cap */}
          {cap}
        </>
      )}
    </group>
  )
}

function dims(variant: Variant) {
  switch (variant) {
    case 'tube':
      return { capR: 0.28, capH: 0.42, capY: 1.22 }
    default:
      return { capR: 0.33, capH: 0.5, capY: 1.35 }
  }
}
