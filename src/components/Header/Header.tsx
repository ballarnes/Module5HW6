import { observer } from 'mobx-react';
import React from 'react'
import { Navbar, Nav, Container, Image, Button, NavDropdown, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthStore from '../../stores/AuthStore';
import { useNavigate } from "react-router-dom";
import BasketPageStore  from '../../stores/pages/BasketPageStore'

const Header = observer(() => {
  const { t } = useTranslation(['header']);
  const store = useInjection<AuthStore>(ownTypes.authStore);
  const basketStore = useInjection<BasketPageStore>(ownTypes.basketPageStore);
  const navigate = useNavigate();

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      {/* <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand onClick={() => navigate('/')}>
              <Image src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-128.png"   width="30" height="30" rounded />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Button variant="dark" className='mx-2' onClick={() => navigate('/')}>{t('home')}</Button>
              {store.isAuthorized && <Button variant="dark" className='mx-2'  onClick={() => navigate('/profile/me')}>{t('profile')}</Button> }
              <Button variant="dark" className='mx-2'  onClick={() => navigate('/users?page=1')}>{t('users')}</Button>
            </Nav>
            <Nav>
               {store.isAuthorized && <Button onClick={()=> {
                  store.logout();
                  navigate('/', { replace: true});
                }}  >{t('logout')}</Button> }
            </Nav>
          </Container>
        </Navbar> */}
        <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
    <Navbar.Brand onClick={() => navigate('/')}>
      <Image src="https://cpuninja.com/wp-content/uploads/2021/06/icon-512.png" width="40" height="40" rounded />
    </Navbar.Brand>
    <Nav className="me-auto">
      <Button variant="dark" className='mx-2' onClick={() => navigate('/')}>{t('home')}</Button>
      <Button variant="dark" className='mx-2'  onClick={() => navigate('/items?page=1')}>{t('catalog')}</Button>
    </Nav>
    <Nav>
    <Button variant="dark" className='mx-2'  onClick={() => navigate('/basket')}><Image src="http://s1.iconbird.com/ico/0512/SuperMonoBasic/file1337278241.png" style={{width: '30px'}} rounded />
      {!!basketStore.quantity && <Badge pill bg="light" text="dark">
        {basketStore.quantity}
      </Badge>}
    </Button>
    <Button variant="dark" className='mx-2'>
        <NavDropdown className='p-1' title={t('personalArea')} id="basic-nav-dropdown">
        {!store.isAuthorized && <NavDropdown.Item onClick={() => navigate('login')}>{t('login')}</NavDropdown.Item>}
        {!store.isAuthorized && <NavDropdown.Item onClick={() => navigate('registration')}>{t('registration')}</NavDropdown.Item>}
        {store.isAuthorized && <NavDropdown.Item onClick={() => navigate('/profile/me')}>{t('profile')}</NavDropdown.Item>}
        {store.isAuthorized && <NavDropdown.Divider />}
        {store.isAuthorized && <NavDropdown.Item onClick={()=> { store.logout(); navigate('/', { replace: true}); }}>{t('logout')}</NavDropdown.Item>}
      </NavDropdown>
      </Button> 
    </Nav>
    
  </Container>
</Navbar>
    </Container>
  )
});

export default Header
