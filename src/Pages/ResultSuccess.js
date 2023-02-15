import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultSuccess = () => {
  const navigate = useNavigate()
  return (
    <Result
    style={{display: 'flex',flexDirection:'column',justifyContent:'center',height:'100vh'}}
    status="success"
    title="Successfully Purchased"
    subTitle="Order number: 2017182818828182881 Order will be delivered in 2-5 Days, Thank you for your trust."
    extra={[
      <Button onClick={()=> navigate('/shop/products')} type="primary" key="console">
        Go HomePage
      </Button>,
    ]}
  />
  );
}

export default ResultSuccess;
