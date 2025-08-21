import { useRef, useEffect } from 'react';
import './SaveSpot.css';
import { useOptimizedAnimation } from '../useOptimizedAnimation';

const SaveSpot = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const innerVideoRef = useRef<HTMLVideoElement>(null);
    const { animateWithRAF } = useOptimizedAnimation();

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        const innerVideo = innerVideoRef.current;

        if (!section || !video || !innerVideo) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    animateWithRAF(() => {
                        if (entry.isIntersecting) {
                            video.play().catch((error: Error) => {
                                console.log("Фонове відео заблоковано:", error);
                            });
                            
                            innerVideo.play().catch((error: Error) => {
                                console.log("Відео в блоці заблоковано:", error);
                            });
                            
                            animateElements();
                        } else {
                            video.pause();
                            innerVideo.pause();
                        }
                    });
                });
            },
            { threshold: 0.2 }
        );

        const animateElements = () => {
            if (imageRef.current) {
                imageRef.current.classList.add('animate-in');
            }
            
            setTimeout(() => {
                if (contentRef.current) {
                    contentRef.current.classList.add('animate-in');
                }
            }, 300);
            
            setTimeout(() => {
                if (headingRef.current) {
                    headingRef.current.classList.add('animate-in');
                }
            }, 600);
            
            setTimeout(() => {
                if (textRef.current) {
                    textRef.current.classList.add('animate-in');
                }
            }, 900);
            
            setTimeout(() => {
                if (buttonRef.current) {
                    buttonRef.current.classList.add('animate-in');
                }
            }, 1200);
        };

        observer.observe(section);
        return () => observer.disconnect();
    }, [animateWithRAF]);

    return (
        <section className="save-spot-section" ref={sectionRef}>
            <video 
                ref={videoRef} 
                src="/assets/event-bg.mp4" 
                muted 
                loop
                playsInline
                className="save-spot-video"
            ></video>
            
            <div className="save-spot-overlay"></div>

            <div className="save-spot-container">
                <div className="save-spot-content">
                    <div className="image-block" ref={imageRef}>
                        <video 
                            ref={innerVideoRef}
                            src="https://res.cloudinary.com/do6jk1pfn/video/upload/v1755710718/Blue_Futuristic_Coming_Soon_Mobile_Video_tbb8xd.mp4"
                            muted 
                            loop
                            playsInline
                            className="inner-video"
                        ></video>
                        <div className="image-overlay"></div>
                    </div>

                    <div className="text-block" ref={contentRef}>
                        <h2 className="save-spot-heading" ref={headingRef}>
                            <span>SAVE</span>
                            <span>YOUR</span>
                            <span>SPOT</span>
                        </h2>
                        
                        <p className="save-spot-text" ref={textRef}>
                            A unique event filled with networking, workshops, seminars,
                            and engaging conversations with the industry's leading experts.
                        </p>
                        
                        <a href="#booking" className="book-now-btn" ref={buttonRef}>
                            BOOK NOW
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaveSpot;