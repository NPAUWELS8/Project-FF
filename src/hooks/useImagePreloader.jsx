import {useState, useEffect} from 'react'

const useImagePreloader = (imageUrls) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        if(!imageUrls.length) return;

        let isCancelled = false;
        let loadedCount = 0;

        const onLoad = ()=>{
            loadedCount += 1;
            if(loadedCount === imageUrls.length && !isCancelled) setLoaded(true);
        }
        const onError = (e)=>{
            console.warn("image failed to load:", e);
            onLoad();
        }

        const images = imageUrls.map((url)=>{
            const img = new Image();
            img.src = url;
            img.onload = onLoad;
            img.onerror = onError;
            return img;
        })

        return ()=>{
            isCancelled = true;
            images.forEach((img)=>{
                img.onLoad = null;
                img.onError=null;
            })
        }

    },[imageUrls])

    return loaded
    
}

export default useImagePreloader