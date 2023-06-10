import '@/styles/globals.css';
import styles from '@/styles/Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const [info, set_info] = useState({});
  const navigate = useRouter();

  return(
    <>
      <div className={styles.nav_container}>
                CINEFLEX
                {navigate.asPath != "/" &&  <img data-test="go-home-header-btn" onClick={()=>navigate.back()} src='/Arrow.svg'/>}
      </div>
      <Component {...pageProps} set_info={set_info} sucess_info={info} />
    </>
  );
}
