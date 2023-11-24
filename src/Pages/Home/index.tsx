import React, { useEffect, useState } from 'react';
import styles from "./Home.module.scss";
import coisamisteriosa from "../../Images/coisamisteriosa.png"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Ipagamento from "../../Interfaces/IPagamento";
import Modal from 'react-modal';

export default function Home() {
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [nome, setNome] = useState();
    const [numero,setNumero] = useState();

    //token tt
    const acc = "APP_USR-3038404304218756-110108-112fe7f251968e596d3c7409aaf7b210-217056547"
    //rifa const acc = 'APP_USR-475581657188028-071815-8408e2a91f964626a4b56ed758a65abf-180659991'

    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/https://api.mercadopago.com/v1/payment_methods", {
            headers: {
                "Authorization": `Bearer ${acc}`
            }
        })
        .then((response) => { console.log(response) })
        .catch((error) => console.log(error));
    }, []);


    const comprar = () => {
        const formData = {
            transaction_amount: valorTotal,
            description: 'poesia',
            payment_method_id: 'pix',
            payer: {
                email: 'email@email.com',
                first_name: 'Test',
                last_name: 'User',
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                },
                address: {
                    zip_code: '06233200',
                    street_name: 'Av. das Nações Unidas',
                    street_number: '3003',
                    neighborhood: 'Bonfim',
                    city: 'Osasco',
                    federal_unit: 'SP'
                }
            }
        };

        axios.post("https://cors-anywhere.herokuapp.com/https://api.mercadopago.com/v1/payments",formData, {
            headers: {
                'Authorization': `Bearer ${acc}`
            }
        }).then((response) => {  window.location.href = response.data.point_of_interaction.transaction_data.ticket_url; })
            .catch((error) => console.log(error))
    }

    function openModal() {
        setValorTotal((quantidade * 27.47) + 4);
        setIsOpen(true);

    }


    function closeModal() {
        setIsOpen(false);
    }


    return (
        <>
            <div className={styles.cor}>
                <p className={`${styles.tempo_entrega} ${styles.newsTicker}`}>
                    UMA VOZ BATENDO NA SUA PORTA E TE PEDINDO PARA ABRIR
                </p>
            </div>
            <div className={styles.container_titulo}>
                <a href="https://tetemilcontra.hotglue.me/" className={styles.link}><p className={styles.titulo_link}>Portfólio Tetê</p></a>
                <div className={styles.spp}>
                    <p className={styles.titulo}>SPP</p>
                </div>
                <a href="https://www.instagram.com/0800tete0001/" className={styles.link}><p className={styles.titulo_link}>@0800tete0001</p></a>
            </div>

            <div className={styles.container_poesia_mais_info}>
                <Carousel>
                    <Carousel.Item>
                        <img src={coisamisteriosa} alt="" className={styles.foto_poesia} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={coisamisteriosa} alt="" className={styles.foto_poesia} />

                    </Carousel.Item>
                </Carousel>
                <div className={styles.info}>
                    <p className={styles.titulo_info}>Diagrama 1</p>
                    <div>
                        <p className={styles.descricao_info}>Poema impresso em livreto</p>
                        <p className={styles.descricao_info}>Papel, gramatura</p>
                        <p className={styles.descricao_info}>10cmx10cm</p>
                    </div>
                    <p className={styles.descricao_info}>R$ 22,47 + taxa de entrega fixa (R$ 4,00)</p>
                    <div className={styles.container_quantidade}>
                        <p className={styles.descricao_info}>Quantidade:</p>
                        <button className={styles.botao} onClick={() => quantidade > 0 ? setQuantidade(quantidade - 1) : setQuantidade(quantidade)}>-</button>
                        <p className={styles.descricao_info}>{quantidade}</p>
                        <button className={styles.botao} onClick={() => setQuantidade(quantidade + 1)}>+</button>
                    </div>

                    <div>
                        <button className={styles.comprar} onClick={openModal}> Comprar</button>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className={styles.seuModal} // Use a classe definida em seus estilos
                        overlayClassName={styles.seuModalOverlay} // Use a classe definida em seus estilos
                        style={{
                            overlay: {
                                background: 'linear-gradient(to top, #ac03be 0%, #c501c5 50%, #68c5ff  #ac03be100%)',
                                zIndex: 10000,
                            },
                            content: {
                                background: 'linear-gradient(to bottom, #ac03be 0%, #c501c5 50%, #68c5ff 100%)',
                                zIndex: 10000,
                                // Adicione outras propriedades de estilo conforme necessário
                            },
                        }}
                    >
                        <p className={styles.descricao_info}>Valor total da compra: {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <p className={styles.descricao_info}>Insira os seus dados para confirmar a compra:</p>
                        <form>
                            <label className={styles.descricao_info}>
                                Nome:
                                <input name="name" />
                            </label >
                            <br />
                            <label className={styles.descricao_info}>
                                Número:
                                <input name="number" />
                            </label>
                            <br />
                            <label className={styles.descricao_info}>
                                E-mail:
                                <input name="email" />
                            </label>
                            <br />
                            <button type="button" className={styles.finalizarButton} onClick={comprar}>
                                Finalizar Compra
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
        </>
    )
}