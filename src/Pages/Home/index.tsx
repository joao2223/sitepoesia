import styles from "./Home.module.scss"
import coisamisteriosa from "../../Images/coisamisteriosa.png"

export default function Home() {
    return (
        <>
            <div className={styles.cor}>
                <p className={styles.tempo_entrega}>tenha o seu pedido enviado em até 3 dias úteis ou seu dinheiro de volta!</p>
            </div>
            <div className={styles.container_titulo}>
                <a href="" className={styles.link}><p className={styles.titulo_link} >portfólio tetê</p></a>
                <div className={styles.spp}>
                    {/* <p>selo poesia postal</p> */}
                    <p className={styles.titulo}>SPP</p>
                </div>
                <a href="https://www.instagram.com/0800tete0001/" className={styles.link}><p className={styles.titulo_link} >@0800tete0001</p></a>
            </div>

            <div className={styles.container_poesia_mais_info}>
                <div>
                    <img src={coisamisteriosa} alt="" className={styles.foto_poesia} />
                </div>
                <div className={styles.info}>
                    <p className={styles.titulo_info}>Diagrama 1</p>
                    <div>
                        <p className={styles.descricao_info}>poema impresso em livreto</p>
                        <p className={styles.descricao_info}>papel, gramatura</p>
                        <p className={styles.descricao_info}>10cmx10cm</p>
                    </div>
                    <p className={styles.descricao_info}>13,00 + taxa de entrega fixa (4,00)</p>
                    <p className={styles.descricao_info}>Quantidade:</p>
                    <p className={styles.comprar}>Comprar</p>
                </div>
            </div>
        </>
    )
}