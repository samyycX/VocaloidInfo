import { Action, configureStore } from "@reduxjs/toolkit";

// 同 SongInfoStore
export enum ArtistActionType {
    LOADING,
    LOADED,
    FAILED,
    ALL = LOADING | LOADED | FAILED
}
export enum ArtistType {
    PRODUCER,
    VOCALOID,
    OTHER
}

export interface ArtistAction extends Action  {
    type: ArtistActionType,
    data?: {
        vocadbData?: any
    },
    artistType?: ArtistType 
}

const reducer = ( _, action: ArtistAction) => {
    if (action.data != undefined) {
        switch (action.data.vocadbData.artistType) {
            case "Producer":
                action.artistType = ArtistType.PRODUCER;
                break;
            case "Vocaloid":
            case "SynthesizerV":
            case "CeVIO":
            case "UTAU":
                action.artistType = ArtistType.VOCALOID;
                break;
            default:
                action.artistType = ArtistType.OTHER;
        }
    }
    return action;
}

export const ArtistInfoStore = configureStore({ reducer: reducer });
