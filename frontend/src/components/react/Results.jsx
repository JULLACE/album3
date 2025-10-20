import '../../styles/search.css';


const Results = ({ songInfo, chooseCover, selected, index }) => {
    return (
        <button className={selected ? "result selected" : "result"} onClick={() => chooseCover(index)}>
            <img src={songInfo.cover_image} />
            <p>{songInfo.title}</p>
        </button>
    );
};

export default Results;