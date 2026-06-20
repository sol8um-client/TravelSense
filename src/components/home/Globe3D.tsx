"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Float, Stars, Html } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useRef, useMemo, Suspense, useState, useEffect } from "react"
import * as THREE from "three"
import Image from "next/image"
import Link from "next/link"
import { destinations } from "@/data/destinations"

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
   LAYER 1 - TEXTURED GLOBE SPHERE
   Frosted glass look: light silver base, continents show
   as slightly more defined/opaque areas via NASA texture
   ═══════════════════════════════════════════════════════ */

/* Colored grade: the daymap is already vivid, so just a gentle contrast + a soft
   atmospheric blue limb. */
const COLORED_BODY = `
  vec3 base = texture2D(earthMap, vUv).rgb;
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  vec3 col = mix(vec3(lum), base, 1.06);                  // +6% saturation
  col = clamp((col - 0.5) * 1.05 + 0.5, 0.0, 1.0);        // gentle contrast
  float facing = dot(vNormal, vViewDir);
  float rim = 1.0 - facing;
  col = mix(col, vec3(0.42, 0.62, 0.90), smoothstep(0.55, 1.0, rim) * 0.42);
  float alpha = mix(0.99, 0.70, smoothstep(0.0, 1.0, pow(rim, 2.3)));
  gl_FragColor = vec4(col, alpha);
`

/* Grey frosted look (the "older greyish globe", kept on the destinations hero). */
const GREY_BODY = `
  vec4 tex = texture2D(earthMap, vUv);
  float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
  vec3 oceanColor = vec3(0.79, 0.83, 0.88);
  vec3 landColor  = vec3(0.44, 0.49, 0.58);
  float landMask = smoothstep(0.05, 0.28, lum);
  vec3 color = mix(oceanColor, landColor, landMask);
  float facing = dot(vNormal, vViewDir);
  float rim = 1.0 - facing;
  vec3 edgeColor = vec3(0.55, 0.60, 0.70);
  color = mix(color, edgeColor, smoothstep(0.5, 0.9, rim) * 0.4);
  float alpha = mix(0.95, 0.62, smoothstep(0.0, 1.0, pow(rim, 2.5)));
  gl_FragColor = vec4(color, alpha);
`

function GlobeSphere({ colored = false }: { colored?: boolean }) {
  // High-res vivid daymap for the homepage; light grey map for the destinations globe.
  const texture = useLoader(
    THREE.TextureLoader,
    colored ? "/textures/earth-color.webp" : "/textures/earth-light.jpg",
  )

  const mat = useMemo(() => {
    // Sharpen: anisotropic filtering + trilinear mipmaps so the texture stays crisp
    // across the sphere (the low-res look was a small 1024px map).
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.needsUpdate = true

    return new THREE.ShaderMaterial({
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
          ${colored ? COLORED_BODY : GREY_BODY}
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    })
  }, [texture, colored])

  return (
    <mesh>
      <sphereGeometry args={[1, 96, 96]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══ Cloud layer - a soft drifting cloud shell over the colored globe for a
   premium "living earth" feel (homepage/desktop only). ═══ */

function Clouds() {
  const ref = useRef<THREE.Mesh>(null)
  const tex = useLoader(THREE.TextureLoader, "/textures/earth-clouds.webp")

  const mat = useMemo(() => {
    tex.anisotropy = 8
    tex.minFilter = THREE.LinearMipmapLinearFilter
    return new THREE.ShaderMaterial({
      uniforms: { cloudMap: { value: tex } },
      vertexShader: `
        varying vec2 vUv; varying vec3 vNormal; varying vec3 vViewDir;
        void main(){ vUv=uv; vec4 mv=modelViewMatrix*vec4(position,1.0);
          vNormal=normalize(normalMatrix*normal); vViewDir=normalize(-mv.xyz);
          gl_Position=projectionMatrix*mv; }
      `,
      fragmentShader: `
        uniform sampler2D cloudMap; varying vec2 vUv; varying vec3 vNormal; varying vec3 vViewDir;
        void main(){
          float c = texture2D(cloudMap, vUv).r;          // clouds = white on black
          float facing = dot(vNormal, vViewDir);
          float rim = 1.0 - facing;
          float a = smoothstep(0.16, 0.62, c) * 0.5;     // soft, semi-transparent
          a *= (1.0 - smoothstep(0.55, 0.95, rim));       // fade out at the limb
          gl_FragColor = vec4(vec3(1.0), a);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    })
  }, [tex])

  // Drift a touch faster than the surface so the clouds feel alive.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012
  })

  return (
    <mesh ref={ref} renderOrder={1}>
      <sphereGeometry args={[1.012, 96, 96]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══ Globe Edge Rim - visible boundary line ═══ */

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
        // Soft luminous boundary - a wide, gentle glow that melts into the
        // atmosphere instead of a hard ring (no sharp outer border).
        float edge = smoothstep(0.18, 0.98, rim);
        // Light atmospheric blue so it reads as glow, not a dark outline.
        vec3 color = vec3(0.60, 0.68, 0.82);
        float alpha = edge * 0.30;
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
   LAYER 2 - ATMOSPHERE GLOW
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
   LAYER 3 - DESTINATION DOTS
   Simple small colored spheres at key cities
   Gold = featured/Asian   Blue = international
   ═══════════════════════════════════════════════════════ */

type Dest = {
  lat: number
  lng: number
  color: string
}

const DESTS: Dest[] = [
  // Cherry/pink dots (like the reference) - featured
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
  // Blue dots - international
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

/* Location Pin - simple 3D pin: cone needle + sphere head, oriented outward */
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
            {/* Needle - thin cone from surface outward */}
            <mesh position={[0, 0.018, 0]}>
              <coneGeometry args={[0.003, 0.035, 6]} />
              <meshStandardMaterial
                color={d.color}
                emissive={d.color}
                emissiveIntensity={0.6}
              />
            </mesh>
            {/* Pin head - sphere at top */}
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
   LAYER 4 - FLIGHT ROUTE ARCS
   Curved arcs with animated draw-on + traveling glow dot
   The hero visual - makes this feel like a travel globe
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

/* ═══════════════════════════════════════════════════════
   LAYER 5 - LOCATION PHOTO-TAGS (homepage hero only)
   The same frosted-glass photo+name chips the static globe
   carried, now anchored to their REAL country and rendered
   as drei <Html> so they rotate WITH the globe - chips on
   the far side fade out, then come back around as it turns.
   ═══════════════════════════════════════════════════════ */

type TagDef = { slug: string; lat: number; lng: number }

/* Anchored to each destination's real coordinates so the chip always sits on
   its country as the globe turns. A worldwide spread of destinations we have
   packages for, spaced by longitude so there's always something on the front
   arc as the globe rotates. Names + imagery come from src/data. */
const TAG_DEFS: TagDef[] = [
  // Europe & the Atlantic
  { slug: "iceland", lat: 64.1, lng: -21.9 },
  { slug: "europe", lat: 48.9, lng: 2.35 },
  // Africa
  { slug: "south-africa", lat: -33.9, lng: 18.4 },
  { slug: "kenya", lat: -1.3, lng: 36.8 },
  // Middle East & Indian Ocean
  { slug: "dubai-uae", lat: 25.2, lng: 55.3 },
  { slug: "mauritius", lat: -20.3, lng: 57.5 },
  // India & South Asia
  { slug: "kashmir", lat: 34.0, lng: 74.8 },
  { slug: "rajasthan", lat: 26.9, lng: 75.8 },
  { slug: "kerala", lat: 10.0, lng: 76.3 },
  { slug: "sri-lanka", lat: 7.3, lng: 80.6 },
  // Southeast Asia
  { slug: "thailand", lat: 13.7, lng: 100.5 },
  { slug: "bali", lat: -8.4, lng: 115.1 },
  { slug: "philippines", lat: 13.0, lng: 122.0 },
  // East Asia & the Pacific
  { slug: "japan", lat: 35.7, lng: 139.7 },
  { slug: "australia", lat: -33.8, lng: 151.2 },
  { slug: "new-zealand", lat: -41.0, lng: 174.0 },
  { slug: "fiji", lat: -17.7, lng: 178.1 },
]

type Tag = TagDef & { name: string; image: string }

// Chips are tiny 28px avatars, but images are served unoptimized (so `sizes` is
// ignored). Request a small square crop for Unsplash sources so 15 chips don't
// each pull a full hero image; local webp heroes are already small.
function chipImage(src: string): string {
  return src.includes("images.unsplash.com")
    ? src.split("?")[0] + "?w=96&h=96&fit=crop&q=70"
    : src
}

const TAGS: Tag[] = TAG_DEFS.flatMap((t) => {
  const d = destinations.find((dest) => dest.slug === t.slug)
  return d ? [{ ...t, name: d.name, image: chipImage(d.heroImage) }] : []
})

function LocationTags() {
  // One <group> anchor + one <a> chip per tag; refs let us fade chips per-frame
  // based on whether their point currently faces the camera.
  const anchors = useRef<Array<THREE.Group | null>>([])
  const chips = useRef<Array<HTMLAnchorElement | null>>([])
  const v = useMemo(
    () => ({ wp: new THREE.Vector3(), nrm: new THREE.Vector3(), dir: new THREE.Vector3() }),
    [],
  )

  useFrame((st) => {
    for (let i = 0; i < TAGS.length; i++) {
      const g = anchors.current[i]
      const chip = chips.current[i]
      if (!g || !chip) continue
      g.getWorldPosition(v.wp)
      v.nrm.copy(v.wp).normalize() // surface normal at the tag
      v.dir.copy(st.camera.position).sub(v.wp).normalize() // point → camera
      // Facing: +1 at front-centre, 0 at the limb, <0 on the far side. Each tag
      // is glued to its real lat/lng and rides across the FRONT of the globe with
      // the rotation, fading out only as it turns past the limb to the back.
      const facing = v.dir.dot(v.nrm)
      const front = THREE.MathUtils.clamp((facing - 0.0) / 0.28, 0, 1)
      // Gently dim (never fully hide) tags as they swing to the screen-right where
      // the headline sits, so the title stays clean but motion is still visible.
      const az = Math.atan2(v.wp.x, v.wp.z) // <0 screen-left, >0 screen-right
      const rightDim = THREE.MathUtils.clamp(1.0 - (az - 0.25) / 1.0, 0.32, 1.0)
      const o = front * rightDim
      chip.style.opacity = o.toFixed(3)
      chip.style.pointerEvents = o > 0.6 ? "auto" : "none"
    }
  })

  return (
    <>
      {TAGS.map((t, i) => {
        const p = ll(t.lat, t.lng, 1.02)
        return (
          <group
            key={t.slug}
            position={[p.x, p.y, p.z]}
            ref={(el) => {
              anchors.current[i] = el
            }}
          >
            <Html zIndexRange={[40, 0]} style={{ pointerEvents: "none" }}>
              <Link
                ref={(el) => {
                  chips.current[i] = el
                }}
                href={`/destinations/${t.slug}`}
                aria-label={`Explore ${t.name}`}
                className="group relative hidden xl:block"
                style={{ pointerEvents: "auto", willChange: "opacity" }}
              >
                {/* ground dot - sits exactly on the location */}
                <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="block h-[7px] w-[7px] rounded-full bg-white"
                    style={{
                      animation: "pulseRing 2.8s ease-out infinite",
                      boxShadow: "0 0 0 3px rgba(212,168,83,0.30), 0 0 9px rgba(255,255,255,0.85)",
                    }}
                  />
                </span>

                {/* frosted marker chip - rises from the dot */}
                <span
                  className="absolute left-0 top-0 flex flex-col items-center"
                  style={{
                    transform: "translate(-50%, -100%)",
                    animation: `pinDrop 0.7s cubic-bezier(0.22,1,0.36,1) ${(i % 6) * 0.12}s both`,
                  }}
                >
                  <span
                    className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.74)",
                      border: "1px solid rgba(255,255,255,0.92)",
                      boxShadow: "0 10px 24px rgba(5,10,20,0.38), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}
                  >
                    <span className="relative block h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
                      <Image src={t.image} alt={t.name} fill sizes="28px" loading="eager" className="object-cover" draggable={false} />
                    </span>
                    <span className="text-[10.5px] font-body font-semibold leading-none text-primary">{t.name}</span>
                  </span>
                  {/* short connector stalk to the ground dot */}
                  <span
                    className="mt-1 block w-px"
                    style={{ height: "16px", background: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(212,168,83,0.6))" }}
                  />
                </span>
              </Link>
            </Html>
          </group>
        )
      })}
    </>
  )
}

/* ═══ EARTH - all layers assembled ═══ */

function Earth({ showTags = false, colored = false, clouds = false }: { showTags?: boolean; colored?: boolean; clouds?: boolean }) {
  const ref = useRef<THREE.Group>(null)
  // Hero (showTags) spins at a clearly-visible pace so tags ride across the globe
  // with it (the previous near-frozen speed read as "stuck").
  const spin = showTags ? 0.05 : 0.025
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * spin
  })

  // Hero (tags on) starts with India on the front so the chips read on load.
  return (
    <group ref={ref} rotation={[0.15, showTags ? 2.64 : -0.3, 0.05]}>
      <GlobeSphere colored={colored} />
      {clouds && (
        <Suspense fallback={null}>
          <Clouds />
        </Suspense>
      )}
      <GlobeEdge />
      {/* Hero (showTags) drops the standalone red/blue pin markers - the photo
          tags (each with its own ground dot) are the markers there. Kept on the
          destinations globe. */}
      {!showTags && <DestinationPins />}
      {showTags && <LocationTags />}

      {/* Flight routes - cherry/pink. Hidden on the hero (showTags) per client:
          a clean globe with no red lines; kept on the destinations globe. */}
      {!showTags && (
        <>
          <FlightArc from={[18.5, 73.8]} to={[48.86, 2.35]} color={CHERRY} h={0.4} speed={0.07} />
          <FlightArc from={[18.5, 73.8]} to={[-8.3, 115.1]} color={CHERRY} h={0.35} speed={0.06} />
          <FlightArc from={[40.7, -74]} to={[51.5, -0.1]} color={CHERRY} h={0.3} speed={0.08} />
          <FlightArc from={[18.5, 73.8]} to={[25.2, 55.2]} color={CHERRY} h={0.2} speed={0.09} />
          <FlightArc from={[35.6, 139.6]} to={[-33.8, 151.2]} color={CHERRY} h={0.4} speed={0.05} />
          <FlightArc from={[18.5, 73.8]} to={[35.6, 139.6]} color={CHERRY} h={0.35} speed={0.065} />
          <FlightArc from={[18.5, 73.8]} to={[-33.8, 151.2]} color={CHERRY} h={0.45} speed={0.055} />
          <FlightArc from={[18.5, 73.8]} to={[40.7, -74]} color={CHERRY} h={0.5} speed={0.05} />
          <FlightArc from={[51.5, -0.1]} to={[25.2, 55.2]} color={BLUE_LIGHT} h={0.25} speed={0.07} />
        </>
      )}
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

export default function Globe3D({ showTags = false, colored = false }: { showTags?: boolean; colored?: boolean }) {
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
          <Earth showTags={showTags} colored={colored} />
        ) : (
          <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.12}>
            <Earth showTags={showTags} colored={colored} clouds={colored} />
          </Float>
        )}

        {!isMobile && <Effects />}
      </Suspense>
    </Canvas>
  )
}
