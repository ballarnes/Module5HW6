import { observer } from 'mobx-react';
import React, { Suspense } from 'react'
import { Alert, Button, Col, Container, Fade, Form, Row, Spinner } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import LoginPageStore from '../../stores/pages/LoginPageStore';
import { useTranslation } from 'react-i18next';

const LoginPage = observer(() => {
  const store = useInjection<LoginPageStore>(ownTypes.loginPageStore);
  const { t } = useTranslation(['login']);

  return (
    <Suspense fallback={<Spinner animation="grow" />}>
    <Container className='p-5 mt-5'>
      <h1 className='mb-4 text-center'>{t('login')}</h1>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form onSubmit={(ev)=>{ ev.preventDefault();
                                  store.login();
                                }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('placeholder.email')}
                value={store.email}
                onChange={(ev)=> {store.changeEmail(ev.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.password')}
                value={store.password}
                onChange={(ev)=> {store.changePassword(ev.target.value)}}
              />
            </Form.Group>

            <div className="d-grid gap-2">
            <Button variant="outline-success" type="submit">
              {store.isLoading ? (
                <Spinner animation="grow" size="sm" />
              ) : (
                `${t('submit')}`
              )}
            </Button>
            </div>

            <a href='/registration'><p className='mt-5 text-center'>{t('register')}</p></a>

            {!!store.error && (
              <Alert variant="danger" transition={Fade} className="mt-5">
              <Alert.Heading>{t('error')}</Alert.Heading>
              <hr />
              <p className="mb-0">
              {store.error}
              </p>
              </Alert>
            )}

            {!!store.token && <Alert variant="success" transition={Fade} className="mt-5">
              <Alert.Heading>{t('success')}</Alert.Heading>
              <hr />
              <p className="mb-0">
                Your token is: {store.token}
              </p>
            </Alert>}

          </Form>
        </Col>
      </Row>
    </Container>
    </Suspense>
  )
});

export default LoginPage
