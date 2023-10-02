import style from "./style.module.css";
import Button from "../Button";
export default function Modal(props){

    return (
        <div className={`modal fade`} id={props.id} tabIndex="-1" aria-labelledby={props.id} aria-hidden="true">
            <div className={`modal-dialog  ${props.modalSize}`}>
                <div className={`modal-content ${props.className}`}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={props.id}>{props.modalTitle}</h1>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

