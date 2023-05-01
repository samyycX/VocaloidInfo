interface DataGetter {
    
    getSongDataFromPage(): Promise<{ vocadbData?: any; bilibiliData?: any; }>;

    getArtistDataFromPage(): Promise<{vocadbData?: any}>;
    
}