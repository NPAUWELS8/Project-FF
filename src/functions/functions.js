import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin)

export function scrollTo({scrollId, duration, offset}){
    const target = document.getElementById(scrollId)
    
    if(target) {

        const top = target.getBoundingClientRect().top + window.scrollY - offset
        // window.scrollTo({top, behaviour: 'smooth'})
        gsap.to(window,{
            duration,
            scrollTo: {y:top},
            ease:'power2.out'
        })
    }
    else console.warn("target not found")
}