const Results = ({ songInfo, chooseCover }) => {
    if (songInfo.type === 'artist')
        return;

    return (
        <div className="result" onClick={() => chooseCover(songInfo.id)}>
            <p>{songInfo.title}</p>
            <img src={songInfo.cover_image} />
        </div>
    );
}

export default Results