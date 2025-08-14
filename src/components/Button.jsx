import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { arrowDown } from 'assets/images';

gsap.registerPlugin(ScrollToPlugin)

const Button = ({text, className, id, scrollId, offset}) => {
  return (
    <a
        onClick={(e)=>{
            e.preventDefault();

            const target = document.getElementById(scrollId)

            if(target && id) {

                const top = target.getBoundingClientRect().top + window.scrollY - offset
                // window.scrollTo({top, behaviour: 'smooth'})
                gsap.to(window,{
                    duration:1.2,
                    scrollTo: {y:top},
                    ease:'power2.out'
                })
            }
        }}
        className={`${className ??''} cta-wrapper`}
    >
        <div className="cta-button group">
            <div className="bg-circle"/>
            <p className="text">{text}</p>
            <div className="arrow-wrapper">
                <img src={arrowDown} alt="arrow"/>
            </div>
        </div>
    </a>
  )
}

export default Button