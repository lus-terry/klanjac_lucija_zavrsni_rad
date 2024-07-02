import Percentage from "./Percentage";

const Widget = ({data}) => {
    const colorStyle = data.color ? data.color : "black"; // Defaultna boja teksta je crna
    const bgColorStyle = data.bgColor ? data.bgColor : "white"; // Defaultna boja pozadine je bijela


    return ( 


        <div className="widget_container_div" >
        <div className="flex gap-1.5">
            <div className="widget_div" style={{ color: colorStyle, backgroundColor: bgColorStyle}}>{data.icon}</div>
            <div className="text-left">
                <h3> {data.isMoney 
                ? "$" + data.digits?.toLocaleString()
                : data.digits?.toLocaleString()
                }
                </h3>
                <div className="normal_text text-left">{data.title}</div>
            </div>
            <Percentage data={data}/>
        </div>

        </div>

);
}
 
export default Widget;