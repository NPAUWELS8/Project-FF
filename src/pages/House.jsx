import { useContext, useState } from 'react'
import { AppContext } from 'contexts/AppContext'

//TODO: add powerup explanation

const HouseDetails = ({houseData, textSize, other}) => {

    function getTextSizes(textSize){
        switch (textSize){
            case "xl":
                return ["text-xl","text-base"]
            case "base":
                return ["text-base", "text-sm"]
            case "sm":
                return ["text-sm", "text-xs"]
            default:
                return ["text-base", "text-sm"]
        }
    }

    const textSizes = getTextSizes(textSize);

    return (
        <div className={`flex ${other ? "flex-col items-center xl:px-10" : "flex-row items-start"} justify-center gap-5`}>
            <div className={`${other ? "w-full" : "w-[75%]"} flex flex-col items-center justify-center bg-white rounded-xl px-5 py-2`}>
                <h1 className={`${textSizes[0]} px-5 max-w-[75%] min-w-25% text-center text-amber-500 rounded-xl`}>House Description</h1>
                <p className={`${textSizes[1]} text-justify text-black`}>{houseData.explanation}</p>
            </div>
            <div className={`${other ? "w-full md:w-[50%]" : "w-[25%]"} flex flex-col justify-center bg-white rounded-xl px-5 py-2`}>
                <h1 className={`${textSizes[0]} w-full text-center  text-amber-500 rounded-xl`}>Traits</h1>
                <ul className={`${textSizes[1]} w-full text-black text-start`}>
                    {houseData.traits.map((trait, index)=>
                        <li key={index}>{trait}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

const OtherHouse = ({house, getImage, houseData}) => {

    return (
        <div className="house-box px-2 neo-brutalism-magic hover:cursor-default w-1/3">
            <img className="h-15 absolute top-2 right-5 lg:top-5" src={getImage(house)} alt="Crest"/>
            <div className="font-medium sm:text-xl flex flex-col items-start lg:items-center justify-center gap-10">
                <p className="text-3xl ps-5 lg:ps-0" >{house}</p>
                <HouseDetails
                    houseData={houseData}
                    textSize="sm"
                    other={true}
                />
            </div>
        </div>
    )
}

const MyHouse = ({house, getImage, houseData, showAllHouses, setShowAllHouses}) => {

    function showAll(){
        setShowAllHouses(true);
    }

    function hideAll(){
        setShowAllHouses(false);
    }

    return (
        <>
            <div className={`house-box mx-5 px-8 gap-3 neo-brutalism-magic hover:cursor-default ${showAllHouses ? "w-[90%]" : "w-[60%]"}`}>
                <img className="h-30 absolute right-10 top-3" src={getImage(house)} alt="Crest"/>
                <div className="font-medium sm:text-xl flex justify-center">
                    <h1 className="text-3xl px-5 max-w-[75%] min-w-25% text-center bg-white text-amber-500 rounded-xl">Your House</h1>
                </div>
                <div className="font-medium sm:text-xl flex flex-col items-center justify-center gap-10">
                    <p className="text-3xl" >{house}</p>
                    <HouseDetails
                        houseData={houseData}
                        textSize={`${showAllHouses ? "" : "xl"}`}
                    />
                    {!showAllHouses && <p>Click "See all" if you want to see the other houses.</p>}
                </div>
            </div>
            {showAllHouses ?
                <button onClick={hideAll} className="xl:w-[15%] lg:w-[25%] w-[50%] neo-brutalism-white neo-btn-magic-question hover:cursor-pointer z-20 -mt-5">Hide Other</button>
            :
                <button onClick={showAll} className="xl:w-[15%] lg:w-[25%] w-[50%] neo-brutalism-white neo-btn-magic-question hover:cursor-pointer z-20 -mt-5">See All</button>
            }
        </>
    )
}

const House = () => {
    const {house, getImage, getHouseData, houses} = useContext(AppContext)
    const [showAllHouses, setShowAllHouses] = useState(false);
    
    const houseData = getHouseData(house);
    const otherHouses = houses.filter((houseEl)=>houseEl.name !== house);

    return (
        <div className="h-screen w-screen">
        {!showAllHouses && <div className="absolute top-0 w-screen h-screen bg-black-200"/>}
        <div className="w-screen h-[60vh] bg-black-200 flex items-end justify-center">
            <div className="flex flex-col w-screen items-center justify-center h-[70%]">
                <div className={`flex flex-col ${showAllHouses ? "w-[70%] ms-2" : "w-full"} h-full items-center`}>
                    <MyHouse
                        house={house}
                        getImage={getImage}
                        houseData={houseData}
                        showAllHouses={showAllHouses}
                        setShowAllHouses={setShowAllHouses}
                    />
                </div>
            </div>
        </div>
        {showAllHouses &&
            <div className="w-screen h-[80vh] bg-black-200 flex items-start justify-center py-20">
                <div className="flex flex-col w-screen bg-white rounded-xl mx-5 px-5 py-5 border-amber-500 border-5">
                    <h1 className="text-3xl w-full text-center text-amber-500 pb-5">Other Houses</h1>
                    <div className="flex flex-row w-full justify-center h-[80%] gap-5">
                        {otherHouses.map((house, index)=>
                            <OtherHouse
                                key={index}
                                house={house.name}
                                getImage={getImage}
                                houseData={house}
                            />
                        )}
                    </div>
                </div>
            </div>
        }
        </div>
    )
    }

export default House