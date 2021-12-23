import { observer } from 'mobx-react';
import React, { Suspense } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import RegistrationPageStore from '../../stores/pages/RegistrationPageStore';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const RegistrationPage = observer(() => {
  const store = useInjection<RegistrationPageStore>(ownTypes.registrationPageStore);
  const { t } = useTranslation(['registration']);

  return (
    <Suspense fallback={<Spinner animation="grow" />}>
    <Container className='p-5 mt-5'>
      <h1 className='mb-4 text-center'>{t('registration')}</h1>
      <Form onSubmit={(ev)=>{ ev.preventDefault();
                                  store.register();
                                }}>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t('placeholder.firstName')}
                  className="mb-3"
                >
                  <Form.Control
                  type="text"
                  placeholder={t('placeholder.firstName')}
                  value={store.name}
                  onChange={(ev)=> {store.changeName(ev.target.value)}} />
                </FloatingLabel>
          </Col>
          <Col lg={4} md={6} xs>
              <FloatingLabel
                  controlId="floatingInput"
                  label={t('placeholder.lastName')}
                  className="mb-3"
                >
                  <Form.Control
                  type="text"
                  placeholder={t('placeholder.lastName')}
                  value={store.lastname}
                  onChange={(ev)=> {store.changeLastName(ev.target.value)}}
                />
              </FloatingLabel>
          </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} md={12} xs>
            <FloatingLabel
              controlId="floatingInput"
              label={t('placeholder.email')}
              className="mb-3"
            >
              <Form.Control
              type="email"
              placeholder={t('placeholder.email')}
              value={store.email}
              onChange={(ev)=> {store.changeEmail(ev.target.value)}} />
            </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center">
          <Col lg={4} md={6} xs>
                <FloatingLabel
                  controlId="floatingPassword"
                  label={t('placeholder.password')}
                  className="mb-3"
                >
                  <Form.Control
                  type="password"
                  placeholder={t('placeholder.password')}
                  value={store.password}
                  onChange={(ev)=> {store.changePassword(ev.target.value)}} />
                </FloatingLabel>
          </Col>
          <Col lg={4} md={6} xs>
              <FloatingLabel
                  controlId="floatingPassword"
                  label={t('passwordConfirm')}
                  className="mb-3"
                >
                  <Form.Control
                  type="password"
                  placeholder={t('passwordConfirm')}
                  value={store.confirm}
                  onChange={(ev)=> {store.changeConfirmPassword(ev.target.value)}}
                />
              </FloatingLabel>
          </Col>
          </Row>
            {/* <Col lg={4} md={6} xs>
            <Form onSubmit={(ev)=>{ ev.preventDefault();
                                  store.register();
                                }}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.password')}
                value={store.password}
                onChange={(ev)=> {store.changePassword(ev.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.passwordConfirm')}
                value={store.confirm}
                onChange={(ev)=> {store.changeConfirmPassword(ev.target.value)}}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {store.isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `${t('submit')}`
              )}
            </Button>

            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{t('success', { token: store.token, id: store.id } )}</p>
            )}
          </Form>
        </Col>
      </Row> */}
      <Row className="justify-content-center">
      <Col lg={4} md={6} xs>
        {!!store.error && (
              <p style={{ color: 'red', fontSize: 14 }}>{store.error}</p>
        )}
            <div className="d-grid gap-2">
            <Button variant="outline-success" type="submit">
              {store.isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `${t('submit')}`
              )}
            </Button>
            </div>
            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{t('success', { token: store.token, id: store.id } )}</p>
            )}
            </Col>
      </Row>
            </Form>
    </Container>
    </Suspense>
  )
});

export default RegistrationPage
