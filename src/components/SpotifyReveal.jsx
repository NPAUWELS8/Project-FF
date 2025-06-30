
  import { useRef, useState, useEffect } from "react";

  const SpotifyReveal = () => {
    const embedRef = useRef(null);
    const spotifyEmbedControllerRef = useRef(null);
    const [iFrameAPI, setIFrameAPI] = useState(undefined);
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [uri, setUri] = useState("spotify:track:6xjxMWGsprmtUVMDaMhgH0");

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    useEffect(() => {
      if (iFrameAPI) {
        return;
      }

      window.onSpotifyIframeApiReady = (SpotifyIframeApi) => {
        setIFrameAPI(SpotifyIframeApi);
      };
    }, [iFrameAPI]);

    useEffect(() => {
      if (playerLoaded || iFrameAPI === undefined) {
        return;
      }

      iFrameAPI.createController(
        embedRef.current,
        {
          width: "100%",
          height: "152",
          uri: uri,
        },
        (spotifyEmbedController) => {
          spotifyEmbedController.addListener("ready", () => {
            setPlayerLoaded(true);
            // Try autoplay
            try{
                spotifyEmbedController.play()
            }catch(err){
                console.warn("Autoplay failed (likely due to browser policy):", err);
            };
          });

          const handlePlaybackUpdate = (e) => {
            const { position, duration, isBuffering, isPaused, playingURI } =
              e.data;
            console.log(
              `Playback State updates:
              position - ${position},
              duration - ${duration},
              isBuffering - ${isBuffering},
              isPaused - ${isPaused},
              playingURI - ${playingURI},
              duration - ${duration}`
            );
          };

          spotifyEmbedController.addListener(
            "playback_update",
            handlePlaybackUpdate
          );

          spotifyEmbedController.addListener("playback_started", (e) => {
            const { playingURI } = e.data;
            console.log(`The playback has started for: ${playingURI}`);
          });

          spotifyEmbedControllerRef.current = spotifyEmbedController;
          
        }
      );

      return () => {
        if (spotifyEmbedControllerRef.current) {
          spotifyEmbedControllerRef.current.removeListener("playback_update");
        }
      };
    }, [playerLoaded, iFrameAPI, uri]);

    const onPauseClick = () => {
      if (spotifyEmbedControllerRef.current) {
        spotifyEmbedControllerRef.current.pause();
      }
    };

    const onPlayClick = () => {
      if (spotifyEmbedControllerRef.current) {
        spotifyEmbedControllerRef.current.play();
      }
    };

    const onUriChange = (event) => {
      setUri(event.target.value);
      if (spotifyEmbedControllerRef.current) {
        spotifyEmbedControllerRef.current.loadUri(event.target.value);
      }
    };

    return (
      <div className="mt-5 relative flex flex-col">
        <div ref={embedRef} />
        {!playerLoaded && <p>Loading...</p>}
        <div className="flex flex-row">
          <button className= "neo-brutalism-white neo-btn-magic-rel" aria-label="Play" onClick={onPlayClick}>
            Play
          </button>
          <button className= "neo-brutalism-white neo-btn-magic-rel" aria-label="Pause" onClick={onPauseClick}>
            Pause
          </button>
        </div>
        {/* <div>
          <p>Change URI:</p>
          <input
            type="text"
            value={uri}
            onChange={onUriChange}
            placeholder="Enter Spotify URI"
          />
        </div> */}
      </div>
    );
  }

export default SpotifyReveal
  