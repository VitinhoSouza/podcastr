import {createContext, useState, ReactNode, useContext} from 'react'

type Episode = {
    title:string;
    members:string;
    thumbnail:string;
    duration:number;
    url:string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying:boolean;
    isLooping:boolean;
    isShuffling:boolean;
    play:(episode:Episode) => void;
    playList:(list:Episode[], index:number) => void;
    playNext:() => void;
    playPrevious:() => void;
    togglePlay:() => void;
    toggleLoop:() => void;
    toggleShurffle:() => void;
    setPlayingState:(state:boolean) => void;
    clearPlayerState:()=>void;
    hasNext:boolean;
    hasPrevious:boolean;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}:PlayerContextProviderProps){

    const [episodeList,setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode:Episode){
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list:Episode[],index:number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    const hasNext = isShuffling || (currentEpisodeIndex+1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random()*episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex+1);
        }

    }

    function playPrevious(){

        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function togglePlay(){
        setIsPlaying(!isPlaying);
    }

    function toggleLoop(){
        setIsLooping(!isLooping);
    }

    function toggleShurffle(){
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state:boolean){
        setIsPlaying(state);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider value={{episodeList, currentEpisodeIndex,isPlaying,isLooping,
                                        hasNext,hasPrevious,isShuffling,play,playList,playNext,clearPlayerState,
                                        playPrevious,togglePlay,toggleLoop,toggleShurffle,setPlayingState,}}>
            {children}
        </PlayerContext.Provider>
    )

}

export const usePlayer = () => {
    return useContext(PlayerContext);
}