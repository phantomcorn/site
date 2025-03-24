import style from "./TimelineItem.module.css"

export default function TimelineItem({data}) {

    return (
        <div className={style["timeline-item"]}>
            <div className={style.header}>
                <div> 
                    <div className={style.role}>{data.role} </div>
                    <div className={style.place}>{data.place} </div>
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