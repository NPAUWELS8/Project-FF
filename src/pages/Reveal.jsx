import { useContext } from 'react'
import { AppContext } from "contexts/AppContext";
import SpotifyReveal from 'components/SpotifyReveal'

const location = {
  vrijbroekZomertuin: "!1m18!1m12!1m3!1d4752.311824807387!2d4.461541030162563!3d51.01893105509057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e592d7ed21ff%3A0x7cc4f148544228ef!2sZomertuinen!5e0!3m2!1snl!2sbe!4v1756549404699!5m2!1snl!2sbe",
  rubensKasteel:"!1m18!1m12!1m3!1d2513.073237026412!2d4.4747907764688!3d50.95935017169391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e70792a86ae5%3A0x475973cf7767459c!2sRubenskasteel%2C%201982%20Zemst!5e0!3m2!1snl!2sbe!4v1751214683790!5m2!1snl!2sbe",
  vrijbroekRozentuin: "!1m18!1m12!1m3!1d4752.311824807387!2d4.461541030162563!3d51.01893105509057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e5ecff08b39f%3A0x6b834e6ad8ae86ec!2sRozentuin!5e0!3m2!1snl!2sbe!4v1756549880892!5m2!1snl!2sbe"
}

const Reveal = () => {
    const context = useContext(AppContext);
    const {count, total} = context.getGameFinishedCount();
    const text = "Nice Try! You haven't completed all games yet!"
    const title = "Location"
    return (
      <section className="bg-slate-950 max-container">
        <h1 className="head-text-magic">
            <span className="magic-text font-semibold drop-shadow">{title}</span>
        </h1>
        {(total - count === 0) ? 
          <div className="mt-5 flex flex-col gap-3 text-white">
            <p>Come find me at following location:</p>
              <div>
                  <iframe
                      src={`https://www.google.com/maps/embed?pb=${location.vrijbroekZomertuin}`}
                      width="600"
                      height="450"
                      style={{border:0}}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <SpotifyReveal/>
              </div>  
          </div>
        : <p className="text-white">{text}</p>}
      </section>
    )
}

export default Reveal