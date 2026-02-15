import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import { Github, Mail, Code, Terminal, Database, Server, Cpu, Briefcase, Linkedin, ExternalLink, Plus, Globe, Layers, Copy, Check, GraduationCap } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Message Sent Successfully! ✅');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send ❌');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server Error (Check Backend) ⚠️');
    }
  };

  // --- REVEAL CARD (Approach Section) ---
  const RevealCard = ({ title, phase, description, color, icon }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
        style={{ 
          position: 'relative', height: '350px', border: '1px solid rgba(255,255,255,0.1)', 
          background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <Plus size={20} color="gray" style={{ position: 'absolute', top: '-10px', left: '-10px', opacity: 0.5 }} />
        <Plus size={20} color="gray" style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.5 }} />
        <Plus size={20} color="gray" style={{ position: 'absolute', bottom: '-10px', left: '-10px', opacity: 0.5 }} />
        <Plus size={20} color="gray" style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.5 }} />
        <AnimatePresence>
          {!hovered && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px', background: 'rgba(255,255,255,0.05)' }}><h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{phase}</h3></motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {hovered && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0, background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}><div style={{ marginBottom: '20px' }}>{icon}</div><h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>{title}</h2><p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.95)' }}>{description}</p></motion.div>}
        </AnimatePresence>
      </div>
    );
  };

  // --- PROJECT CARD 3D ---
  const ProjectCard3D = ({ title, desc, tags, color, icon, link }) => {
    return (
      <motion.div whileHover={{ y: -10 }} style={{ perspective: '1000px', cursor: 'default' }}>
        <motion.div
          initial={{ rotateX: 0, rotateY: 0 }}
          whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px', padding: '25px', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
          }}
        >
          <motion.div style={{ height: '180px', background: `linear-gradient(to bottom right, ${color}22, #000)`, borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: `1px solid ${color}44` }} whileHover={{ z: 50, scale: 1.05 }}>
             <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>{icon}</motion.div>
          </motion.div>
          <div><h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff' }}>{title}</h3><p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '20px' }}>{desc}</p></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ display: 'flex', gap: '-10px' }}>
              {tags.map((TagIcon, index) => (<div key={index} style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#222', border: '1px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: index === 0 ? 0 : '-10px', zIndex: 10 - index }}><TagIcon size={16} color="#ccc" /></div>))}
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="glow-border" style={{ borderRadius: '20px', padding: '1px' }}> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', background: '#000', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', position: 'relative', zIndex: 2 }}>
                        Check Live <ExternalLink size={16} />
                    </div>
                </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="container">
        
        {/* --- HERO GRID --- */}
        <div className="bento-grid">
          
          {/* 1. HERO MAIN CARD */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card span-2 row-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="tag" style={{ color: '#4ade80', borderColor: '#4ade8033', background: '#4ade8011' }}>● Open to Opportunities</span>
              <h1 style={{ fontSize: '4rem', marginTop: '20px', marginBottom: '10px' }}>Ranjith A.</h1>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1.2', background: 'linear-gradient(to right, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>Transforming Concepts into <br /> Intelligent <span style={{ color: '#a855f7' }}>User Experiences.</span></h2>
              <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: '1.6', maxWidth: '95%' }}>Hi! I'm Ranjith, a <b>Software Engineer</b> specializing in building <b>Data-Driven Intelligent Systems</b>. I focus on developing scalable web applications using the <b>MERN Stack</b> and <b>Python FastAPI</b>.</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} style={{ background: '#fff', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>View Projects <ExternalLink size={18} /></button>
              <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '8px' }}>Get in Touch <Mail size={18} /></button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => window.open('https://github.com/Ranjith2567', '_blank')} style={{ background: 'transparent', color: 'white', border: '1px solid #333', padding: '10px 15px', cursor: 'pointer' }}><Github size={20} /></button>
                <button onClick={() => window.open('https://www.linkedin.com/in/ranjith-a-875b8b2b9', '_blank')} style={{ background: 'transparent', color: 'white', border: '1px solid #333', padding: '10px 15px', cursor: 'pointer' }}><Linkedin size={20} /></button>
              </div>
            </div>
          </motion.div>

          {/* 2. TECH STACK (AUTO HEIGHT VIA CSS) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}><Database size={22} color="#a855f7" /><h3 style={{ margin: 0 }}>Tech Stack</h3></div>
            <div className="tag-container">{['HTML5 & CSS3', 'JavaScript(ES6)', 'Bootstrap', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'FastAPI', 'Machine Learning', 'AWS EC2', 'Git', 'Postman'].map(tech => (<span key={tech} className="tag">{tech}</span>))}</div>
          </motion.div>
          
          {/* 3. EDUCATION (SWAPPED TO LEFT - AS REQUESTED) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} 
            className="card span-2" 
            style={{ height: 'fit-content' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <GraduationCap size={24} color="#4ade80" />
                <h3 style={{ margin: 0 }}>Education</h3>
            </div>
            <div>
                <h4 style={{ margin: '0', color: '#fff', fontSize: '1.1rem' }}>B.Com Computer Application</h4>
                <p style={{ margin: '5px 0', fontSize: '0.95rem', color: '#ccc' }}>Hindusthan College of Arts and Science, Coimbatore</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span className="tag" style={{ background: '#4ade8022', color: '#4ade80', borderColor: '#4ade8044' }}>2022 - 2025</span>
                </div>
            </div>
          </motion.div>

          {/* 4. PROFESSIONAL JOURNEY (SWAPPED TO RIGHT - AS REQUESTED) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} 
            className="card span-2 glow-border" 
            style={{ borderRadius: '24px', height: 'fit-content' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', zIndex: 2, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={24} color="#ec4899" />
                <h3 style={{ margin: 0 }}>Professional Journey</h3>
              </div>
              <Cpu size={28} color="#3b82f6" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 2, position: 'relative' }}>
              <div style={{ borderLeft: '2px solid #3b82f6', paddingLeft: '15px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}></div>
                <h4 style={{ margin: '0', color: '#fff' }}>Machine Learning Intern (current)</h4>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#3b82f6', fontWeight: 'bold' }}>AS Global Soft Tech</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>Predictive modeling & Data Analysis using NumPy and Pandas.</p>
              </div>
              <div style={{ borderLeft: '2px solid #a855f7', paddingLeft: '15px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }}></div>
                <h4 style={{ margin: '0', color: '#fff' }}>MERN Stack Intern</h4>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#a855f7', fontWeight: 'bold' }}>GT Software</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>Worked on full-stack development using React.js, Node.js, and MongoDB. Enhanced UI with React Bootstrap and deployed on AWS for Scalability.</p>
              </div>
            </div>
          </motion.div>
        </div>
{/* --- PROJECTS --- */}
<div id="projects" style={{ marginBottom: '100px', paddingTop: '60px' }}>
  <h2 style={{ fontSize: '3rem', marginBottom: '40px', background: 'linear-gradient(to right, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    Recent <span style={{ color: '#a855f7', WebkitTextFillColor: '#a855f7' }}>Projects</span>
  </h2>
  
  {/* 🔥 Responsive fix for gap and alignment */}
  <div className="projects-grid-container">
    <ProjectCard3D 
      title="Student Management System" 
      desc="A complete Student Management System with Admin, Student, and Staff panels. Features Role-Based Access Control (RBAC)." 
      tags={[Code, Server, Database]} 
      color="#a855f7" 
      icon={<Server size={50} color="#fff" />} 
      link="https://github.com/Ranjith2567" 
    />
    <ProjectCard3D 
      title="File Recovery Tool" 
      desc="System-level utility built with Python FastAPI to scan storage drives and recover lost or deleted files efficiently." 
      tags={[Terminal, Code, Layers]} 
      color="#3b82f6" 
      icon={<Terminal size={50} color="#fff" />} 
      link="https://github.com/Ranjith2567" 
    />
    <ProjectCard3D 
      title="Grocery website" 
      desc="A responsive e-commerce frontend for a grocery store, featuring dynamic product listings and cart management." 
      tags={[Globe, Code, Layers]} 
      color="#4ade80" 
      icon={<Globe size={50} color="#fff" />} 
      link="https://github.com/Ranjith2567" 
    />
  </div>
</div>
        {/* --- APPROACH (GAP UPDATED TO 20px) --- */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}>My Approach</h2>
          {/* 🔥 GAP ADDED BELOW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <RevealCard phase="Phase 1" title="Planning" description="Analyzing requirements to design a scalable System Architecture using MongoDB & FastAPI." color="#065f46" icon={<Database size={40} color="white" />} />
            <RevealCard phase="Phase 2" title="Development" description="Building high-performance backends and dynamic UIs using MERN Stack & Python." color="#be185d" icon={<Code size={40} color="white" />} />
            <RevealCard phase="Phase 3" title="Launch" description="Rigorous API testing via Postman and deploying to AWS EC2 for global access." color="#0369a1" icon={<Cpu size={40} color="white" />} />
          </div>
        </div>

        {/* --- CONTACT FORM --- */}
        <div id="contact" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Get In Touch</h2>
          <form className="contact-form glow-border" onSubmit={handleSubmit} style={{ borderRadius: '24px', padding: '3px', width: '100%' }}>
            <div style={{ background: '#0a0a0a', borderRadius: '22px', padding: '40px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'stretch' }}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={{ width: '100%', boxSizing: 'border-box' }} />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={{ width: '100%', boxSizing: 'border-box' }} />
              <textarea name="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} required style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
              <button type="submit" style={{ alignSelf: 'center', marginTop: '10px', width: 'auto', minWidth: '200px' }}>Send Message 🚀</button>
              {status && <p style={{ color: status.includes('Sent') ? '#4ade80' : '#ef4444', fontWeight: 'bold', marginTop: '10px' }}>{status}</p>}
            </div>
          </form>
        </div>

        <footer style={{ marginTop: '80px', padding: '40px 0', borderTop: '1px solid #333', textAlign: 'center', opacity: 0.6 }}><p>© {new Date().getFullYear()} Ranjith A. All rights reserved.</p></footer>
      </div>
    </div>
  );
};

export default App;