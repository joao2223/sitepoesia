import React, { useEffect, useState } from 'react';
import styles from "./Home.module.scss";
import coisamisteriosa from "../../Images/coisamisteriosa.png"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Ipagamento from "../../Interfaces/IPagamento";
import Modal from 'react-modal';

const fraseRepetida = 'UMA VOZ BATENDO NA SUA PORTA E TE PEDINDO PARA ABRIR';
const numRepeticoes = 10000;  // Ajuste conforme necessário

export default function Home() {
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [endereco, setEndereco] = useState({
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
    });
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');

    // token tt
    const acc = "APP_USR-3038404304218756-110108-112fe7f251968e596d3c7409aaf7b210-217056547";

    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/https://api.mercadopago.com/v1/payment_methods", {
            headers: {
                "Authorization": `Bearer ${acc}`
            }
        })
            .then((response) => { console.log(response) })
            .catch((error) => console.log(error));
    }, []);

    const onBlurCep = (ev: { target: { value: any; }; }) => {
        const { value } = ev.target;
        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    setEndereco((prevEndereco) => ({
                        ...prevEndereco,
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        uf: data.uf,
                    }));
                });
        }
    };


    const comprar = () => {
        const formData = {
            transaction_amount: valorTotal,
            description: 'poesia',
            payment_method_id: 'pix',
            payer: {
                email: 'email@email.com',
                first_name: nome,
                last_name: 'User',
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                },
                address: {
                    zip_code: endereco.cep,
                    street_name: endereco.logradouro,
                    street_number: endereco.numero,
                    neighborhood: endereco.bairro,
                    city: endereco.cidade,
                    federal_unit: endereco.uf
                }
            }
        };

        axios.post("https://cors-anywhere.herokuapp.com/https://api.mercadopago.com/v1/payments", formData, {
            headers: {
                'Authorization': `Bearer ${acc}`
            }
        })
            .then((response) => {
                console.log(response.data)
                // Adicione a chamada para a API local aqui
                const raffleData = {
                    quantity: quantidade,
                    name: nome,
                    description: numero, // Certifique-se de substituir pelo email real
                    price: response.data.id,
                    imgUrl: endereco.cep + endereco.logradouro + endereco.bairro + endereco.cidade + endereco.uf, // Substitua 'codigo' pela lógica real para obter o código da imagem
                    raffleStatus: 'OPEN'
                };

                axios.post("http://localhost:8080/raffles", raffleData)
                    .then((raffleResponse) => {
                        // Aqui você pode lidar com a resposta da API local (raffleResponse)
                       // window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;
                    })
                    .catch((raffleError) => console.log(raffleError));
            })
            .catch((error) => console.log(error));
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
                    {(' ' + fraseRepetida + ' ' + '-').repeat(numRepeticoes)}
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
                <Carousel style={{ width: '30rem' }}>
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
                        <form className='{styles.container_form}' onSubmit={comprar}>
                            <label className={styles.descricao_info}>
                                Nome:
                                <input
                                    name="name"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </label >
                            <br />
                            <label className={styles.descricao_info}>
                                Número:
                                <input 
                                name="number"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                                />
                            </label>
                            <br />
                            <label className={styles.descricao_info}>
                                E-mail:
                                <input 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                CEP:
                                <input
                                    name="cep"
                                    value={endereco.cep}
                                    onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                                    onBlur={onBlurCep}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Logradouro:
                                <input
                                    name="logradouro"
                                    value={endereco.logradouro}
                                    onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Número:
                                <input
                                    name="numero"
                                    value={endereco.numero}
                                    onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Complemento:
                                <input
                                    name="complemento"
                                    value={endereco.complemento}
                                    onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Bairro:
                                <input
                                    name="bairro"
                                    value={endereco.bairro}
                                    onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Cidade:
                                <input
                                    name="cidade"
                                    value={endereco.cidade}
                                    onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                                    required
                                />
                            </label>
                            <label className={styles.descricao_info}>
                                Estado:
                                <input
                                    name="uf"
                                    value={endereco.uf}
                                    onChange={(e) => setEndereco({ ...endereco, uf: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <button className={styles.finalizarButton} type = "submit">
                                Finalizar Compra
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
        </>
    )
}