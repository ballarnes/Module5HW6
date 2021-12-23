import { observer } from 'mobx-react'
import React, { Suspense } from 'react'
import { Container, Spinner } from 'react-bootstrap'
// import { useInjection } from '../../ioc/ioc.react'
// import ownTypes from '../../ioc/ownTypes'
// import HomePageStore from '../../stores/pages/HomePageStore'
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel'


// const User = React.lazy(() => import('../../components/User'))
// const Users = React.lazy(() => import('../../components/Users'))
// const Login = React.lazy(() => import('../../components/Login'))

const HomePage = observer(() => {
  // const store = useInjection<HomePageStore>(ownTypes.homePageStore);
  const { t } = useTranslation(['homePage']);
  
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <Container className="pt-4 pb-4 mt-5">
      <Carousel variant="dark" keyboard={true}>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/9T7HGt6.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>{t('slides.firstSlide.label')}</h5>
            <p>{t('slides.firstSlide.description')}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/h59E6ul.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>{t('slides.secondSlide.label')}</h5>
            <p>{t('slides.secondSlide.description')}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/9ibABgs.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>{t('slides.thirdSlide.label')}</h5>
            <p>{t('slides.thirdSlide.description')}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Container>
    </Suspense>
  )
});

export default HomePage;
