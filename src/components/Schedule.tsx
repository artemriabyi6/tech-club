import { useRef, useEffect, useState, useCallback } from 'react';
import './Schedule.css';
import { useOptimizedAnimation } from '../useOptimizedAnimation';

interface ScheduleItem {
    time: string;
    event: string;
}

interface Day {
    id: number;
    name: string;
    date: string;
}

const Schedule = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [activeDay, ] = useState(0);
    const daysRef = useRef<(HTMLDivElement | null)[]>([]);
    const scheduleRef = useRef<(HTMLDivElement | null)[]>([]);
    const { animateWithRAF } = useOptimizedAnimation();

   
    const setDayRef = useCallback((el: HTMLDivElement | null, index: number) => {
        daysRef.current[index] = el;
    }, []);

    const setScheduleRef = useCallback((el: HTMLDivElement | null, index: number) => {
        scheduleRef.current[index] = el;
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;

        if (!section || !video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    animateWithRAF(() => {
                        if (entry.isIntersecting) {
                            video.play().catch((error: Error) => {
                                console.log("Автовідтворення заблоковано:", error);
                            });
                            
                            daysRef.current.forEach((day, index) => {
                                if (day) {
                                    setTimeout(() => {
                                        day.classList.add('animate-in');
                                    }, index * 150);
                                }
                            });

                            setTimeout(() => {
                                scheduleRef.current.forEach((item, index) => {
                                    if (item) {
                                        setTimeout(() => {
                                            item.classList.add('animate-in');
                                        }, index * 100);
                                    }
                                });
                            }, 600);
                        } else {
                            video.pause();
                        }
                    });
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [animateWithRAF]);

    const days: Day[] = [
        { id: 0, name: "MONDAY", date: "Sep 6" },
        { id: 1, name: "TUESDAY", date: "Sep 7" },
        { id: 2, name: "WEDNESDAY", date: "Sep 9" }
    ];

    const scheduleData: ScheduleItem[][] = [
        // Day 1
        [
            { time: "12:00 pm", event: "Registration and Welcome" },
            { time: "2:00 pm", event: "Zawadi Thandhwe" },
            { time: "7:00 pm", event: "Dinner" }
        ],
        // Day 2
        [
            { time: "7:00 am", event: "Breakfast" },
            { time: "9:00 am", event: "Ejiro Rudo" },
            { time: "12:30 pm", event: "Lunch" }
        ],
        // Day 3
        [
            { time: "7:00 am", event: "Breakfast" },
            { time: "9:00 am", event: "Daniel Saoirse" },
            { time: "11:30 am", event: "Closing Brunch" }
        ]
    ];

    return (
        <section className="schedule-section" ref={sectionRef}>
            <video 
                ref={videoRef} 
                src="https://res.cloudinary.com/do6jk1pfn/video/upload/v1755709371/Blue_Modern_Technology_YouTube_Intro_etmztt.mp4" 
                muted 
                loop
                playsInline
                className="schedule-video"
            ></video>
            
            <div className="schedule-overlay"></div>

            <div className="schedule-container">
                <div className="schedule-header">
                    <h2>SCHEDULE</h2>
                </div>

                <div className="days-selector">
                    {days.map((day, index) => (
                        <div
                            key={day.id}
                            ref={(el) => setDayRef(el, index)}
                            className={`day-tab ${activeDay === day.id ? 'active' : ''}`}
                            // onClick={() => setActiveDay(day.id)}
                        >
                            <span className="day-name">{day.name}</span>
                            <span className="day-date">{day.date}</span>
                        </div>
                    ))}
                </div>

                <div className="schedule-content">
                    {scheduleData[activeDay].map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => setScheduleRef(el, index)}
                            className="schedule-item"
                        >
                            <div className="time-block">
                                <span className="time">{item.time}</span>
                            </div>
                            <div className="event-block">
                                <span className="event">{item.event}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Schedule;