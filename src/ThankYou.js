import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Table, Container } from 'react-bootstrap';

function ThankYou() {
  const { state } = useLocation();
  const { cart, total } = state || { cart: [], total: 0 };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container>
      <h2>購入ありがとうございます。</h2>
      <h3>購入した商品:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>購入数</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>合計金額: {total}円</h3>
      <Button variant="primary" onClick={handleGoBack}>戻る</Button>
    </Container>
  );
}

export default ThankYou;
