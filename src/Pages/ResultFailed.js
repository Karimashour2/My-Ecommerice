import { Button, Result, Typography } from 'antd';
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Paragraph, Text } = Typography;

const ResultFailed = () => {
  const navigate = useNavigate()
  return (
    <Result
    style={{display: 'flex',flexDirection:'column',justifyContent:'center',height:'100vh'}}
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button onClick={()=> navigate('/shop/checkout')} type="primary" key="console">
        Go Back
      </Button>,
      <Button key="buy" onClick={()=> navigate('/shop/products')}>Buy Again</Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The Information you submitted has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Check your cart <a href='/shop/cart'>Cart &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Check your account payment info. <a href='/shop/user'>Payment info &gt;</a>
      </Paragraph>
    </div>
  </Result>
  );
}

export default ResultFailed;
