import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'sI7b4Z8QE5opnAc5PF2Xgwuz';

export default function Home(props) {

  const { movies} = props;
  
  return (
    <>
      <div className={styles.page_container}>
           {movies.length > 0 && <p> Selecione o filme</p>}

            <div className={styles.list_container}> 
                {movies.length > 0 ? movies.map((movie) => 
                <Link key={movie.id} href={`/sessoes/${movie.id}`}>
                    <div className={styles.movie_container} data-test="movie"  >
                        <img src={movie.posterURL} alt="poster"/>
                    </div>
                </Link>
                ): <img className="loading-gif" src={loadingGif}/>}
            </div>

        </div>
    </>
  )
}

export const getServerSideProps = async () =>
{

    const resposta  = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');

    return {
      props:{
        movies:resposta.data
      }
    }
}
