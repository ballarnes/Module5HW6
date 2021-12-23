import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Col, Image, Row, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import { OwnUserProfilePageStore } from '../../stores/pages/profile'
import AuthStore from '../../stores/AuthStore'


const OwnUserProfilePage = observer(() => {
  const store = useInjection<OwnUserProfilePageStore>(ownTypes.ownUserProfilePageStore);
  const auth = useInjection<AuthStore>(ownTypes.authStore);
  const { t } = useTranslation(['profilePage']);
  
  useEffect(() => {
    const getUser = async () => {
      await store.init(String(auth.id));
    }
    getUser()
  }, [store, auth.id])
  
  return (
    <Container className="pt-4 pb-4 mt-5">
      {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
           <h1 className='mb-4' >{t('own_user')}</h1>
            <Row>
              <Col sm='auto'>
                <Image src={store.user?.avatar} width={128} height={128} />
              </Col>
            <Col sm={4}>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>{t('user_info.email')}:</span> 
                  </Col>
                  <Col className="ml-2">
                      {store.user?.email}
                  </Col>
                </Row>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold'}}>{t('user_info.first_name')}:</span> 
                  </Col>
                  <Col className="ml-2">
                    {store.user?.name}
                  </Col>
                </Row>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold'}}>{t('user_info.last_name')}:</span> 
                  </Col>
                  <Col className="ml-2">
                    {store.user?.lastname}
                  </Col>
                </Row>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold'}}>{t('user_info.registeredDate')}:</span> 
                  </Col>
                  <Col className="ml-2">
                    {store.user?.date}
                  </Col>
                </Row>
            </Col>
            </Row>
          </>
        )}
    </Container>
  )
});

export default OwnUserProfilePage;
