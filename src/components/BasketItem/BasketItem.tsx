import { observer } from 'mobx-react';
import React from 'react'
import { Accordion, Button, Col, ListGroup, Row, Image } from 'react-bootstrap'
import { Item } from '../../models/Item';
import ownTypes from '../../ioc/ownTypes'
import { useTranslation } from 'react-i18next'
import BasketPageStore  from '../../stores/pages/BasketPageStore'
import { useInjection } from '../../ioc/ioc.react';

const BasketItem = observer((props: Item) => {
  const basketStore = useInjection<BasketPageStore>(ownTypes.basketPageStore);
  const { t } = useTranslation(['item']);
  
  if (!props) {
    return null
  }
  const { brand, name, price, currency, image, details } = props

  return (
      <>
        <Accordion.Item eventKey="0">
            <Accordion.Header>{brand} {name}</Accordion.Header>
            <Accordion.Body>
              <Row className="justify-content-center">
                  <Col>
                  <ListGroup variant="flush" style={{backgroundColor: '#E7F1FF'}}>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('socket')}: {details.socket}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('cores')}: {details.numberOfCores}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('threads')}: {details.numberOfThreads}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('clockFrequency')}: {details.clockFrequency}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('maximumClockFrequency')}: {details.maximumClockFrequency}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('memoryType')}: {details.memoryType}</ListGroup.Item>
                    <ListGroup.Item style={{fontWeight: 'bold', textAlign: 'right', backgroundColor: '#E7F1FF', fontSize: '20px'}}>{t('price')}: {price} {currency}</ListGroup.Item>
                    <ListGroup.Item className="justify-content-center">
                    <div className="d-grid gap-2">
                    <Button variant="outline-danger" type="submit" onClick={() => basketStore.removeItem(props)}>
                      {t('remove')}
                    </Button>
                    </div>
                    </ListGroup.Item>
                  </ListGroup>
                  </Col>
                  <Col>
                  <div><Image className='pl-3 ml-3 mx-auto d-block' src={image} style={{width: '50%', height: '300px'}} rounded/></div>
                  </Col>
              </Row>
            </Accordion.Body>
        </Accordion.Item>
    </>
    // <Card style={{border: 0, width: '15rem', height: '25rem'}}>
    //   <Card.Title className='justify-content-center'>{brand} {name}</Card.Title>
    //   <Card.Img variant="top" src={image} onClick={() => navigate(`/items/${id}`)}/>
    //   <Card.Body style={{width: '15rem'}}>
    //     <Card.Text style={{fontWeight: 'bold'}}>
    //       {price} {currency}
    //     </Card.Text>
    //     <ListGroup variant="flush">
    //       <ListGroup.Item>Socket: {details.socket}</ListGroup.Item>
    //       <ListGroup.Item>Cores: {details.numberOfCores}</ListGroup.Item>
    //     </ListGroup>
    //   </Card.Body>
    // </Card>
  )
});

export default BasketItem