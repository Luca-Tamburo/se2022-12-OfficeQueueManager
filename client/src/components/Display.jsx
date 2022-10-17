//Imports
import { Col, Table } from "react-bootstrap";

const Display = () => {
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
                        {/* Add props here */}
                        <tr>
                            <td className="border-0">Counter 1</td>
                            <td className="border-0">67</td>
                        </tr>
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
                        {/* Add props here */}
                        <tr>
                            <td className="border-0">Service 1</td>
                            <td className="border-0">22</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </>
    );
}

/*
    function tableCounterData(props) {
        return (
            <>
                <td>{props.course.number}</td>
                <td>{props.course.name}</td>
                <td>{props.course.code}</td>
            </>
        );
    }
    function tableServiceData() {
        return (
            <>
                <td>{props.course.code}</td>
                <td>{props.course.name}</td>
                <td>{props.course.length}</td>
            </>
        );
    }
    */

export default Display;