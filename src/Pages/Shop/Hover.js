import { Button } from 'antd';
import React from 'react';

const Hover = ({product,i,setProductsInCart}) => {

  return (
    <div className="hover" style={
      {backgroundColor: 'rgba(0,0,0,0.5)',
      width:'100%',
      height: '200px',
      position: 'absolute',
      top: '0',
      left: '0',
      borderRadius:'8px',
      
      }}>
      <Button type="primary"
              block style={{position: 'absolute',
                            bottom: '0', borderRadius:'0',}}
              onClick={(e)=> {
                e.stopPropagation();
                setProductsInCart((prev)=> [...prev, {...product, quantity: 1}]);
              }}              
      >
      Add To Cart
    </Button>
    </div>
  );
}

export default Hover;
