import style from "./TimelineItem.module.scss"

export default function TimelineItem({data}) {

    return (
        <div className={style.timelineItem}>
            <div className={style.header}>
                <div> 
                    <div className={style.role}>{data.role} </div>
                    <div>{data.place} </div>
                </div>
                <div> {data.start}-{data.end} </div>
            </div>
            {data.desc?.map((d, i) => 
                <div key={`desc${i+1}`}>
                    {d}
                </div>)
            } 
        </div>
    )
}