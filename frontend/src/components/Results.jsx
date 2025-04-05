const Results = ({ songInfo, chooseCover }) => {
    return (
        <div className="result" onClick={() => chooseCover(songInfo.resource_url)}>
            <p>{songInfo.title}</p>
            <img src={songInfo.cover_image} />
        </div>
    );
}

export default Results