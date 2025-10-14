import '../styles/search.css';


const Results = ({ songInfo, chooseCover, selected, index }) => {
    return (
        <div className={selected ? "result selected" : "result"} onClick={() => chooseCover(index)}>
            <img src={songInfo.cover_image} />
            <p>{songInfo.title}</p>
        </div>
    );
};

export default Results;