import { useTheme } from "../../Contexts/ThemeContext"
import Loader from "../Loader"

export default function MatriculadosOm({matriculados, loading}){
    const themeCtx = useTheme();
    return (
        <div style={{overflow:"auto"}}>
            {matriculados.length > 0 &&
                <table className={`table table-${themeCtx.theme == "dark" ? "dark":"light fw-bold bordered"}`}>
                    <thead>
                        <tr>
                            <th>Quantidade: {matriculados.length}</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            {/* <td>Login</td> */}
                            <td>Nome do aluno</td>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculados.map(matriculado =>{
                            return (
                                <tr key={matriculado.ID}>
                                    <td>{matriculado.ID}</td>
                                    {/* <td>{matriculado.LOGIN}</td> */}
                                    <td>{matriculado.NOME}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            }
            {loading && <Loader />}
        </div>
    )
}