//Imports
import { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faWallet, faTruckFast, faList } from '@fortawesome/free-solid-svg-icons';

//Components
import Display from '../components/Display'

//Hooks
import useNotification from '../hooks/useNotification';

//APIs
import api from "../API";

const Customer = () => {
    const [services, setServices] = useState([])
    const notify = useNotification();

    const icons = [
        {
            service_id: 1,
            name: faBuildingColumns
        },
        {
            service_id: 2,
            name: faWallet
        },
        {
            service_id: 3,
            name: faTruckFast
        },
        {
            service_id: 4,
            name: faList
        }
    ]

    useEffect(() => {
        api.getService()
            .then((services) => {
                setServices(services.rows);
            })
            .catch(err => {
                notify.error(err.message);
            })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Container className='h-100 d-flex flex-column align-item-center justify-content-center'>
            <Row>
                <h2 className="text-center mb-5">Choose your service</h2>
                <Col className="mb-4 mt-2 text-center">
                    {
                        services.map((service, index) => {
                            const icon = icons.filter(i => i.service_id === service.ID)[0].name
                            return (
                                <Button key={index} size="lg" className="mx-4 p-2" onClick={() => { api.addTicket(service.ID) }}>
                                    <FontAwesomeIcon icon={icon} className='pe-2' />
                                    {service.Name}
                                </Button>
                            )
                        })
                    }
                </Col>
            </Row>
            {/* Add props here */}
            <Row className="mt-4 text-center">
                <Display />
            </Row>
        </Container>
    );
}


/*
//Hooks
import useNotification from '../hooks/useNotification';
import { useNavigate } from "react-router-dom";
    const notify = useNotification();
    const navigate = useNavigate();
    function takeTicket(service_id) {
        api.addTicket(service_id);
        notify.success(`Operation performed successfully!. You have ticket # ${ticket.id} for the service ${service.id}. Waiting time ${ticket.id}`)
        navigate('/', { replace: true });
    }
*/

export default Customer;