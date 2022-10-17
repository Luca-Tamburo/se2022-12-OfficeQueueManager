//Imports
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';

const Counter = () => {
    return (
        <Container className='h-100 d-flex flex-column align-item-center justify-content-center'>
            <Row className='mb-5'>
                <h2 className='mb-4 text-center'>Select a counter and call the next customer</h2>
                <Col xs={{ span: 3, offset: 3 }} className='mt-3 mx-auto text-center'>
                    <Form.Select className="mb-4 text-center">
                        <option>Select a counter</option>
                        <option value='1'>Counter 1</option>
                        <option value='1'>Counter 2</option>
                        <option value='1'>Counter 3</option>
                        <option value='1'>Counter 4</option>
                    </Form.Select>
                    <Button size='lg' className='mt-3 p-2'>
                        <FontAwesomeIcon icon={faHandPointRight} className='pe-2' />
                        Call next customer
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Counter;