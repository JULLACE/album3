const Results = ({ songInfo }) => {
    if (songInfo.type === 'artist')
        return

    return (
        <div className="result" onClick={() => console.log(`Selected ${songInfo.id}, functionality goes here`)}>
            <p>{songInfo.title}</p>
            <img src={songInfo.cover_image} />
        </div>
    );
}

export default Results