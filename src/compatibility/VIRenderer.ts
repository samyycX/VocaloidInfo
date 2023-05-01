interface VIRenderer {
    renderSong(): Promise<void>;
    renderArtist(): Promise<void>;
}