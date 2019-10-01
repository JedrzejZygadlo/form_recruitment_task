import React from 'react';
import FormOrder from './Form';
import axios from 'axios'
import { Card, CardHeader, CardBody, Row, Col, Container } from 'reactstrap';
class App extends React.Component  {
    onSubmit = (formValues) => {
        
        axios({
            method: 'post',
            url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
            data: {
                formValues
            }
        });
    }
    render(){
        return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="12" sm="8" md="6">
                    <Card>
                        <CardHeader style={{color: "white", backgroundColor: '#0275d8', height: "100px", textAlign: "center"}} className="d-flex align-items-center"> 
                            <h3 className="mx-auto">ORDER HANDLING FORM</h3>                       
                        </CardHeader>
                        <CardBody>
                            <FormOrder/>
                        </CardBody>   
                    </Card>
            </Col>
            </Row>
        </Container>
        
    )
    }
}

export default App;