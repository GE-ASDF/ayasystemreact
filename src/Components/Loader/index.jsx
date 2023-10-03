export default function Loader(props){
    return (
        <div {...props} className={`c-loader ${props.className}`}>
            <div className="loader"></div>
        </div>
    )
}