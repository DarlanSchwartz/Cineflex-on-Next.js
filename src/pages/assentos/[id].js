import { useRouter } from "next/router";
import styles from '@/styles/Seats.module.css';
import Seat from "../components/Seat";
import { useState,useEffect } from "react";
import axios from "axios";
axios.defaults.headers.common['Authorization'] = 'sI7b4Z8QE5opnAc5PF2Xgwuz';

export default function SeatsPage(props) {
    const [movieSeats, setMovieSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userCpf, setUserCpf] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useRouter();

    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${navigate.query.id}/seats`)
        .then(response => {setMovieSeats(response.data)})
        .catch( console.log);
        
    }, [navigate.query.id]);


    function formatarCPF(value) {
        // Remover caracteres não numéricos
        var cpf = value.replace(/\D/g, '');

        // Verificar se o CPF está vazio
        if (cpf === '') {
            return cpf;
        }

        // Adicionar a formatação conforme o CPF é digitado
        if (cpf.length > 3) {
            cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
        }
        if (cpf.length > 7) {
            cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
        }
        if (cpf.length > 11) {
            cpf = cpf.substring(0, 11) + '-' + cpf.substring(11);
        }

        // Atualizar o valor do campo de entrada
        return cpf;
    }

    function updateSelectedSeats(seatObj, add) {

        if (add == true) {
            setSelectedSeats([...selectedSeats, seatObj]);
        }
        else {
            const seats = [...selectedSeats];
            const newSeats = [];

            seats.forEach(seat => {
                if (seat.id != seatObj.id) {
                    newSeats.push(seat);
                }
            });

            setSelectedSeats(newSeats);
        }
    }

    return (
        <div className={styles.page_container}>
            {movieSeats.length == 0 ? <img className="loading-gif" src={''} /> : 'Selecione o(s) assento(s)'}
            <div className={styles.seats_container}>
                {movieSeats.length == 0 ? '' : movieSeats.seats.map(seat => {
                    return <Seat updt_seats={(seat, value) => updateSelectedSeats(seat, value)} key={seat.name} is_avaiable={seat.isAvailable} name={seat.name} id={seat.id} />
                })}
            </div>

            <div className={styles.caption_container}>
                <div className={styles.caption_item}>
                    <div className={styles.caption_circle_selected} />
                    Selecionado
                </div>
                <div className={styles.caption_item}>
                    <div className={styles.caption_circle_available} />
                    Disponível
                </div>
                <div className={styles.caption_item}>
                    <div className={styles.caption_circle_unavaiable} />
                    Indisponível
                </div>
            </div>

            <form className={styles.form_container} onSubmit={(e) => {


                if (userCpf == '' || userName == '' || userCpf.length < 11) {
                    e.preventDefault();
                    return;
                }

                if (userName.trim().length === 0) {
                    e.preventDefault();
                    return;
                }

                const sucessObj =  {
                    seats: selectedSeats,
                    title: movieSeats.movie.title,
                    cpf: userCpf,
                    username: userName,
                    date: movieSeats.day.date,
                    time: movieSeats.name
                };


                let seatIds = [];
                let finalcpf = userCpf.replace(/[.-]/g, "");

                selectedSeats.forEach(seat => {
                    seatIds.push(seat.id);
                });

                const obj = {
                    ids: seatIds,
                    name: userName,
                    cpf: finalcpf
                };

                e.preventDefault();

                axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`,obj)
                .then(()=> {
                    
                    navigate.push('/sucesso');

                    props.set_info(sucessObj);
                })
                .catch(console.log);
            }}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input data-test="client-name" type="text" pattern="^\s*\S.*$" required placeholder="Digite seu nome..." id="nome" name="nome" value={userName} onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input data-test="client-cpf" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" required placeholder="Digite seu CPF..." id="cpf" name="cpf" value={formatarCPF(userCpf)} onChange={(e) => setUserCpf(e.target.value.length < 14 ? e.target.value : e.target.value.substring(0, 14))} />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </form>

            <div className={styles.footer_container} data-test="footer">
                <div>
                    {movieSeats.length != 0 ? <img src={movieSeats.movie.posterURL} alt="poster" /> : <img className="loading-gif" src={''} />}
                </div>
                <div>
                    <p>{movieSeats.length != 0 ? movieSeats.movie.title : 'Carregando...'}</p>
                    <p>{movieSeats.length != 0 ? (movieSeats.day.weekday + ' - ' + movieSeats.name) : ''}</p>
                </div>
            </div>

        </div>
    );
}