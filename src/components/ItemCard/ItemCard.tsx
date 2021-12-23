import { observer } from 'mobx-react';
import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import BasketPageStore  from '../../stores/pages/BasketPageStore'
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from "../../ioc/ownTypes";
import type { Item } from "../../models/Item";

const ItemCard = observer((props: Item) => {
  const basketStore = useInjection<BasketPageStore>(ownTypes.basketPageStore);
  const navigate = useNavigate();
  const { t } = useTranslation(['item']);
  
  if (!props) {
    return null
  }
  const { id, brand, name, price, currency, image, details } = props

  return (
    <Card style={{border: 0, height: '35rem', backgroundColor: '#E7F1FF'}} className='shadow'>
      <Card.Title className='justify-content-center pt-1 text-center' style={{overflow: 'ellipsis'}}>{brand} {name}</Card.Title>
      <div><Card.Img className='pl-3 ml-3 mx-auto d-block' variant="top" src={image} style={{width: '100%', height: '300px', backgroundColor: '#E7F1FF'}} onClick={() => navigate(`/items/${id}`)}/></div>
      <Card.Body style={{ height: '35rem', backgroundColor: '#E7F1FF'}}>
        <Card.Text className='p-3 text-white' style={{fontWeight: 'bold', textAlign: 'right', backgroundColor: '#A6CBFF', fontSize: '20px'}}>
          {price} {currency}
        </Card.Text>
        <ListGroup variant="flush" style={{backgroundColor: '#E7F1FF'}}>
          <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('socket')}: {details.socket}</ListGroup.Item>
          <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('cores')}: {details.numberOfCores}</ListGroup.Item>
          <ListGroup.Item style={{backgroundColor: '#E7F1FF'}}>{t('threads')}: {details.numberOfThreads}</ListGroup.Item>
        </ListGroup>
        <div className="d-grid gap-2 pt-2">
            <Button variant="outline-secondary" type="submit" onClick={() => basketStore.addItem(props)}>
            {t('basket')}
            </Button>
            </div>
      </Card.Body>
    </Card>
  )
});

export default ItemCard