import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner, Accordion, Alert, Fade, Button, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import BasketItem from '../../components/BasketItem'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import BasketPageStore  from '../../stores/pages/BasketPageStore'
import { useNavigate } from "react-router-dom";


const BasketPage = observer(() => {
  const store = useInjection<BasketPageStore>(ownTypes.basketPageStore);
  const { t } = useTranslation(['basketPage']);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getItem = async () => {
      await store.init();
    }
    getItem()
  }, [store])

  return (
    <Container className='p-5 mt-5'>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <>
            <h1 className='mb-4 text-center'>{t('title')}</h1>
            {store.quantity === 0 ?  
                <Alert variant="warning" transition={Fade}>
                <Alert.Heading>{t('empty')}</Alert.Heading>
                <hr />
                <div className="d-grid gap-2">
                <Button variant="warning" type="submit" onClick={() => navigate('/items?page=1')}>
                {store.isLoading ? (
                    <Spinner animation="border" size="sm" />
                ) : (
                    `${t('catalog')}`
                )}
                </Button>
                </div>
                </Alert>
              : 
              <>
              {store.items?.map((item, key) => (
                <Accordion key={key} defaultActiveKey="0" flush style={{ backgroundColor: '#E7F1FF' }}>
                  <BasketItem {...item} />
                </Accordion>
              ))}
              <Badge className='mt-2' bg="primary"><h5>{store.quantity !== 0 &&
              <Row>
                <Col>
                <h5 className='mt-2 text-center'>{t('quantity')}: {store.quantity}</h5>
                </Col>
                <Col>
                <h5 className='mt-2 text-center'>{t('totalPrice')}: {store.totalPrice} {store.currency}</h5>
                </Col>
              </Row>
              }</h5></Badge>
              <div className="d-grid gap-2 mt-5">
              <Button variant="outline-success" type="submit" size='lg' onClick={()=> { store.clearBasket(); }}>
                {store.isLoading ? (
                  <Spinner animation="grow" size="sm" />
                ) : (
                  `${t('order')}`
                )}
              </Button>
              </div>
              </>
            }

            {/* {store.items?.map((item, key) => (
              <Accordion key={key} defaultActiveKey="0" flush>
                <BasketItem item={item} />
              </Accordion>
            ))} */}
          </>
        )}
      </Row>
    </Container>
  )
});

export default BasketPage;