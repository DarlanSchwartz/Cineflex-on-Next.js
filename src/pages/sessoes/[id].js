import styles from '@/styles/sessions.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';


export default function SessionsPage(props)
{
    const {movie} = props;
    const router = useRouter();

    return (
        <div className={styles.page_container}>
            {movie ? <p>Selecione o horário</p> : <img className="loading-gif" src={loadingGif}/>}
            <div>
                {movie && movie.days.map((day) => (<div className={styles.sessions_container} data-test="movie-day" key={day.id}>
                    {day.weekday + ' - ' + day.date}
                    <div className={styles.buttons_container}>
                        {day.showtimes.map( (showtime) => 
                    
                            <button data-test="showtime" key={showtime.id} onClick={() => router.push(`/assentos/${showtime.id}`)}>{showtime.name}</button>
                        
                        )}
                    </div>
                </div>))}
            </div>

            <div className={styles.footer_Container} data-test="footer">
                <div >
                    { movie ? <img className={styles.movie_cover} src={movie.posterURL} alt="poster" /> : <img className="loading-gif-mini" src={loadingGif}/>}
                </div>
                <div>
                    <p>{movie ? movie.title : 'Carregando..'}</p>
                </div>
            </div>

        </div>
    );
}

export const getServerSideProps = async (rota) =>
{
    const {id} = rota.query;
    const resposta = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`);

    return {
      props:{
        movie:resposta.data
      }
    }
}