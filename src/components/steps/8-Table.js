import React from "react";
import { Col, Row, Table } from "react-bootstrap";

const Step8 = () => {
  return (
    <div>
      <h2 className="py-5 mt-5">Table</h2>
      <Row className="text-center mb-5 pb-5">
        <Col className="text-right">
          <h4 className="py-2">:Slope A Triangle type</h4>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "#ff8603" }}>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#ff8603" }}>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#ff8603" }}>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#ff8603" }}>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#ff8603" }}>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Step8;
