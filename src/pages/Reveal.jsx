import { useContext } from 'react'
import { AppContext } from "contexts/AppContext";

const Reveal = () => {
    const context = useContext(AppContext);
    const text = "Nice Try! You haven't completed all games yet!"
    const title = "Location"
    return (
      <section className="bg-slate-950 max-container">
        <h1 className="head-text-magic">
            <span className="magic-text font-semibold drop-shadow">{title}</span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <div>
                {context.isAllGamesFinished() ? <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.073237026412!2d4.4747907764688!3d50.95935017169391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e70792a86ae5%3A0x475973cf7767459c!2sRubenskasteel%2C%201982%20Zemst!5e0!3m2!1snl!2sbe!4v1751214683790!5m2!1snl!2sbe"
                    width="600"
                    height="450"
                    style={{border:0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe> : <p>{text}</p>}
            </div>
          {/* <p>
            {introText}
          </p> */}
        </div>
        {/* <div className="mt-5">
          <h3 className="subhead-text-magic">
            <span className="magic-text font-semibold drop-shadow">Controls</span>
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              {controls}
            </p>
          </div>
        </div>
        <button className="btn-magic mt-12" onClick={handleButtonClick}>Continue</button> */}
      </section>
    )
}

export default Reveal