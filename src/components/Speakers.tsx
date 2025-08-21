import { useRef, useEffect, useState } from 'react';
import { useOptimizedAnimation } from '../useOptimizedAnimation';
import './speakers.css';

interface Speaker {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    social: {
        twitter: string;
        linkedin: string;
    };
}

const Speakers = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const { animateWithRAF } = useOptimizedAnimation();

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const text = textRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    animateWithRAF(() => {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            
                            // Анімація заголовка
                            if (heading) {
                                heading.classList.add('animate-in');
                            }
                            
                            // Анімація тексту
                            if (text) {
                                setTimeout(() => {
                                    text.classList.add('animate-in');
                                }, 300);
                            }
                            
                            // Анімація карток
                            cardsRef.current.forEach((card, index) => {
                                if (card) {
                                    setTimeout(() => {
                                        card.classList.add('animate-in');
                                    }, 500 + index * 300);
                                }
                            });
                        } else {
                            setIsVisible(false);
                            if (heading) heading.classList.remove('animate-in');
                            if (text) text.classList.remove('animate-in');
                        }
                    });
                });
            },
            { 
                threshold: 0.1, // ЗМІНА: Зменшено з 0.4 до 0.1
                rootMargin: '0px 0px -10% 0px' // ЗМІНА: Додано негативний відступ
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, [animateWithRAF]);

    const speakers: Speaker[] = [
        {
            id: 1,
            name: "Emma Johnson",
            role: "Senior Product Designer",
            company: "TechVision Inc.",
            image: "/assets/speaker9.webp",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "AI Research Lead",
            company: "NeuroSphere Labs",
            image: "/assets/speaker2.webp",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            id: 3,
            name: "Sophia Williams",
            role: "Digital Marketing Director",
            company: "Global Connect",
            image: "/assets/speaker8.webp",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            id: 4,
            name: "Alex Rodriguez",
            role: "Blockchain Architect",
            company: "ChainInnovate",
            image: "/assets/speaker4.webp",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            id: 5,
            name: "Olivia Smith",
            role: "UX Research Lead",
            company: "UserFirst Design",
            image: "/assets/speaker5.webp",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            id: 6,
            name: "Daniel Brown",
            role: "Data Science Director",
            company: "AnalyticsPro",
            image: "/assets/speaker6.webp",
            social: { twitter: "#", linkedin: "#" }
        }
    ];

    return (
        <section className="speakers-section" ref={sectionRef}>
            <div className="speakers-container">
                <div className="speakers-header">
                    <h2 ref={headingRef}>Featured Speakers</h2>
                    <p ref={textRef}>Meet our industry experts who will share their insights and experiences</p>
                </div>

                <div className="speakers-grid">
                    {speakers.map((speaker, index) => (
                        <div 
                            key={speaker.id}
                            className="speaker-card"
                            ref={el => {
                                cardsRef.current[index] = el;
                            }}
                            style={{ 
                                animationDelay: isVisible ? `${index * 0.1}s` : '0s'
                            }}
                        >
                            <div className="speaker-image">
                                <img 
                                    src={speaker.image} 
                                    alt={speaker.name}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="speaker-overlay">
                                    <div className="social-links">
                                        <a href={speaker.social.twitter} aria-label="Twitter">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                            </svg>
                                        </a>
                                        <a href={speaker.social.linkedin} aria-label="LinkedIn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                                <rect x="2" y="9" width="4" height="12"/>
                                                <circle cx="4" cy="4" r="2"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="speaker-info">
                                <h3>{speaker.name}</h3>
                                <p className="speaker-role">{speaker.role}</p>
                                <p className="speaker-company">{speaker.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;