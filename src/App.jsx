import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Stars, Sparkles, OrbitControls, Image as DreiImage, MeshDistortMaterial, MeshWobbleMaterial, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll as useFramerScroll, useTransform } from 'framer-motion'
import { User, Code, GraduationCap, Briefcase, Mail, Phone, MapPin, MonitorPlay, Zap, Trophy, MousePointer2, Database, Shield, Link2, Blocks, Send, Github, ExternalLink } from 'lucide-react'

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
          <ScrollControls pages={4} damping={0.2} distance={1.2}>

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
                    Bienvenue, je suis
                  </motion.p>
                  <motion.h1 variants={fadeUpVariant} className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 tracking-tight">
                    SOFIANE NAJMI
                  </motion.h1>
                  <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-bold text-slate-300 mb-6 flex items-center gap-4">
                    <MonitorPlay className="w-10 h-10 text-indigo-400" /> Web Developer Full Stack
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-l-4 border-indigo-500 pl-4 mb-8">
                    "Transformer les idées complexes en expériences numériques fluides et sécurisées."
                  </motion.p>
                  
                  <motion.div variants={fadeUpVariant} className="flex flex-col md:flex-row gap-4 mt-8">
                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full font-bold text-slate-900 hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.4)] cursor-none relative z-20">
                      Démarrer <MousePointer2 className="w-4 h-4" />
                    </button>
                    <button className="px-8 py-3 bg-white/10 rounded-full font-bold text-white hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-md border border-white/10 cursor-none relative z-20">
                      Mes projets <Briefcase className="w-4 h-4" />
                    </button>
                  </motion.div>
                </motion.div>
              </Section>

              {/* PAGE 2: À PROPOS & COMPÉTENCES */}
              <Section className="items-end text-right">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full max-w-5xl"
                >
                  <motion.h2 variants={fadeLeftVariant} className="text-4xl md:text-6xl font-black mb-12 flex items-center justify-end gap-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                    À Propos & Compétences <Code className="w-12 h-12" />
                  </motion.h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
                    {[
                      { name: 'HTML/CSS', icon: Code, color: 'text-orange-400', shadow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.4)]' },
                      { name: 'JavaScript', icon: Zap, color: 'text-yellow-400', shadow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]' },
                      { name: 'React.js', icon: MonitorPlay, color: 'text-cyan-400', shadow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' },
                      { name: 'PHP', icon: Database, color: 'text-indigo-400', shadow: 'hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]' },
                      { name: 'Laravel', icon: Blocks, color: 'text-red-400', shadow: 'hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]' },
                      { name: 'Cyber & Sécurité', icon: Shield, color: 'text-emerald-400', shadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]' },
                      { name: 'Blockchain', icon: Link2, color: 'text-blue-400', shadow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]' },
                      { name: 'n8n', icon: Zap, color: 'text-pink-400', shadow: 'hover:shadow-[0_0_20px_rgba(244,114,182,0.4)]' },
                    ].map((skill, index) => (
                      <motion.div variants={fadeUpVariant} key={index} className={`bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center justify-center ${skill.shadow} relative overflow-hidden text-center`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <skill.icon className={`w-8 h-8 md:w-10 md:h-10 mb-4 ${skill.color} group-hover:animate-pulse relative z-10`} />
                        <h4 className="font-bold text-slate-200 relative z-10 md:text-lg">{skill.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Section>

              {/* PAGE 3: PROJETS */}
              <Section>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full max-w-6xl mx-auto"
                >
                  <motion.h2 variants={fadeRightVariant} className="text-4xl md:text-6xl font-black mb-12 flex items-center gap-4 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                    <Briefcase className="w-12 h-12" /> Projets Récents
                  </motion.h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { title: 'E-Commerce Platform', desc: 'Une plateforme de vente moderne avec React et Laravel.', tech: ['React', 'Laravel', 'Tailwind'], github: '#' },
                      { title: 'Dashboard Crypto', desc: 'Suivi de portefeuille blockchain en temps réel.', tech: ['React', 'Blockchain', 'API'], github: '#' },
                      { title: 'N8n Automatisations', desc: 'Workflows d\'entreprise automatisés et sécurisés.', tech: ['n8n', 'NodeJS', 'Cyber'], github: '#' },
                      { title: 'Portfolio 3D', desc: 'Ce que vous regardez actuellement, mixant Web et 3D.', tech: ['React Three Fiber', 'Framer Motion'], github: '#' },
                    ].map((project, idx) => (
                      <motion.div variants={fadeUpVariant} key={idx} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden text-left flex flex-col justify-between">
                        <div>
                          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-8 h-8 text-white relative z-20 cursor-none" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-slate-400 mb-6">{project.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                              {project.tech.map((t, i) => <span key={i} className="px-3 py-1 bg-slate-800 text-cyan-300 text-xs rounded-full shadow-inner">{t}</span>)}
                          </div>
                        </div>
                        <a href={project.github} className="inline-flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors cursor-none relative z-20 w-fit">
                          <Github className="w-5 h-5" /> Code source
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Section>

              {/* PAGE 4: CONTACT */}
              <Section className="items-center text-center">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full max-w-2xl bg-black/40 p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                >
                  <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-black mb-8 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Me Contacter
                  </motion.h2>
                  
                  <motion.form variants={fadeUpVariant} className="space-y-6 text-left">
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-300 font-semibold pl-1">Nom</label>
                        <input type="text" placeholder="Votre nom" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 hover:bg-white/10 focus:bg-transparent focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-none relative z-20" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-300 font-semibold pl-1">Email</label>
                        <input type="email" placeholder="votre@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 hover:bg-white/10 focus:bg-transparent focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-none relative z-20" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-300 font-semibold pl-1">Message</label>
                        <textarea rows="4" placeholder="Votre message..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 hover:bg-white/10 focus:bg-transparent focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-none relative z-20 resize-none"></textarea>
                    </div>
                    <button type="button" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2 cursor-none relative z-20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                        Envoyer <Send className="w-5 h-5" />
                    </button>
                  </motion.form>

                  <motion.div variants={fadeUpVariant} className="text-slate-500 font-mono text-sm mt-12">
                    <p>© {new Date().getFullYear()} Sofiane Najmi - Tous droits réservés.</p>
                  </motion.div>
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

