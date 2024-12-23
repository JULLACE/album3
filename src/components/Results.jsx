const Results = ({ songInfo }) => {
    return (
        <div class="result">
            <p>{songInfo.title}</p>
            <img src={songInfo.thumb} />
        </div>
    );
}

export default Results