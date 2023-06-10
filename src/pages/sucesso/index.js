import { useRouter } from "next/router";
import styles from '@/styles/Sucess.module.css';

export default function SucessPage(props)
{
    const navigate = useRouter();

    return(
        <div className={styles.page_container}>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <div className={styles.text_container} data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{props.sucess_info.title}</p>
                <p>{props.sucess_info.date +" - "+ props.sucess_info.time}</p>
            </div>

            <div className={styles.text_container} data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {props.sucess_info && props.sucess_info.seats && props.sucess_info.seats.length > 0 && props.sucess_info.seats.map((i) => {return <p key={i.id} >Assento {i.name}</p>})}
            </div>

            <div className={styles.text_container} data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.sucess_info.username}</p>
                <p>CPF: {props.sucess_info.cpf}</p>
            </div>

            <button data-test="go-home-btn" onClick={() => navigate.push('/')}>Voltar para Home</button>
        </div>
    );
}