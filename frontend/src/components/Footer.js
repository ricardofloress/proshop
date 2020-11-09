import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

//vai retornar um elemento html com bootstarp que vai ser a footer, apenas pode retornar um div com conteudo(tem de estar encapsulado) lá dentro
const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; ProShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
