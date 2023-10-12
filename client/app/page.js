"use client"
import styles from '@styles/main.css'
import { Row, Container, Col, Stack } from "react-bootstrap"
import ConfigSideNav from '@components/ConfigSideNav'
import MainContainer from '@components/MainContainer'
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  return (
    <>
      <Row className=' pe-3 vh-100 overflow-hidden  g-0'>
        <Col className="side-bar-col" lg={3} xs={3}>
          <div>
            <Stack direction="horizontal" className="mx-2 mt-2" gap={3}>
              <img src="./favicon.ico" style={{ width: "25%" }}></img>
              <div className='d-flex align-items-center justify-content-center py-4'><h3>GCAM Chat Bot</h3></div>
            </Stack>
            <ConfigSideNav />
          </div>

        </Col>
        <Col lg={9} xs={9}
          className="main-chat-col mt-3"
        >
          <MainContainer />
        </Col>
        <ToastContainer />
      </Row>

    </>
  )
}
