//Imports
import { useState } from 'react';
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

//Hooks
import useNotification from '../hooks/useNotification';

//APIs
import api from "../API";

const Counter = (props) => {
    const [counter, setCounter] = useState(0)
    const notify = useNotification();
    const navigate = useNavigate();

    let handleCounter = (v) => {
        setCounter(v);
    }

    let callNext = async () => {
        try {
            let service = await api.getService(counter);
            let ticketNumber = await api.putTicket(service, counter);
            props.handleCTable(counter, ticketNumber);

            notify.success('You served ticket ' + ticketNumber + ' for service ' + service);
            navigate('/', { replace: true });
        }
        catch (err) {
            if (err.status === 404)
                notify.error("No tickets are in the queue for this counter!");
            throw err;
        }
    }

    return (
        <Container className='h-100 d-flex flex-column align-item-center justify-content-center'>
            <Row className='mb-5'>
                <h2 className='mb-4 text-center'>Select a counter and call the next customer</h2>
                <Col xs={{ span: 3, offset: 3 }} className='mt-3 mx-auto text-center'>
                    <Form.Select className="mb-4 text-center" onChange={(event) => handleCounter(event.target.value)}>
                        <option value='0'>Select a counter</option>
                        <option value='1'>Counter 1</option>
                        <option value='2'>Counter 2</option>
                        <option value='3'>Counter 3</option>
                        <option value='4'>Counter 4</option>
                    </Form.Select>
                    <Button size='lg' className='mt-3 p-2' onClick={callNext}>
                        <FontAwesomeIcon icon={faHandPointRight} className='pe-2' />
                        Call next customer
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Counter;