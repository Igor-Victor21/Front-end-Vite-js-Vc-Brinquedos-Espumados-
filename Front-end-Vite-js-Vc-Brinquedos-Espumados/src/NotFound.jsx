import style from './NotFound.module.css'

import Erro from './assets/image/Erro404.png'
import Gif from './assets/gif/AnimationCat.gif'

export default function NotFoundScreen() {


    return (
        <>
            <section className={style.containerImg}>
                <img
                className={style.img}
                src={Erro}
                alt="Error"/>
            </section>
            <section className={style.container}>
                <h1 className={style.h1}>ERROR</h1>
                <h3 className={style.h3}>Oops!</h3>
                <p className={style.p}> página que você está tentando acessar não foi encontrada.</p>
                <img
                className={style.gif}
                src={Gif}
                alt="GifGato"/>
            </section>
        </>
    )
}