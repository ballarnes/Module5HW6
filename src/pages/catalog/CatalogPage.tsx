import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/Pagination'
import ItemCard from '../../components/ItemCard'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import CatalogPageStore  from '../../stores/pages/CatalogPageStore'
import { useNavigate } from "react-router-dom";

const CatalogPage = observer(() => {
  const store = useInjection<CatalogPageStore>(ownTypes.catalogPageStore);
  const { t } = useTranslation(['catalogPage']);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getItem = async () => {
      await store.init();
    }
    getItem()
  }, [store, store.currentPage])

  return (
    <Container className='p-5 mt-5'>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <>
            <h1 className='mb-4 text-center'>{t('title')}</h1>
            {store.items?.map((item, key) => (
              <Col key={key} sm={7} md={6} lg={5} xl={3} className="mb-5 mt-5">
                <ItemCard {...item} />
              </Col>
            ))}
          </>
        )}

      </Row>
      <Pagination total={store.totalPages} active={store.currentPage} onChange={(val) => { 
          store.changePage(val);
          navigate(`/items?page=${val}`, {replace: true}); 
        }}/>
    </Container>
  )
});

export default CatalogPage;
