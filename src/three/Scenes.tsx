import { Suspense, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, type GroupProps } from '@react-three/fiber'
import {
  Float,
  Environment,
  Lightformer,
  ContactShadows,
  PerspectiveCamera,
} from '@react-three/drei'
import * as THREE from 'three'
import { Bottle } from './Bottle'
import type { Product } from '../data/products'

/** Self-contained studio: soft light shaped by lightformers (no external HDR). */
function Studio() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 8, 6]} intensity={1.1} castShadow color="#fffbe8" />
      <directionalLight position={[-6, 3, -4]} intensity={0.4} color="#d6f0e0" />
      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#fff7d6"
            position={[0, 5, -3]}
            scale={[10, 6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            color="#d8f2e2"
            position={[-5, 1, 2]}
            scale={[4, 6, 1]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <Lightformer
            form="circle"
            intensity={1.6}
            color="#ffffff"
            position={[4, 3, 3]}
            scale={[3, 3, 1]}
          />
        </group>
      </Environment>
    </>
  )
}

/** Gently turns its children toward the pointer. */
function ParallaxRig({ children, strength = 0.18, ...props }: GroupProps & { strength?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const tx = state.pointer.y * strength
    const ty = state.pointer.x * strength * 1.6
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, tx, 0.05)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, ty, 0.05)
  })
  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  )
}

function CanvasShell({ children }: { children: ReactNode }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}

/** Hero: a trio of softly floating bottles under studio light. */
export function HeroScene() {
  return (
    <CanvasShell>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={42} />
      <Studio />
      <ParallaxRig strength={0.22}>
        <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
          <group position={[-2.5, 0.3, 0]} rotation={[0.1, -0.4, 0.05]}>
            <Bottle hue="lemon" variant="bottle" scale={1.05} />
          </group>
        </Float>
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.1}>
          <group position={[0.3, -0.4, 1.2]} rotation={[0.05, 0.2, -0.04]}>
            <Bottle hue="mint" variant="dropper" scale={1.15} />
          </group>
        </Float>
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1}>
          <group position={[2.7, 0.6, -0.4]} rotation={[0.12, 0.5, 0.06]}>
            <Bottle hue="sprout" variant="jar" scale={1.1} />
          </group>
        </Float>
      </ParallaxRig>
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.32}
        scale={14}
        blur={3}
        far={5}
        color="#7d8a6e"
      />
    </CanvasShell>
  )
}

const variantForHue: Record<Product['hue'], 'bottle' | 'tube' | 'jar' | 'dropper'> = {
  lemon: 'bottle',
  mint: 'dropper',
  sprout: 'tube',
  vanilla: 'bottle',
  petal: 'jar',
}

/** Product page: a single, slowly turning vessel the user can admire. */
export function ProductScene({ hue }: { hue: Product['hue'] }) {
  return (
    <CanvasShell>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
      <Studio />
      <ParallaxRig strength={0.3}>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
          <Bottle hue={hue} variant={variantForHue[hue]} scale={1.5} spin />
        </Float>
      </ParallaxRig>
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.3}
        scale={10}
        blur={3}
        far={4.5}
        color="#7d8a6e"
      />
    </CanvasShell>
  )
}
