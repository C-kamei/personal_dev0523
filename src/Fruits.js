import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Table  } from 'react-bootstrap';

function Fruits({ auth }) {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchaseQuantities, setPurchaseQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFruitData();
  }, []);


  //データの取得
  const fetchFruitData = () => {
    fetch('http://localhost:8080/fruits', {
      headers: {
        'Authorization': auth
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const newQuantities = {};
          cart.forEach(item => {
            newQuantities[item.id] = item.quantity;
          });
          setData(data);
          setPurchaseQuantities(newQuantities);
        } else {
          console.error('Data is not an array:', data);
          setData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching fruit data:', error);
        setData([]);
      });
  };

  //カートに追加
  const addToCart = (fruit) => {
    const existingItem = cart.find(item => item.id === fruit.id);
    const quantity = purchaseQuantities[fruit.id] || 1;

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === fruit.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...fruit, quantity }]);
    }

    setPurchaseQuantities({ ...purchaseQuantities, [fruit.id]: 0 });
  };

  //カートから削除
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    const newQuantities = { ...purchaseQuantities };
    delete newQuantities[id];
    setPurchaseQuantities(newQuantities);
  };

  //合計金額の計算
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  //購入確定
  const handlePurchase = () => {
    if (window.confirm("本当に購入しますか？")) {
      const purchaseRequests = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      fetch('http://localhost:8080/fruits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify(purchaseRequests)
      })
      .then(response => response.text())
      .then(message => {
        navigate('/thank-you', { state: { cart, total: calculateTotal() } });
        setCart([]);
        setPurchaseQuantities({});
        fetchFruitData();
      })
      .catch(error => {
        console.error('Error purchasing fruits:', error);
      });
    }
  };

  //表示
  return (
    <Container>
      <h3>商品一覧</h3>
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>商品コード:</strong> {item.id}<br />
                  <strong>単価:</strong> {item.price} 円<br />
                  <strong>在庫数:</strong> {item.stock}
                </Card.Text>
                <Form.Group className="mb-3">
                  <Form.Label>購入数</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={purchaseQuantities[item.id] || 1} 
                    onChange={(e) => setPurchaseQuantities({ ...purchaseQuantities, [item.id]: parseInt(e.target.value) || 1 })}
                    min="1" 
                    max={item.stock} 
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => addToCart(item)}>カートに追加</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>カート</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>購入数</th>
            <th>小計</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td><Button variant="danger" onClick={() => removeFromCart(item.id)}>削除</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>合計金額: {calculateTotal()}円</h3>
      <Button variant="primary" onClick={handlePurchase}>購入確定</Button>
    </Container>
  );
}

export default Fruits;
