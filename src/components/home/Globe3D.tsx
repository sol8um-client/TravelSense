"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Float, Stars } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useRef, useMemo, Suspense, useState, useEffect } from "react"
import * as THREE from "three"

/* ═══ Mobile detection hook ═══ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

/* ═══ Brand Palette ═══ */
const CHERRY = "#C4324A"
const GOLD = "#D4A853"
const BLUE_LIGHT = "#1B2D4E"

/* ═══ Helpers ═══ */
function ll(lat: number, lng: number, r = 1.005): THREE.Vector3 {
  const p = (90 - lat) * (Math.PI / 180)
  const t = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(r * Math.sin(p) * Math.cos(t)),
    r * Math.cos(p),
    r * Math.sin(p) * Math.sin(t),
  )
}
function ll3(lat: number, lng: number, r = 1.005): [number, number, number] {
  const v = ll(lat, lng, r)
  return [v.x, v.y, v.z]
}

/* ═══════════════════════════════════════════════════════
   LAYER 1 — TEXTURED GLOBE SPHERE
   Frosted glass look: light silver base, continents show
   as slightly more defined/opaque areas via NASA texture
   ═══════════════════════════════════════════════════════ */

function GlobeSphere() {
  const texture = useLoader(THREE.TextureLoader, "/textures/earth-light.jpg")

  const mat = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      uniforms: {
        earthMap: { value: texture },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D earthMap;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          vec4 tex = texture2D(earthMap, vUv);
          // Convert to luminance — land is brighter in Blue Marble
          float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

          // Frosted glass: ocean = light, land = clearly visible darker
          vec3 oceanColor = vec3(0.80, 0.83, 0.88);
          vec3 landColor  = vec3(0.50, 0.55, 0.63);
          float landMask = smoothstep(0.06, 0.3, lum);
          vec3 color = mix(oceanColor, landColor, landMask);

          // Rim: edges darken slightly to create visible boundary
          float facing = dot(vNormal, vViewDir);
          float rim = 1.0 - facing;
          // Darken the edge instead of lightening it — keeps globe boundary visible
          vec3 edgeColor = vec3(0.55, 0.60, 0.70);
          color = mix(color, edgeColor, smoothstep(0.5, 0.9, rim) * 0.4);
          // Keep solid opacity even at edges
          float alpha = mix(0.92, 0.6, smoothstep(0.0, 1.0, pow(rim, 2.5)));

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    })
    return m
  }, [texture])

  return (
    <mesh>
      <sphereGeometry args={[1, 96, 96]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══ Globe Edge Rim — visible boundary line ═══ */

function GlobeEdge() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
        fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim = 1.0 - abs(dot(vNormal, vViewDir));
        // Visible edge boundary — wider and stronger
        float edge = smoothstep(0.45, 0.75, rim);
        // Blue-grey edge color matching brand navy
        vec3 color = vec3(0.35, 0.42, 0.55);
        float alpha = edge * 0.65;
        gl_FragColor = vec4(color, alpha);
      }
    `,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [],
  )

  return (
    <mesh>
      <sphereGeometry args={[1.002, 96, 96]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   LAYER 2 — ATMOSPHERE GLOW
   Seamless fade from globe edge → white background
   ═══════════════════════════════════════════════════════ */

function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
        fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main(){
        float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float t = rim * rim * (3.0 - 2.0 * rim);  // smooth hermite

        // Light blue haze → white
        vec3 c1 = vec3(0.75, 0.80, 0.88);  // soft blue (near globe surface)
        vec3 c2 = vec3(0.92, 0.93, 0.96);  // near white
        vec3 color = mix(c1, c2, smoothstep(0.1, 0.7, t));

        // Strong visible glow that blends to white
        float alpha = smoothstep(0.0, 0.15, rim) * (1.0 - smoothstep(0.5, 1.0, rim)) * 0.8;
        // Wide white outer bloom
        alpha += smoothstep(0.15, 0.55, rim) * (1.0 - rim) * 0.55;

        gl_FragColor = vec4(color, alpha);
      }
    `,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    [],
  )

  return (
    <mesh>
      <sphereGeometry args={[1.3, 64, 64]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════
   LAYER 3 — DESTINATION DOTS
   Simple small colored spheres at key cities
   Gold = featured/Asian   Blue = international
   ═══════════════════════════════════════════════════════ */

type Dest = {
  lat: number
  lng: number
  color: string
}

const DESTS: Dest[] = [
  // Cherry/pink dots (like the reference) — featured
  { lat: 18.5, lng: 73.8, color: CHERRY },      // Pune (hub)
  { lat: -8.3, lng: 115.1, color: CHERRY },      // Bali
  { lat: 27.17, lng: 78.04, color: CHERRY },     // Taj Mahal
  { lat: 29.98, lng: 31.13, color: CHERRY },     // Pyramids
  { lat: 35.6, lng: 139.6, color: CHERRY },      // Tokyo
  { lat: 25.2, lng: 55.2, color: CHERRY },       // Dubai
  { lat: 26.9, lng: 75.7, color: CHERRY },       // Jaipur
  { lat: -13.16, lng: -72.55, color: CHERRY },   // Machu Picchu
  { lat: 13.08, lng: 80.27, color: CHERRY },     // Chennai
  { lat: 28.6, lng: 77.2, color: CHERRY },       // Delhi
  // Blue dots — international
  { lat: 36.4, lng: 25.4, color: BLUE_LIGHT },   // Santorini
  { lat: 46.8, lng: 8.2, color: BLUE_LIGHT },    // Swiss Alps
  { lat: 41.89, lng: 12.49, color: BLUE_LIGHT }, // Colosseum
  { lat: 48.86, lng: 2.35, color: BLUE_LIGHT },  // Eiffel Tower
  { lat: 40.7, lng: -74, color: BLUE_LIGHT },    // New York
  { lat: 51.5, lng: -0.1, color: BLUE_LIGHT },   // London
  { lat: -33.8, lng: 151.2, color: BLUE_LIGHT }, // Sydney
  { lat: 40.43, lng: 116.57, color: BLUE_LIGHT },// Great Wall
  { lat: 55.75, lng: 37.62, color: BLUE_LIGHT }, // Moscow
  { lat: 1.35, lng: 103.82, color: BLUE_LIGHT }, // Singapore
]

/* Location Pin — simple 3D pin: cone needle + sphere head, oriented outward */
function DestinationPins() {
  const ref = useRef<THREE.Group>(null)

  useFrame((st) => {
    if (!ref.current) return
    const t = st.clock.elapsedTime
    // Gentle pulse on pin heads
    ref.current.children.forEach((pinGroup, i) => {
      const head = pinGroup.children[1] as THREE.Mesh
      if (head) {
        const s = 1 + Math.sin(t * 1.5 + i * 0.9) * 0.15
        head.scale.setScalar(s)
      }
    })
  })

  return (
    <group ref={ref}>
      {DESTS.map((d, i) => {
        const surfacePos = ll(d.lat, d.lng, 1.003)
        const tipPos = ll(d.lat, d.lng, 1.04)
        const normal = surfacePos.clone().normalize()
        // Build a quaternion to orient the pin along the surface normal
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          normal,
        )
        return (
          <group key={i} position={[surfacePos.x, surfacePos.y, surfacePos.z]} quaternion={quat}>
            {/* Needle — thin cone from surface outward */}
            <mesh position={[0, 0.018, 0]}>
              <coneGeometry args={[0.003, 0.035, 6]} />
              <meshStandardMaterial
                color={d.color}
                emissive={d.color}
                emissiveIntensity={0.6}
              />
            </mesh>
            {/* Pin head — sphere at top */}
            <mesh position={[0, 0.038, 0]}>
              <sphereGeometry args={[0.008, 10, 10]} />
              <meshStandardMaterial
                color={d.color}
                emissive={d.color}
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   LAYER 4 — FLIGHT ROUTE ARCS
   Curved arcs with animated draw-on + traveling glow dot
   The hero visual — makes this feel like a travel globe
   ═══════════════════════════════════════════════════════ */

function FlightArc({
  from,
  to,
  color,
  h = 0.25,
  speed = 0.07,
}: {
  from: [number, number]
  to: [number, number]
  color: string
  h?: number
  speed?: number
}) {
  const tubeRef = useRef<THREE.Mesh>(null)
  const dotRef = useRef<THREE.Mesh>(null)

  const { curve, geo, vCount } = useMemo(() => {
    const s = ll(from[0], from[1])
    const e = ll(to[0], to[1])
    const m = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5)
    m.multiplyScalar((1 + h) / (m.length() || 1))
    const c = new THREE.QuadraticBezierCurve3(s, m, e)
    const g = new THREE.TubeGeometry(c, 48, 0.0018, 4, false)
    return {
      curve: c,
      geo: g,
      vCount: g.index ? g.index.count : g.attributes.position.count,
    }
  }, [from, to, h])

  useFrame((st) => {
    const t = st.clock.elapsedTime
    // Animated draw-on: draw in quickly, stay visible for a long time, then redraw
    if (tubeRef.current) {
      const cycle = (t * 0.12 + from[0] * 0.01) % 4.0 // offset per arc so they don't all sync
      const draw =
        cycle < 0.8
          ? cycle / 0.8        // draw in (0→1) over 0.8s
          : 1                   // stay fully visible the rest of the cycle
      tubeRef.current.geometry.setDrawRange(
        0,
        Math.floor(Math.max(0, Math.min(1, draw)) * vCount),
      )
    }
    // Traveling glow dot
    if (dotRef.current) {
      const p = (t * speed) % 1
      dotRef.current.position.copy(curve.getPoint(p))
    }
  })

  return (
    <group>
      <mesh ref={tubeRef} geometry={geo}>
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      {/* Traveling dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.007, 6, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

/* ═══ EARTH — all layers assembled ═══ */

function Earth() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.025
  })

  return (
    <group ref={ref} rotation={[0.15, -0.3, 0.05]}>
      <GlobeSphere />
      <GlobeEdge />
      <DestinationPins />

      {/* Flight routes — cherry/pink like reference */}
      <FlightArc from={[18.5, 73.8]} to={[48.86, 2.35]} color={CHERRY} h={0.4} speed={0.07} />
      <FlightArc from={[18.5, 73.8]} to={[-8.3, 115.1]} color={CHERRY} h={0.35} speed={0.06} />
      <FlightArc from={[40.7, -74]} to={[51.5, -0.1]} color={CHERRY} h={0.3} speed={0.08} />
      <FlightArc from={[18.5, 73.8]} to={[25.2, 55.2]} color={CHERRY} h={0.2} speed={0.09} />
      <FlightArc from={[35.6, 139.6]} to={[-33.8, 151.2]} color={CHERRY} h={0.4} speed={0.05} />
      <FlightArc from={[18.5, 73.8]} to={[35.6, 139.6]} color={CHERRY} h={0.35} speed={0.065} />
      <FlightArc from={[18.5, 73.8]} to={[-33.8, 151.2]} color={CHERRY} h={0.45} speed={0.055} />
      <FlightArc from={[18.5, 73.8]} to={[40.7, -74]} color={CHERRY} h={0.5} speed={0.05} />
      <FlightArc from={[51.5, -0.1]} to={[25.2, 55.2]} color={BLUE_LIGHT} h={0.25} speed={0.07} />
    </group>
  )
}

/* ═══ Post-processing ═══ */

function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        intensity={0.3}
        mipmapBlur
      />
      <Vignette offset={0.1} darkness={0.12} />
    </EffectComposer>
  )
}

/* ═══ EXPORT ═══ */

export default function Globe3D() {
  const isMobile = useIsMobile()

  return (
    <Canvas
      dpr={isMobile ? [1, 1] : [1, 2]}
      camera={{ position: [0, 0.1, 2.93], fov: 42 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? "low-power" : "high-performance" }}
      style={{ background: "transparent" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} color="#f0f4ff" />
        {!isMobile && <pointLight position={[-2, 1, 4]} intensity={0.15} color="#b0c4de" />}

        {!isMobile && <Stars radius={80} depth={60} count={600} factor={2} saturation={0} fade speed={0.3} />}
        <Atmosphere />

        {isMobile ? (
          <Earth />
        ) : (
          <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.12}>
            <Earth />
          </Float>
        )}

        {!isMobile && <Effects />}
      </Suspense>
    </Canvas>
  )
}
