import React from 'react'


const TextBoxContainer = ({gameText, gameTextDisplay}) => {
  return (
    <div id="textbox-container" className={`mt-5 w-[840px] min-h-10 ${gameTextDisplay ? "flex" : "hidden"}`}>
        <div className="textbox">
            <p id="dialogue" className="ui-text font-monogram">
              {gameText}
            </p>
        </div>
    </div>
  )
}

export default TextBoxContainer