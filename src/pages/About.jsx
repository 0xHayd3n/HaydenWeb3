import { useDecodingText } from '../hooks/useDecodingText'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Page.css'
import './About.css'

function About() {
  const displayText = useDecodingText('About')
  const [introRef, introVisible] = useScrollAnimation()
  const [skillsRef, skillsVisible] = useScrollAnimation()
  const [softSkillsRef, softSkillsVisible] = useScrollAnimation()

  const hardSkills = {
    'Technical & Development': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, name: 'EVM Stack' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, name: 'Git & Version Control' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, name: 'API Integration' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, name: 'Web Development' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>, name: 'Web Hosting' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><path d="M12 2v7"/></svg>, name: 'Digital Infrastructure Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, name: 'Technical Architecture' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>, name: 'Cursor' }
    ],
    'Business & Management': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 3v18h18"/><path d="M18 17V9h-5v8h5zm-7 0V7H6v10h5z"/></svg>, name: 'Business Strategy' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, name: 'Project Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, name: 'Stakeholder Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, name: 'Human Resources' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M3 3v18h18"/><path d="M18 17V9h-5v8h5zm-7 0V7H6v10h5z"/></svg>, name: 'Macroeconomics' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>, name: 'Event Planning' }
    ],
    'Design & Creative': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, name: 'Photoshop' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>, name: 'Premiere Pro' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, name: 'UI Design' }
    ],
    'Marketing & Communication': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, name: 'Marketing' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, name: 'Social Media Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, name: 'Email Marketing' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><rect x="13" y="11" width="10" height="10" rx="2"/></svg>, name: 'CRM Systems' }
    ],
    'Software & Tools': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><rect x="3" y="3" width="9" height="9" rx="1"/><rect x="12" y="3" width="9" height="9" rx="1"/><rect x="3" y="12" width="9" height="9" rx="1"/><rect x="12" y="12" width="9" height="9" rx="1"/></svg>, name: 'Microsoft Suite' }
    ]
  }

  const softSkills = {
    'Leadership & Management': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, name: 'Leadership' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M12 11v6"/><path d="M9 14l3-3 3 3"/></svg>, name: 'Mentoring' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/><path d="M12 2v20"/></svg>, name: 'Change Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, name: 'Decision Making' }
    ],
    'Communication & Collaboration': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, name: 'Communication' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, name: 'Written Communication' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>, name: 'Public Speaking' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, name: 'Team Collaboration' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>, name: 'Cross-functional Collaboration' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>, name: 'Networking' }
    ],
    'Thinking & Problem Solving': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M12 2v4"/><path d="M8 6h8"/><path d="M10 6v4"/><path d="M14 6v4"/><path d="M8 10h8"/><path d="M12 10v4"/><path d="M10 14h4"/><path d="M12 14v6"/></svg>, name: 'Strategic Thinking' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>, name: 'Problem Solving' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, name: 'Critical Thinking' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, name: 'Design Thinking' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>, name: 'Innovation' }
    ],
    'Personal Attributes': [
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, name: 'Creativity' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M14 9V5a3 3 0 0 0-6 0v4"/><rect x="6" y="9" width="12" height="12" rx="2"/></svg>, name: 'Work Ethic' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>, name: 'Adaptability' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, name: 'Time Management' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, name: 'Entrepreneurial Mindset' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, name: 'Goal-Oriented' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, name: 'Emotional Intelligence' },
      { icon: <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>, name: 'Detail-Oriented' }
    ]
  }

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <div className={`page-tagline-wrapper ${introVisible ? 'fade-in-visible' : 'fade-in'}`} ref={introRef}>
          <p className="page-tagline">Bridging traditional business and blockchain innovation</p>
        </div>
        <div className="section-divider"></div>
        <div className={introVisible ? 'fade-in-visible' : 'fade-in'}>
          <p>
          I began my professional journey studying business at RMIT, starting with an Associate Degree of Business before transferring to the Bachelor of Business Professional Practice. During my studies, I gained hands-on experience through a three-month Human Resources internship at L'Oreal Australia & New Zealand, where I developed a deep understanding of organisational structures and corporate operations. Simultaneously, I served in multiple volunteer leadership roles at the RMIT Business Student Association (RMIT BSA), a university student club, holding positions as Marketing Director, IT Director, and HR Director. These roles honed my skills in communication, strategic thinking, and managing complex digital infrastructure. This unique combination of business acumen, technical understanding, and organisational experience has equipped me with an unmatched work ethic and a comprehensive view of how systems and structures operate. These skills are what I'm now channelling into the crypto and web3 space.
        </p>
        <p>
          Currently, I'm learning the EVM stack for Base, Coinbase's Layer 2 blockchain, despite not coming from a computer science background. The reason I'm pursuing this path is to utilise my creative, curious mind that is constantly thinking of ideas to solve real-world problems. I believe these solutions can be achieved through a chain like Base, as it is the most creative-focused chain with participants interested in creating products for the betterment of others rather than value extraction. My technical journey involves deep diving into smart contract development, decentralised application architecture, and the broader infrastructure that powers the decentralised web, all while maintaining a focus on building meaningful solutions that address genuine problems.
        </p>
        <p>
          My goal is to create protocols that introduce something new not only in the crypto space but to the traditional world. I want to establish a career in the crypto industry where I can combine my entrepreneurial mindset with technical expertise to build my own projects and contribute to groundbreaking protocols. Drawing on my understanding of organisational structures and digital infrastructure from both corporate and student association leadership roles, I'm keen to bring something new to the market. I want to create innovative solutions that address real gaps in both the web3 ecosystem and traditional industries. Whether it's contributing to open-source projects, launching independent products, or joining a forward-thinking team, I'm focused on creating value that transcends the boundaries between crypto and traditional spaces, being part of the next wave of innovation that makes blockchain technology more accessible and impactful for everyone.
          </p>
        </div>

        <div className="section-divider"></div>

        <div className={`skills-section ${skillsVisible ? 'fade-in-visible' : 'fade-in'}`} ref={skillsRef}>
          <h2 className="skills-section-title">Hard Skills</h2>
          {Object.entries(hardSkills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-box">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`skills-section ${softSkillsVisible ? 'fade-in-visible' : 'fade-in'}`} ref={softSkillsRef}>
          <h2 className="skills-section-title">Soft Skills</h2>
          {Object.entries(softSkills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-box">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About

