import { useEffect, useRef } from 'react';
import './Hero.css';
import { useOptimizedAnimation } from '../useOptimizedAnimation';


const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const { animateWithRAF } = useOptimizedAnimation();

    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;

        if (!video || !section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    animateWithRAF(() => {
                        if (entry.isIntersecting) {
                            video.play().catch((error: Error) => {
                                console.log("Автовідтворення заблоковано:", error);
                            });
                            animateElements();
                        } else {
                            video.pause();
                        }
                    });
                });
            },
            { threshold: 0.2 }
        );

        const animateElements = () => {
            if (headerRef.current) {
                headerRef.current.classList.add('animate-in');
            }
            
            setTimeout(() => {
                if (headingRef.current) {
                    headingRef.current.classList.add('animate-in');
                }
            }, 300);
            
            setTimeout(() => {
                if (buttonRef.current) {
                    buttonRef.current.classList.add('animate-in');
                }
            }, 600);
        };

        observer.observe(section);
        return () => observer.disconnect();
    }, [animateWithRAF]);

    return ( 
        <section className="hero-section" ref={sectionRef}>
            <video 
                ref={videoRef} 
                src="https://res.cloudinary.com/do6jk1pfn/video/upload/v1755709392/intro3_aiz5sk.mp4" 
                muted 
                loop
                playsInline
            ></video>
            
            <header ref={headerRef}>
                <div className="container">
                    <div className="logo-block">
                        <img src="/assets/logo3.png" alt="logo" />
                    </div>
                    <nav>
                        <ul>
                            <li><a>Speakers</a></li>
                            <li><a>Schedule</a></li>
                            <li><a>Get in touch</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            
            <div className="hero-content">
                <h1 ref={headingRef}>Event <br /><span>Websites</span></h1>
                <a href="" className='book-btn' ref={buttonRef}>Book your spot</a>
            </div>
        </section>
     );
}
 
export default Hero;