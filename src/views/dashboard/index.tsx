import React from 'react'
import {Container, Row, Col} from "reactstrap"
import SideBar from '../../components/Sidebar';
import TopBar from '../../components/Topbar';
import {AiFillHome} from "react-icons/ai"
import {IoMdTimer} from "react-icons/io"
import {BiCategoryAlt} from "react-icons/bi"
import {FiSettings} from "react-icons/fi"
import {MdContentPaste} from "react-icons/md"
import {FaUser} from "react-icons/fa"
import { useDataCount } from '../../hooks/useDataCount';
import './dashboard.scss';

export default function Dashboard() {
  
  const {count:userCount} = useDataCount('users')
  const {count: categoryCount} = useDataCount('categories')
  const {count: contentCount} = useDataCount('contents')
  return (
    <>
      <Container className="padd-lr0" fluid>
        <Row className="row-column">
          <SideBar />
          <Col xl="10" lg="10" md="10" className="right-side-form">
            <TopBar />
            <div className="dashboard-page">
              <Row>
                <Col xl="6" lg="6" md="6">
                  <div className="title-dashbaord">
                    <div className="icon-home">
                      <AiFillHome />
                    </div>
                    <span>Dashboard</span>
                  </div>
                </Col>
                <Col xl="6" lg="6" md="6">
                  <div className="title-overview">
                    <span>Overview</span>
                    <IoMdTimer />
                  </div>
                </Col>
              </Row>
              <div className="box-counter">
                <Row>
                  <Col xl="4" lg="4" md="4">
                    <div className="part-box-category">
                      <Row>
                        <Col xl="6" lg="6" md="6">
                          <div className="title-box">
                            <span>User</span>
                          </div>
                        </Col>
                        <Col xl="6" lg="6" md="6">
                          <FaUser />
                        </Col>
                      </Row>
                      <div className="total-count">
                        <FiSettings />
                        <span>{Number(userCount)}</span>
                      </div>
                      <div className="number-count">
                        <span>Counter Index</span>
                      </div>
                    </div>
                  </Col>
                  <Col xl="4" lg="4" md="4">
                    <div className="part-box-content">
                    <Row>
                        <Col xl="6" lg="6" md="6">
                          <div className="title-box">
                            <span>Category</span>
                          </div>
                        </Col>
                        <Col xl="6" lg="6" md="6">
                          <BiCategoryAlt />
                        </Col>
                      </Row>
                      <div className="total-count">
                        <FiSettings />
                        <span>{Number(categoryCount)}</span>
                      </div>
                      <div className="number-count">
                        <span>Counter Index</span>
                      </div>
                    </div>
                  </Col>
                  <Col xl="4" lg="4" md="4">
                    <div className="part-box-boxes">
                    <Row>
                        <Col xl="6" lg="6" md="6">
                          <div className="title-box">
                            <span>Content</span>
                          </div>
                        </Col>
                        <Col xl="6" lg="6" md="6">
                          <MdContentPaste />
                        </Col>
                      </Row>
                      <div className="total-count">
                        <FiSettings />
                        <span>{Number(contentCount)}</span>
                      </div>
                      <div className="number-count">
                        <span>Counter Index</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
