import { arrowDown } from 'assets/images';

import { scrollTo } from 'functions/functions';

const Button = ({text, className, id, scrollId, offset}) => {
  return (
    <a
        onClick={(e)=>{
            e.preventDefault();

            scrollTo({
                scrollId,
                offset,
                duration: 1.2
            })
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