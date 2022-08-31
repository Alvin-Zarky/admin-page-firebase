import React from 'react'
import ImageNotFound from "../../assets/img/404.png"
import {Row, Col, Container} from "reactstrap"
import './not-found.scss'

export default function NotFound() {
  return (
    <Container>
      <Row>
        <Col xl="12" lg="12" md="12">
          <div className="page-not-found">
            <img src={ImageNotFound} alt="not-found" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
