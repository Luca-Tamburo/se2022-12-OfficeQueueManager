//Imports
import { Button, Col, Row, Container } from "react-bootstrap";
import Display from '../components/Display'
import api from "../API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faWallet, faTruckFast, faList } from '@fortawesome/free-solid-svg-icons';

const Customer = (props) => {
    return (
        <Container className='h-100 d-flex flex-column align-item-center justify-content-center'>
            <Row>
                <h2 className="text-center mb-5">Choose your service</h2>
                <Col className="mb-4 mt-2 text-center">
                    {/* Add props here */}
                    <Button size="lg" className="mx-4 p-2" onClick={() => { api.addTicket(1) }}>
                        <FontAwesomeIcon icon={faBuildingColumns} className='pe-2' />
                        Service 1
                    </Button>
                    {/* Add props here */}
                    <Button size="lg" className="mx-4 p-2" onClick={() => { api.addTicket(2) }}>
                        <FontAwesomeIcon icon={faWallet} className='pe-2' />
                        Service 2
                    </Button>
                    {/* Add props here */}
                    <Button size="lg" className="mx-4 p-2" onClick={() => { api.addTicket(3) }}>
                        <FontAwesomeIcon icon={faTruckFast} className='pe-2' />
                        Service 3
                    </Button>
                    {/* Add props here */}
                    <Button size="lg" className="mx-4 p-2" onClick={() => { api.addTicket(4) }}>
                        <FontAwesomeIcon icon={faList} className='pe-2' />
                        Service 4
                    </Button>
                </Col>
            </Row>

            {/* Add props here */}
            <Row className="mt-4 text-center">
                <Display />
            </Row>
        </Container>
    );
}

export default Customer;