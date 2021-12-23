import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Col, Image, Row, Spinner, Tabs, Tab, ListGroup, Button } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import ItemPageStore  from '../../stores/pages/ItemPageStore'
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import BasketPageStore  from '../../stores/pages/BasketPageStore'


const ItemPage = observer(() => {
  const store = useInjection<ItemPageStore>(ownTypes.itemPageStore);
  const basketStore = useInjection<BasketPageStore>(ownTypes.basketPageStore);
  const { t } = useTranslation(['itemPage']);
  const { id }  = useParams();

  useEffect(() => {
    const getItem = async () => {
      await store.init(id);
    }
    getItem()
  }, [store, id])
  
  return ( <Container className="pt-4 pb-4 justify-content-center mt-5">
  {store.isLoading ? (
      <Spinner animation="grow" />
    ) : (
      <>
       <h1 className='mb-4 text-center' >{store.item?.brand} {store.item?.name}</h1>
       <Container className='p-3'>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="profile" title={t('allAboutProduct')}>
            <Row className="justify-content-center">
              <Col sm={6}>
                <Image src={store.item?.image} style={{width: '80%', height: '85%'}}/>
              </Col>
              <Col sm={6} style={{ height: '50%'}}>
              <ListGroup variant="flush">
                <ListGroup.Item action >{t('socket')}: {store.item?.details.socket}</ListGroup.Item>
                <ListGroup.Item action >{t('clockFrequency')}: {store.item?.details.clockFrequency}</ListGroup.Item>
                <ListGroup.Item action >{t('maximumClockFrequency')}: {store.item?.details.maximumClockFrequency}</ListGroup.Item>
                <ListGroup.Item action >{t('memoryType')}: {store.item?.details.memoryType}</ListGroup.Item>
                <ListGroup.Item action >{t('numberOfCores')}: {store.item?.details.numberOfCores}</ListGroup.Item>
                <ListGroup.Item action >{t('numberOfThreads')}: {store.item?.details.numberOfThreads}</ListGroup.Item>
              </ListGroup>
              <div className="d-grid gap-2 pt-2">
                <Button variant="outline-secondary" type="submit" onClick={() => { basketStore.addItem(store.item!);}}>
                {t('basket')}
                </Button>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="video" title={t('video')} className="text-center">
            <Row>
              <Col>
                <iframe width="1024" height="600" src={store.item?.details.videoLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
        {/* <Row>
          <Col sm='auto'>
            <Image src={store.item?.image} width={128} height={128} />
          </Col>
        <Col sm={4}>
            <Row sm={4}>
              <Col>
                <span style={{ fontWeight: 'bold' }}>{t('user_info.email')}:</span> 
              </Col>
              <Col className="ml-2">
                  {store.item?.brand}
              </Col>
            </Row>
            <Row sm={4}>
              <Col>
                <span style={{ fontWeight: 'bold'}}>{t('user_info.first_name')}:</span> 
              </Col>
              <Col className="ml-2">
                {store.item?.name}
              </Col>
            </Row>
            <Row sm={4}>
              <Col>
                <span style={{ fontWeight: 'bold'}}>{t('user_info.last_name')}:</span> 
              </Col>
              <Col className="ml-2">
                {store.item?.price}
              </Col>
            </Row>
            <Row sm={4}>
              <Col>
                <span style={{ fontWeight: 'bold'}}>{t('user_info.registeredDate')}:</span> 
              </Col>
              <Col className="ml-2">
                {store.item?.currency}
              </Col>
            </Row>
        </Col>
        </Row> */}
      </>
    )}
</Container>
  )
});

export default ItemPage;
