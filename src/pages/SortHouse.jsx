import { useRef, useState, useContext } from 'react';
import * as data from 'constants/sortingQuestions.json' with {type: "json" }
import { AppContext } from 'contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const sortingData = data.default;
const quiz = sortingData.quiz;
const answerButtons = ["A","B","C","D"]

const AnswerButton = ({children, index, question, setAnswered, score, setAnswerText})=>{

    function handleClick(e){
        const option = quiz[question].options[index];
        score.current[option.house]++;
        setAnswerText(option.comment)
        setAnswered(true);
    }

    return (
        <button id={id} onClick={handleClick} className="neo-brutalism-white neo-btn-magic-question hover:cursor-pointer sm:w-1/2">{children}</button>
    )
}

const MagicButton = ({onClick, className, children}) => {

    return (
        <button onClick={onClick} className={`w-[15%] neo-brutalism-white neo-btn-magic-question hover:cursor-pointer z-20 -mt-5 ${className}`}>{children}</button>
    )
}

const Question = ({question, answered, answerText, handleClick, setAnswerText, setAnswered, score})=>{

    return (
        <div className="flex flex-col w-screen items-center">
                <div className="question-box neo-brutalism-magic hover:cursor-default w-[60%]">
                    <div className="font-medium sm:text-xl flex justify-center">
                        <h1 className="px-5 py-2 max-w-[75%] min-w-25% text-center bg-white text-black rounded-xl border-black-200 border-3">{quiz[question].question}</h1>
                    </div>
                    <div className="rounded-xl bg-white text-amber-500 px-5 py-5">
                        <div>
                            <h2 className="text-black">{`"${quiz[question].subtext}"`}</h2>
                            <br/>
                        </div>
                        <div className="font-medium sm:text-xl flex justify-center">
                            <div className="w-full">
                                {answered ? <p>{answerText}</p> : quiz[question].options.map((option, index)=>
                                    <p key={index}><b>{`${option.label}) `}</b>{option.text}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {!answered ? <div className="flex flex-row w-[60%] gap-20 z-20 -mt-5 px-20">
                    {answerButtons.map((answer,index)=>
                        <AnswerButton
                            key={index}
                            question={question}
                            index={index}
                            setAnswered={setAnswered}
                            setAnswerText={setAnswerText}
                            score={score}
                        >
                            {answer}
                        </AnswerButton>
                )}
                </div> : <MagicButton onClick={handleClick}>Continue</MagicButton>
                }
            </div>
    )
}

const Result = ({score, setHouseCrest, getImage, getHouseData, navigate})=>{
    const [showResult, setShowResult] = useState(false);

    const result = useRef(getResult())
    const houseData = getHouseData(result.current)

    function onContinue(){
        if(!showResult){
            setShowResult(true);
            setHouseCrest(result.current);
        }
        else{
            navigate("/");
            document.location.reload();
        }
    }

    function getResult(){
        const entries = Object.entries(score.current);

        //first shuffle to randomize in case of a tie
        entries.sort((_a,_b)=>{
            return 0.5 - Math.random();
        })

        //then sort descending based on the score 
        entries.sort((a,b)=>{
            return b[1] - a[1];
        })
        return entries[0][0];
    }

    

    function showHouse(){
        navigate("/house");
    }

    return (
        <div className="flex flex-col w-screen items-center">
            <div className="question-box neo-brutalism-magic hover:cursor-default w-[60%]">
                <div className="font-medium sm:text-xl flex justify-center">
                    <h1 className="px-5 max-w-[75%] min-w-25% text-center bg-white text-amber-500 rounded-xl">And your house is...</h1>
                </div>
                {showResult ? 
                    <div className="font-medium sm:text-3xl flex flex-col items-center justify-center">
                        <p>{result.current}</p>
                        <img className="h-50" src={getImage(result.current)} alt="Crest"/>
                        <p className="text-xl">{houseData.motto}</p>
                    </div>
                :
                    <div className="font-medium sm:text-xl flex flex-col items-center justify-center">
                        <p className="pb-5">{`"${houseData.sorting_hat_line}"`}</p>
                        <p>Click continue to find out your house:</p>
                    </div>
                }
            </div>
            <div className="flex flex-row gap-50 w-full items-center justify-center">
                {showResult && <MagicButton onClick={showHouse}>Find out More</MagicButton>}
                <MagicButton onClick={onContinue}>Continue</MagicButton>
            </div>
        </div>
    )
}

const Intro = ({setQuestion, house, setHouseCrest, getImage, navigate})=>{

    function onContinue(){
        if(!house) setQuestion(0);
        else {
            navigate("/");
            document.location.reload();
        }
    }

    function onResort(){
        setHouseCrest(null);
    }

    function onMore(){
        navigate("/house");
    }

    return (
        <div className="flex flex-col w-screen items-center">
            <div className="question-box neo-brutalism-magic hover:cursor-default w-[60%]">
                <div className="font-medium sm:text-xl flex justify-center">
                    <h1 className="px-5 max-w-[75%] min-w-25% text-center bg-white text-amber-500 rounded-xl">{`${house ? "Want to go again?" : "Let's get sorted!"}`}</h1>
                </div>
                {house ? 
                    <div className="font-medium sm:text-xl flex flex-col items-center justify-center">
                        <p>You have already been sorted. You belong to house:</p>
                        <p className="text-3xl" >{house}</p>
                        <img className="h-50" src={getImage(house)} alt="Crest"/>
                        <p>Click "Resort" if you want to sort again.</p>
                        <p>Click "Find out More" if you want to know more about your house.</p>
                    </div>
                :
                    <div className="font-medium sm:text-xl flex justify-center">
                        <p>Before you can continue with your trials, it's ofcourse crucial that you get sorted.</p>
                    </div>
                }
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-20">
                <MagicButton onClick={onContinue}>Continue</MagicButton>
                {house && <MagicButton onClick={onResort}>Resort</MagicButton>}
                {house && <MagicButton onClick={onMore}>Find Out More</MagicButton>}
            </div>
        </div>
    )
}

const SortHouse = () => {
    const {setHouseCrest, house, getImage, getHouseData} = useContext(AppContext)
    const navigate = useNavigate()

    const score = useRef({
        Dulci: 0,
        Spritz: 0,
        Espresso: 0,
        Nitro: 0
    });
    const [question, setQuestion] = useState(-1);
    const [answered, setAnswered] = useState(false);
    const [answerText, setAnswerText] = useState(null);
    const [finished, setFinished] = useState(false);

    function handleClick(){
        if(question < quiz.length - 1){
            setQuestion(question + 1);
            setAnswered(false);
            setAnswerText(null);
        }
        else{
            setFinished(true);
        }
    }

    if(question === -1){
        return (
            <div className="w-screen h-screen bg-black-200 flex items-center justify-center">
                <Intro
                    setQuestion={setQuestion}
                    house={house}
                    setHouseCrest={setHouseCrest}
                    getImage={getImage}
                    navigate={navigate}
                ></Intro>
            </div>
        )
    }

    return (
        <div className="w-screen h-screen bg-black-200 flex items-center justify-center">
            {!finished ? 
                <Question
                    question={question}
                    answered={answered}
                    setAnswered={setAnswered}
                    answerText={answerText}
                    setAnswerText={setAnswerText}
                    handleClick={handleClick}
                    score={score}
                />
            :
                <Result
                    score={score}
                    setHouseCrest={setHouseCrest}
                    getImage={getImage}
                    getHouseData={getHouseData}
                    navigate={navigate}
                />            
            }
        </div>
    )
}

export default SortHouse