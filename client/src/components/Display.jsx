//Imports
import { Col, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';


//APIs
import api from "../API";

//Hooks
import useNotification from '../hooks/useNotification';




const Display = () => {
    const [services, setServices] = useState([])
    const [counters, setCounters] = useState([])
    const notify = useNotification();

    useEffect(() => {
        api.getService()
            .then((services) => {
                setServices(services.rows);
            })
            .catch(err => {
                notify.error(err.message);
            })
    }, [])

    useEffect(() => {
        api.getCounters()
            .then((counters) => {
                setCounters(counters);
            })
            .catch(err => {
                notify.error(err.message);
            })
    }, [])


    return (
        <>
            <Col xs={{ span: 5 }}>
                <h4 className="mb-3">Service counter queue</h4>
                <Table className="display">
                    <thead>
                        <tr>
                            <th>Counter</th>
                            <th>Ticket code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            counters.map((c) =>
                                <TableCounterData key = {c.ID} counter = {c}/>)

                        }
                    </tbody>
                </Table>
            </Col>
            <Col xs={{ span: 5, offset: 1 }}>
                <h4 className="mb-3">Service queue</h4>
                <Table className="display">
                    <thead >
                        <tr>
                            <th>Service type</th>
                            <th>Queue length</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services.map((s) =>
                                <TableServiceData key = {s.ID} service = {s}/>)

                        }
                    </tbody>
                </Table>
            </Col>
        </>
    );
}


function TableCounterData(props) {
    const [TicketCalled, setTicketCalled] = useState([])
    const notify = useNotification();

    useEffect(() => {
        api.getTicketbyCounter(props.counter.ID)
            .then((t) => {
                setTicketCalled(t.ID);
            })
            .catch(err => {
                notify.error(err.message);
            })
    }, [])

    

    return (
        <>
        <tr>
            <td>{props.counter.ID}</td>
            <td>{TicketCalled? TicketCalled: '-'}</td>
            </tr>
        </>
    );
}



function TableServiceData(props) {
    const [length, setLength] = useState([])
    const notify = useNotification();

    useEffect(() => {
        api.getTicketbyService(props.service.ID)
            .then((l) => {
                setLength(l);
            })
            .catch(err => {
                notify.error(err.message);
            })
    }, [])

    return (
        <>
        <tr>
            <td>{props.service.ID}</td>
            <td>{length}</td>
        </tr>
        </>
    );
}


export default Display;