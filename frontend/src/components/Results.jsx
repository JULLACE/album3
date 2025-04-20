const Results = ({ songInfo, chooseCover, selected }) => {
    return (
        <div className={ selected ? "result selected" : "result" } onClick={() => chooseCover(songInfo.id)}>
            <img src={songInfo.cover_image} />
            <p>{songInfo.title}</p>
        </div>
    );
}

export default Results