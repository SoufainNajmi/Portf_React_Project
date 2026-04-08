import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Stars, Sparkles, OrbitControls, Image as DreiImage, MeshDistortMaterial, MeshWobbleMaterial, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll as useFramerScroll, useTransform } from 'framer-motion'
import { User, Code, GraduationCap, Briefcase, Mail, Phone, MapPin, MonitorPlay, Zap, Trophy, MousePointer2 } from 'lucide-react'

import heroImg from './assets/hero.png'
import profilImg from './assets/profil.png'
import profil1Img from './assets/profil1.png'
import icon4Img from './assets/icon4.png'
import nomImg from './assets/nom.png'

// Main 3D Scene setup
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const isInteractable = ['a', 'button'].includes(e.target.tagName.toLowerCase()) || e.target.closest('a') || e.target.closest('button')
      setIsHovering(isInteractable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-emerald-400/50 pointer-events-none z-[9999] flex items-center justify-center bg-emerald-500/10 backdrop-blur-sm mix-blend-difference"
        animate={{ 
          x: mousePosition.x - 24, 
          y: mousePosition.y - 24,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 1
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-emerald-400 pointer-events-none z-[10000] shadow-[0_0_15px_rgba(52,211,153,1)] mix-blend-screen"
        animate={{ 
          x: mousePosition.x - 4, 
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.1 }}
      />
    </>
  )
}

function Scene() {
  const scroll = useScroll()
  const ref = useRef()

  useFrame((state) => {
    const offset = 1 - scroll.offset
    // Complex rotation based on scroll and time
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, offset * Math.PI * 2, 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, Math.sin(state.clock.elapsedTime / 4) * 0.5, 0.05)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -offset * 10, 0.05)
  })

  return (
    <group ref={ref}>
      {/* Dynamic central morphing sphere object */}
      <Float speed={2} rotationIntensity={3} floatIntensity={4} position={[0, -2, -8]}>
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <MeshDistortMaterial color="#1e1e2f" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      {/* Cool techy 3D objects floating with images */}
      <Float speed={1.5} rotationIntensity={3} floatIntensity={4} position={[-4, 2, -5]}>
        <DreiImage url={profilImg} scale={[3.5, 4.5]} transparent opacity={0.85} />
      </Float>
      
      <Float speed={2.2} rotationIntensity={2} floatIntensity={3} position={[4, -1, -4]}>
        <DreiImage url={icon4Img} scale={[3.5, 3.5]} transparent opacity={0.75} />
      </Float>

      <Float speed={1.2} rotationIntensity={4} floatIntensity={2} position={[-5, -6, -6]}>
        <DreiImage url={profil1Img} scale={[3.5, 4.5]} transparent opacity={0.85} />
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={3} position={[5, -8, -5]}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshWobbleMaterial color="#f59e0b" wireframe factor={1} speed={2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-2, -12, -4]}>
        <DreiImage url={nomImg} scale={[5, 1.8]} transparent opacity={0.9} />
      </Float>
    </group>
  )
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60, damping: 12 }
  }
}

export const fadeRightVariant = {
  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60 }
  }
}

export const fadeLeftVariant = {
  hidden: { opacity: 0, x: 50, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60 }
  }
}

function Section({ children, className }) {
  return (
    <section className={`w-full h-screen flex flex-col justify-center px-8 md:px-24 text-white ${className}`}>
      {children}
    </section>
  )
}

function App() {
  return (
    <div className="w-full h-screen bg-slate-950 font-sans cursor-none">
      <CustomCursor />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#4ade80" />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2} distance={1.2}>
            
            <Scene />

            {/* DOM OVERLAY FOR SCROLLING */}
            <Scroll html style={{ width: '100%' }}>
              
              {/* PAGE 1: HERO */}
              <Section>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="max-w-3xl"
                >
                  <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-blue-400 font-mono mb-2 tracking-widest">
                    Hi, my name is
                  </motion.p>
                  <motion.h1 variants={fadeUpVariant} className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 tracking-tight">
                    SOFIANE NAJMI
                  </motion.h1>
                  <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-bold text-slate-300 mb-6 flex items-center gap-4">
                    <MonitorPlay className="w-10 h-10 text-indigo-400" /> Web Developer Full Stack
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-l-4 border-indigo-500 pl-4 mb-8">
                    Passionné par le développement informatique et le sport full contact, je développe
                    discipline, persévérance et esprit d'équipe, prêt à m'investir.
                  </motion.p>
                  
                  <motion.div variants={fadeUpVariant} className="flex flex-col md:flex-row gap-4 mt-8">
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span>06 88226423</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <span>soufainnajmi@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span>Takadom Sidi El Mokhtar, Chichaoua</span>
                    </div>
                  </motion.div>
                </motion.div>
              </Section>

              {/* PAGE 2: FORMATION */}
              <Section className="items-end text-right">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="max-w-2xl bg-black/40 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                >
                  <motion.h2 variants={fadeLeftVariant} className="text-4xl md:text-6xl font-black mb-8 flex items-center justify-end gap-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                    Formation <GraduationCap className="w-12 h-12" />
                  </motion.h2>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:-translate-x-full before:md:mr-[-2rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:to-blue-500">
                    
                    <motion.div variants={fadeLeftVariant} className="relative">
                      <div className="absolute top-1 right-[-2.5rem] w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      <h3 className="text-2xl font-bold text-white group relative inline-block">
                        BTS Développement Web Full Stack
                        <span className="ml-4 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">2026</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        En 2ème année de Brevet de Technicien Supérieur (BTS)
                      </p>
                    </motion.div>

                    <motion.div variants={fadeLeftVariant} className="relative">
                      <div className="absolute top-1 right-[-2.5rem] w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Baccalauréat
                        <span className="ml-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">2024</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Spécialité sciences et technologies électriques<br/>
                        École lycée technique Chichaoua
                      </p>
                    </motion.div>

                  </div>
                </motion.div>
              </Section>

              {/* PAGE 3: EXPÉRIENCES */}
              <Section>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="max-w-2xl bg-black/40 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                >
                  <motion.h2 variants={fadeRightVariant} className="text-4xl md:text-6xl font-black mb-8 flex items-center gap-4 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    <Briefcase className="w-12 h-12" /> Expériences
                  </motion.h2>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1px] before:-translate-x-px md:before:ml-[-2rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-400 before:to-red-500">
                    
                    <motion.div variants={fadeRightVariant} className="relative pl-8 md:pl-0">
                      <div className="absolute top-1 left-[-2.4rem] w-4 h-4 rounded-full bg-orange-400 ring-4 ring-orange-400/30 shadow-[0_0_10px_rgba(249,115,22,0.8)] hidden md:block"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Parcours Sportif <br className="md:hidden" />
                        <span className="md:ml-4 px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full inline-block mt-2 md:mt-0">2026</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Pratique le SPORT du full contact, avec plusieurs stages et compétitions,
                        développant discipline, esprit de compétition, persévérance, rigueur et gestion du stress.
                      </p>
                    </motion.div>

                    <motion.div variants={fadeRightVariant} className="relative pl-8 md:pl-0">
                      <div className="absolute top-1 left-[-2.4rem] w-4 h-4 rounded-full bg-red-400 ring-4 ring-red-400/30 shadow-[0_0_10px_rgba(248,113,113,0.8)] hidden md:block"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Stage d'observation <br className="md:hidden" />
                        <span className="md:ml-4 px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full inline-block mt-2 md:mt-0">2025</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Découverte du fonctionnement d'une entreprise et des bases du développement informatique.
                        Participation à des tâches simples et travail en équipe.
                      </p>
                    </motion.div>

                  </div>
                </motion.div>
              </Section>

              {/* PAGE 4: COMPÉTENCES & QUALITÉS */}
              <Section className="items-center text-center">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full max-w-4xl"
                >
                  <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-6xl font-black mb-12 flex items-center justify-center gap-4 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Zap className="w-12 h-12" /> Compétences
                  </motion.h2>
                  
                  <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { name: 'Discipline', icon: Trophy, color: 'text-yellow-400', shadow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]' },
                      { name: 'Travail en équipe', icon: User, color: 'text-blue-400', shadow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]' },
                      { name: 'Persévérance', icon: Zap, color: 'text-orange-400', shadow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.4)]' },
                      { name: 'Esprit de compétition', icon: Code, color: 'text-red-400', shadow: 'hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]' },
                      { name: 'Gestion du stress', icon: MonitorPlay, color: 'text-emerald-400', shadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]' },
                      { name: 'Rigueur', icon: Briefcase, color: 'text-indigo-400', shadow: 'hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]' },
                      { name: 'Endurance', icon: Trophy, color: 'text-pink-400', shadow: 'hover:shadow-[0_0_20px_rgba(244,114,182,0.4)]' },
                      { name: 'Dépassement de soi', icon: Zap, color: 'text-cyan-400', shadow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' },
                      { name: 'Respect des règles', icon: MapPin, color: 'text-white', shadow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' },
                    ].map((skill, index) => (
                      <motion.div variants={fadeUpVariant} key={index} className={`bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group cursor-none ${skill.shadow} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <skill.icon className={`w-8 h-8 mx-auto mb-4 ${skill.color} group-hover:animate-pulse relative z-10`} />
                        <h4 className="font-bold text-slate-200 relative z-10">{skill.name}</h4>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </Section>

              {/* PAGE 5: LANGUES & FOOTER */}
              <Section className="items-center text-center justify-evenly">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full max-w-3xl"
                >
                  <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-6xl font-black mb-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    Langues
                  </motion.h2>
                  
                  <motion.div variants={fadeUpVariant} className="space-y-8 bg-black/30 p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-shadow duration-500">
                    <div className="space-y-2 text-left group">
                      <div className="flex justify-between font-bold">
                        <span className="group-hover:text-cyan-200 transition-colors">Arabe (Maternelle)</span>
                        <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">100%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, delay: 0.2, type: "spring" }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative">
                          <div className="absolute inset-0 bg-white/30 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left group">
                      <div className="flex justify-between font-bold">
                        <span className="group-hover:text-blue-200 transition-colors">Français</span>
                        <span className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]">40%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1.5, delay: 0.4, type: "spring" }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative"></motion.div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left group">
                      <div className="flex justify-between font-bold">
                        <span className="group-hover:text-emerald-200 transition-colors">Anglais</span>
                        <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">20%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '20%' }} transition={{ duration: 1.5, delay: 0.6, type: "spring" }} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"></motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ delay: 1 }} 
                  className="text-slate-500 font-mono text-sm mt-12"
                >
                  <p>© {new Date().getFullYear()} Sofiane Najmi - Portfolio 3D</p>
                  <p className="mt-2 text-emerald-400/80 animate-pulse">Scroll to Explore</p>
                </motion.div>
              </Section>
              
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Scroll indicator overlay */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center animate-bounce pointer-events-none text-white/50">
        <span className="text-xs uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  )
}

export default App
