

function RankItem(props) {
    return (
        <div className="rank-item">
            <div className="rank-change" style={
                props.item.rankChange == 0 ? { opacity: 0 } : { }
            }>{ props.item.rankChange == 0 ? "/" : props.item.rankChange > 0 ? "+" : "-" }</div>
            <div className="ranking">{ props.item.rank }.</div>
            <div className="rank-label">{ props.item.domain }</div>
            <div className="rank-category">{ props.item.category }</div>
        </div>
    )
}

export default RankItem;