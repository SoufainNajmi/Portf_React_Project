import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Stars, Sparkles, OrbitControls, Image as DreiImage } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { User, Code, GraduationCap, Briefcase, Mail, Phone, MapPin, MonitorPlay, Zap, Trophy } from 'lucide-react'

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
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-emerald-400 pointer-events-none z-[9999] flex items-center justify-center bg-transparent shadow-[0_0_10px_rgba(52,211,153,0.5)]"
      animate={{ 
        x: mousePosition.x - 16, 
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
    >
      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
    </motion.div>
  )
}

function Scene() {
  const scroll = useScroll()
  const ref = useRef()

  useFrame((state) => {
    // Rotate the entire group slowly based on scroll position
    const offset = 1 - scroll.offset
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, offset * Math.PI * 2, 0.1)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -offset * 5, 0.1)
  })

  return (
    <group ref={ref}>
      {/* Cool techy 3D objects floating with images */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} position={[-2, 1, -3]}>
        <DreiImage url={profilImg} scale={[3, 4]} transparent opacity={0.8} />
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[2, -1, -2]}>
        <DreiImage url={icon4Img} scale={[3, 3]} transparent opacity={0.7} />
      </Float>

      <Float speed={1} rotationIntensity={3} floatIntensity={1.5} position={[-3, -4, -4]}>
        <DreiImage url={profil1Img} scale={[3, 4]} transparent opacity={0.8} />
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[3, -7, -3]}>
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#f59e0b" wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-2, -10, -2]}>
        <DreiImage url={nomImg} scale={[4, 1.5]} transparent opacity={0.9} />
      </Float>
    </group>
  )
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="max-w-3xl"
                >
                  <p className="text-xl md:text-2xl text-blue-400 font-mono mb-2 tracking-widest">Hi, my name is</p>
                  <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 tracking-tight">
                    SOFIANE NAJMI
                  </h1>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-300 mb-6 flex items-center gap-4">
                    <MonitorPlay className="w-10 h-10 text-indigo-400" /> Web Developer Full Stack
                  </h2>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-l-4 border-indigo-500 pl-4 mb-8">
                    Passionné par le développement informatique et le sport full contact, je développe
                    discipline, persévérance et esprit d'équipe, prêt à m'investir.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span>06 88226423</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <span>soufainnajmi@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span>Takadom Sidi El Mokhtar, Chichaoua</span>
                    </div>
                  </div>
                </motion.div>
              </Section>

              {/* PAGE 2: FORMATION */}
              <Section className="items-end text-right">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-8 flex items-center justify-end gap-4 text-emerald-400">
                    Formation <GraduationCap className="w-12 h-12" />
                  </h2>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:-translate-x-full before:md:mr-[-2rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:to-blue-500">
                    
                    <div className="relative">
                      <div className="absolute top-1 right-[-2.5rem] w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30"></div>
                      <h3 className="text-2xl font-bold text-white group relative inline-block">
                        BTS Développement Web Full Stack
                        <span className="ml-4 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">2026</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        En 2ème année de Brevet de Technicien Supérieur (BTS)
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute top-1 right-[-2.5rem] w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Baccalauréat
                        <span className="ml-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">2024</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Spécialité sciences et technologies électriques<br/>
                        École lycée technique Chichaoua
                      </p>
                    </div>

                  </div>
                </motion.div>
              </Section>

              {/* PAGE 3: EXPÉRIENCES */}
              <Section>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-8 flex items-center gap-4 text-orange-400">
                    <Briefcase className="w-12 h-12" /> Expériences
                  </h2>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1px] before:-translate-x-px md:before:ml-[-2rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-orange-400 before:to-red-500">
                    
                    <div className="relative pl-8 md:pl-0">
                      <div className="absolute top-1 left-[-2.4rem] w-4 h-4 rounded-full bg-orange-400 ring-4 ring-orange-400/30 hidden md:block"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Parcours Sportif <br className="md:hidden" />
                        <span className="md:ml-4 px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full inline-block mt-2 md:mt-0">2026</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Pratique le SPORT du full contact, avec plusieurs stages et compétitions,
                        développant discipline, esprit de compétition, persévérance, rigueur et gestion du stress.
                      </p>
                    </div>

                    <div className="relative pl-8 md:pl-0">
                      <div className="absolute top-1 left-[-2.4rem] w-4 h-4 rounded-full bg-red-400 ring-4 ring-red-400/30 hidden md:block"></div>
                      <h3 className="text-2xl font-bold text-white">
                        Stage d'observation <br className="md:hidden" />
                        <span className="md:ml-4 px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full inline-block mt-2 md:mt-0">2025</span>
                      </h3>
                      <p className="text-slate-400 mt-2 text-lg">
                        Découverte du fonctionnement d'une entreprise et des bases du développement informatique.
                        Participation à des tâches simples et travail en équipe.
                      </p>
                    </div>

                  </div>
                </motion.div>
              </Section>

              {/* PAGE 4: COMPÉTENCES & QUALITÉS */}
              <Section className="items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-4xl"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-12 flex items-center justify-center gap-4 text-purple-400">
                    <Zap className="w-12 h-12" /> Compétences
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { name: 'Discipline', icon: Trophy, color: 'text-yellow-400' },
                      { name: 'Travail en équipe', icon: User, color: 'text-blue-400' },
                      { name: 'Persévérance', icon: Zap, color: 'text-orange-400' },
                      { name: 'Esprit de compétition', icon: Code, color: 'text-red-400' },
                      { name: 'Gestion du stress', icon: MonitorPlay, color: 'text-emerald-400' },
                      { name: 'Rigueur', icon: Briefcase, color: 'text-indigo-400' },
                      { name: 'Endurance', icon: Trophy, color: 'text-pink-400' },
                      { name: 'Dépassement de soi', icon: Zap, color: 'text-cyan-400' },
                      { name: 'Respect des règles', icon: MapPin, color: 'text-white' },
                    ].map((skill, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group cursor-pointer">
                        <skill.icon className={`w-8 h-8 mx-auto mb-4 ${skill.color} group-hover:animate-pulse`} />
                        <h4 className="font-bold text-slate-200">{skill.name}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Section>

              {/* PAGE 5: LANGUES & FOOTER */}
              <Section className="items-center text-center justify-evenly">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-3xl"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-12 text-cyan-400">
                    Langues
                  </h2>
                  
                  <div className="space-y-8 bg-black/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between font-bold">
                        <span>Arabe (Maternelle)</span>
                        <span className="text-cyan-400">100%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative">
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between font-bold">
                        <span>Français</span>
                        <span className="text-blue-400">40%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative"></motion.div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex justify-between font-bold">
                        <span>Anglais</span>
                        <span className="text-emerald-400">20%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '20%' }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="text-slate-500 font-mono text-sm">
                  <p>© {new Date().getFullYear()} Sofiane Najmi - Portfolio 3D</p>
                  <p className="mt-2 text-emerald-400/80">Scroll to Explore</p>
                </div>
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
