import { useState, useEffect, useRef } from 'react'
import './Portfolio.css'

// Experience data structure
const experiences = {
  2020: [
    {
      id: 'geelong-school-2020',
      title: 'Geelong School',
      shortDesc: 'Secondary Education',
      type: 'education',
      branches: [
        {
          id: 'atar-2020',
          title: 'ATAR',
          shortDesc: 'Australian Tertiary Admission Rank',
          image: null,
          popupDirection: 'left',
          description: `My ATAR score was one of the lowest in the country—and that's okay. Rather than defining my future, it became a catalyst for growth. This result taught me that traditional metrics don't measure resilience, creativity, or drive. It fueled my determination to prove that success isn't bound by a number, and every year since has been about building something meaningful regardless of where I started.`,
          type: 'milestone'
        }
      ],
      description: `I graduated from Geelong School in 2020, completing my VCE studies. While my academic results weren't stellar, the experience shaped my character and taught me valuable lessons about perseverance and finding alternative paths to success.`
    },
    {
      id: 'rmit-2020',
      title: 'RMIT',
      shortDesc: 'University',
      type: 'education',
      branches: [
        {
          id: 'associate-degree-2020',
          title: 'Associate Degree in Business',
          shortDesc: 'Tertiary Education',
          image: 'rmit-logo',
          popupDirection: 'right',
          description: `Despite my ATAR result, I was offered a place in RMIT's Associate Degree in Business program. This pathway offered a guaranteed route into the Bachelor of Business, giving me the opportunity to prove myself in a university environment. It was the first step in demonstrating that alternative pathways can lead to the same destinations—and sometimes open even more doors along the way.`,
          type: 'education'
        }
      ],
      description: `RMIT University accepted me into their Associate Degree in Business program, providing a structured pathway to continue my education and pursue a Bachelor's degree.`
    }
  ],
  2021: [],
  2022: [
    {
      id: 'rmit-2022',
      title: 'RMIT University',
      shortDesc: 'University',
      type: 'education',
      branchLayout: 'horizontal',
      branches: [
        {
          id: 'bachelor-transfer-2022',
          title: 'Bachelor of Business Professional Practice',
          shortDesc: 'Program Transfer',
          image: 'rmit-logo',
          popupDirection: 'left',
          description: `Rather than waste a semester completing a single outlying course in the Associate Degree, I transferred into RMIT's Bachelor of Business Professional Practice. This decision allowed me to continue my studies without interruption and provided access to a more comprehensive curriculum with industry placement opportunities built into the program.`,
          type: 'education'
        },
        {
          id: 'carls-jr-2022',
          title: "Grand Finalist for Carl's Jr.® WIL Applied Research Project",
          shortDesc: 'Marketing Strategy (Team Leader)',
          image: null,
          popupDirection: 'right',
          description: `As team leader, I led a group in developing a marketing strategy for Carl's Jr., who were new entrants to the Australian market. We created "Carla"—Carl's Australian female counterpart—designed to resonate with local consumers and build brand association. While our concept wasn't ultimately chosen, we were selected as grand finalists from approximately 150–200 participants across 30+ teams. I had the opportunity to pitch our strategy directly to Carl's Jr.'s Marketing Director in Australia.`,
          type: 'achievement'
        }
      ],
      description: `Continued my studies at RMIT University, transferring into the Bachelor of Business Professional Practice and competing in industry-sponsored research projects.`
    }
  ],
  2023: [
    {
      id: 'rmit-2023',
      title: 'RMIT University',
      shortDesc: 'University',
      type: 'education',
      branches: [
        {
          id: 'mondelez-2023',
          title: 'Grand Finalist for Mondelēz International® WIL Applied Research Project',
          shortDesc: 'Branding Strategy (Team Leader)',
          image: null,
          popupDirection: 'right',
          description: `Leading another team, I developed a branding strategy to celebrate Cherry Ripe's 100-year anniversary. We conceived "Cencherry"—a limited-edition Cherry Ripe featuring the original double-coated recipe with heritage branding from the product's early years. The concept honoured the brand's legacy while creating excitement for a milestone celebration. Our team was selected as grand finalists for the project.`,
          type: 'achievement'
        }
      ],
      description: `Advanced through my Bachelor's program at RMIT while competing in national branding strategy competitions.`
    }
  ],
  2024: [
    {
      id: 'rmit-2024',
      title: 'RMIT University',
      shortDesc: 'University',
      type: 'education',
      branchLayout: 'stacked', // BSA on top, then row below
      branches: [
        {
          id: 'bsa-2024',
          title: 'RMIT Business Student Association',
          shortDesc: 'University Club',
          image: null,
          popupDirection: 'right',
          row: 1,
          description: `The RMIT Business Student Association (RMIT BSA) is the umbrella business club at RMIT, organising social and corporate events for business students.`,
          type: 'leadership'
        },
        {
          id: 'general-committee-2024',
          title: 'General Committee',
          shortDesc: 'Event Coordination',
          image: null,
          popupDirection: 'left',
          row: 2,
          description: `I joined the General Committee of the RMIT Business Student Association where I helped prepare and execute events, gaining hands-on experience in event coordination and student engagement.`,
          type: 'leadership'
        },
        {
          id: 'marketing-director-2024',
          title: 'Marketing Director',
          shortDesc: 'RMIT BSA Leadership',
          image: null,
          popupDirection: 'right',
          row: 2,
          description: `Mid-year, I was promoted to Marketing Director of the RMIT Business Student Association. In this role, I was responsible for overseeing all marketing efforts for the club—developing campaigns, managing social media presence, creating promotional materials, and driving engagement for our events. This leadership position sharpened my strategic thinking and gave me real-world experience managing a team and executing marketing initiatives.`,
          type: 'leadership'
        }
      ],
      description: `Took on leadership roles within the RMIT Business Student Association while completing my final year of studies.`
    }
  ],
  2025: []
}

function Portfolio() {
  const years = [2020, 2021, 2022, 2023, 2024, 2025]
  const [activeYear, setActiveYear] = useState(2020)
  const [expandedExperience, setExpandedExperience] = useState(null)
  const [discoveredBranches, setDiscoveredBranches] = useState({})
  const [hoveredBranch, setHoveredBranch] = useState(null)
  const sectionRefs = useRef({})
  const branchRefs = useRef({})

  // Set up intersection observer to track which year is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = parseInt(entry.target.dataset.year, 10)
          setActiveYear(year)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    years.forEach((year) => {
      if (sectionRefs.current[year]) {
        observer.observe(sectionRefs.current[year])
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToYear = (year) => {
    if (sectionRefs.current[year]) {
      sectionRefs.current[year].scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExperienceClick = (expId) => {
    if (expandedExperience === expId) {
      setExpandedExperience(null)
      setHoveredBranch(null)
    } else {
      setExpandedExperience(expId)
      setHoveredBranch(null)
    }
  }

  const handleBranchHover = (branchId) => {
    // Mark as discovered when hovered
    setDiscoveredBranches(prev => ({ ...prev, [branchId]: true }))
    setHoveredBranch(branchId)
  }

  const handleBranchLeave = () => {
    setHoveredBranch(null)
  }

  const getBranchDetail = (branchId) => {
    for (const year of years) {
      for (const exp of experiences[year] || []) {
        const branch = exp.branches?.find(b => b.id === branchId)
        if (branch) return branch
      }
    }
    return null
  }

  return (
    <div className="portfolio">
      {/* Year indicator */}
      <div className="portfolio-indicator">
        {years.map((year) => (
          <div
            key={year}
            className={`portfolio-indicator-item ${activeYear === year ? 'active' : ''}`}
            onClick={() => scrollToYear(year)}
          >
            <span className="portfolio-indicator-label">{year}</span>
            <span className="portfolio-indicator-circle" />
          </div>
        ))}
      </div>

      {/* Year sections */}
      {years.map((year) => (
        <section
          key={year}
          ref={(el) => (sectionRefs.current[year] = el)}
          data-year={year}
          className="portfolio-section"
        >
          <div className="portfolio-section-content">
            <h2 className="portfolio-year">{year}</h2>
            
            {/* Experience tiles */}
            {experiences[year] && experiences[year].length > 0 && (
              <div className="experiences-container">
                {experiences[year].map((exp) => (
                  <div key={exp.id} className="experience-cluster">
                    {/* Main experience hexagon */}
                    <div
                      className={`hexagon-tile hexagon-main ${expandedExperience === exp.id ? 'active' : ''}`}
                      onClick={() => handleExperienceClick(exp.id)}
                    >
                      <div className="hexagon-content">
                        <span className="hexagon-title">{exp.title}</span>
                        <span className="hexagon-subtitle">{exp.shortDesc}</span>
                      </div>
                    </div>

                    {/* Branch hexagons */}
                    {expandedExperience === exp.id && exp.branches && exp.branches.length > 0 && (
                      <div className={`branch-container ${exp.branchLayout === 'horizontal' ? 'horizontal' : ''} ${exp.branchLayout === 'stacked' ? 'stacked' : ''}`}>
                        <div className={`branch-connector ${discoveredBranches[exp.branches[0]?.id] ? 'discovered' : ''}`} />
                        {exp.branchLayout === 'stacked' ? (
                          <>
                            {/* Row 1 branches */}
                            <div className="branch-row">
                              {exp.branches.filter(b => b.row === 1).map((branch, idx) => {
                                const isDiscovered = discoveredBranches[branch.id]
                                const isHovered = hoveredBranch === branch.id
                                const popupDir = branch.popupDirection || 'right'
                                return (
                                  <div
                                    key={branch.id}
                                    ref={(el) => (branchRefs.current[branch.id] = el)}
                                    className={`hexagon-tile hexagon-branch ${isDiscovered ? 'discovered' : ''} ${isHovered ? 'hovered' : ''}`}
                                    style={{ '--branch-index': idx }}
                                    onMouseEnter={() => handleBranchHover(branch.id)}
                                    onMouseLeave={handleBranchLeave}
                                    onFocus={() => handleBranchHover(branch.id)}
                                    onBlur={handleBranchLeave}
                                    tabIndex={0}
                                  >
                                    <div className="hexagon-content">
                                      <span className="hexagon-title">{branch.title}</span>
                                      <span className="hexagon-subtitle">{branch.shortDesc}</span>
                                    </div>
                                    {isHovered && (
                                      <div className={`branch-popup ${popupDir}`}>
                                        <div className="branch-popup-arrow" />
                                        <div className="branch-popup-content">
                                          {branch.image === 'rmit-logo' ? (
                                            <div className="branch-popup-logo rmit-logo">
                                              <span className="logo-text">RMIT</span>
                                              <span className="logo-subtext">University</span>
                                            </div>
                                          ) : (
                                            <div className="branch-popup-image">
                                              <span>Image placeholder</span>
                                            </div>
                                          )}
                                          <h4 className="branch-popup-title">{branch.title}</h4>
                                          <p className="branch-popup-desc">{branch.description}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            {/* Connector between rows */}
                            <div className={`branch-connector row-connector ${exp.branches.filter(b => b.row === 2).some(b => discoveredBranches[b.id]) ? 'discovered' : ''}`} />
                            {/* Row 2 branches (horizontal) */}
                            <div className="branch-row horizontal">
                              {exp.branches.filter(b => b.row === 2).map((branch, idx) => {
                                const isDiscovered = discoveredBranches[branch.id]
                                const isHovered = hoveredBranch === branch.id
                                const popupDir = branch.popupDirection || 'right'
                                return (
                                  <div
                                    key={branch.id}
                                    ref={(el) => (branchRefs.current[branch.id] = el)}
                                    className={`hexagon-tile hexagon-branch ${isDiscovered ? 'discovered' : ''} ${isHovered ? 'hovered' : ''}`}
                                    style={{ '--branch-index': idx }}
                                    onMouseEnter={() => handleBranchHover(branch.id)}
                                    onMouseLeave={handleBranchLeave}
                                    onFocus={() => handleBranchHover(branch.id)}
                                    onBlur={handleBranchLeave}
                                    tabIndex={0}
                                  >
                                    <div className="hexagon-content">
                                      <span className="hexagon-title">{branch.title}</span>
                                      <span className="hexagon-subtitle">{branch.shortDesc}</span>
                                    </div>
                                    {isHovered && (
                                      <div className={`branch-popup ${popupDir}`}>
                                        <div className="branch-popup-arrow" />
                                        <div className="branch-popup-content">
                                          {branch.image === 'rmit-logo' ? (
                                            <div className="branch-popup-logo rmit-logo">
                                              <span className="logo-text">RMIT</span>
                                              <span className="logo-subtext">University</span>
                                            </div>
                                          ) : (
                                            <div className="branch-popup-image">
                                              <span>Image placeholder</span>
                                            </div>
                                          )}
                                          <h4 className="branch-popup-title">{branch.title}</h4>
                                          <p className="branch-popup-desc">{branch.description}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        ) : (
                          exp.branches.map((branch, idx) => {
                            const isDiscovered = discoveredBranches[branch.id]
                            const isHovered = hoveredBranch === branch.id
                            const popupDir = branch.popupDirection || 'right'
                            return (
                              <div
                                key={branch.id}
                                ref={(el) => (branchRefs.current[branch.id] = el)}
                                className={`hexagon-tile hexagon-branch ${isDiscovered ? 'discovered' : ''} ${isHovered ? 'hovered' : ''}`}
                                style={{ '--branch-index': idx }}
                                onMouseEnter={() => handleBranchHover(branch.id)}
                                onMouseLeave={handleBranchLeave}
                                onFocus={() => handleBranchHover(branch.id)}
                                onBlur={handleBranchLeave}
                                tabIndex={0}
                              >
                                <div className="hexagon-content">
                                  <span className="hexagon-title">{branch.title}</span>
                                  <span className="hexagon-subtitle">{branch.shortDesc}</span>
                                </div>
                                {isHovered && (
                                  <div className={`branch-popup ${popupDir}`}>
                                    <div className="branch-popup-arrow" />
                                    <div className="branch-popup-content">
                                      {branch.image === 'rmit-logo' ? (
                                        <div className="branch-popup-logo rmit-logo">
                                          <span className="logo-text">RMIT</span>
                                          <span className="logo-subtext">University</span>
                                        </div>
                                      ) : (
                                        <div className="branch-popup-image">
                                          <span>Image placeholder</span>
                                        </div>
                                      )}
                                      <h4 className="branch-popup-title">{branch.title}</h4>
                                      <p className="branch-popup-desc">{branch.description}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Portfolio


