import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './EmpleosPostulantes.module.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, useParams } from 'react-router-dom';
import { getJwt, putWithToken } from '../../api';

export default function EmpleosPostulantesDetail() {

    const [empleo, setEmpleo] = useState({});
    /* Variables estados */
    const [empleador, setEmpleador] = useState([]);
    const [pais, setPais] = useState('');
    const [provincia, setProvincia] = useState('');
    const [categorias, setCategorias] = ('')
    const { id } = useParams();
    const { title, description, salary } = empleo;

    useEffect(() => {
        getJwt("jobs/" + id)
            .then((res) => {
                setEmpleo((res.data));
                setEmpleador(res.data.employer)
                setPais(res.data.location.country);
                setProvincia(res.data.location.province);
            })
            .catch(error => console.log(error));
    }, [])

    const aplicar = () => {
        putWithToken(`jobs/apply/` + id)
            .then(result => {
                if(result.data.error === true){
                    alert('Lo siento, ya has aplicado al empleo')
                }else{
                    alert('Muchas gracias por aplicar!')
                }
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const unApply = () => {
        putWithToken(`jobs/unapply/` + id)
            .then(result => {
                if(result.data.error === true){
                    alert('Lo siento, no has aplicado a este empleo')
                }else{
                    alert('Tu postulacion a sido removida ')
                }
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
            <div className={styles.containterEmpleoDetail}>
                <Link to='/empleos'>
                    <Button id={styles.botonVolverEmpleoDetail}>  ←  Volver al listado</Button></Link>
                {/* HEADER */}
                <div className={styles.containerEmpleo}>
                    <div className={styles.EmpleoDetalle}>
                        <div>
                            <div className={styles.titulosEmpleoDetail}>
                                <h1 style={{ color: 'rgb(255, 154, 6)' }}>{title}</h1>
                                <h3 style={{ display: 'inline', fontWeight: 'normal' }}> {`[${pais}, ${provincia}]`}</h3>
                            </div>
                            <hr />
                            {/* MINI NAVBAR */}
                        </div>
                        {/* DETALLE EMPLEO */}
                        <div className={styles.descripcionEmpleoDetail}>
                            <h3>Descripcion de la oferta</h3>
                            <p className={styles.descripcionEmpleoDetailParrafo}>{description}</p>
                            <br />
                            <h4>Salario</h4>
                            <p className={styles.descripcionEmpleoDetailParrafo}>{salary}</p>
                            <hr />
                        </div>
                    </div>
                    {/* CARD EMPLEADOR */}
                    <div className={styles.cardEmpleo}>
                        <div className={styles.cardEmpleoEmpresa}>
                            <img className={styles.cardEmpleoFoto} src="https://picsum.photos/200" alt="Logo empresa" />
                            <h2>{empleador.name}</h2>
                            <p style={{ color: 'green', marginBottom: '80px' }}>Empresa verificada ✔️</p>
                        </div>
                        {/* DATOS EMPLEADOR */}
                        <div className={styles.empresaEmpleoDetail}>
                            <h4 className={styles.empresaEmpleoDetailParrafo}>Datos de la Empresa:</h4>
                            <h5 className={styles.empresaEmpleoDetailParrafo}>{empleador.name}</h5>
                            <p className={styles.empresaEmpleoDetailParrafo}>{empleador.email}</p>
                        </div>
                        <div className={styles.cardEmpleoBotonDiv}>
                            <Button className={styles.cardEmpleoBoton} onClick={aplicar}> Postularme</Button>
                            <Button className={styles.cardEmpleoBoton} onClick={unApply}> Anular Solicitud</Button>
                            <Button className={styles.cardEmpleoBotonGuardar}> <BookmarkBorderIcon /> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

{/* <div className={styles.navbarEmpleoDetail}>
<div><Button id={styles.navbarEmpleoDetailBoton}>Oferta</Button></div>
<div><Button id={styles.navbarEmpleoDetailBoton}>Empresa</Button></div>
<div><Button id={styles.navbarEmpleoDetailBoton}>Ofertas similares</Button></div>
</div> */}
