import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Fruits from './Fruits';
import ThankYou from './ThankYou';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  const [auth, setAuth] = useState(null);

  // ログイン状態によって表示するコンポーネントを切り替える
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ECサイト</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">ホーム</Nav.Link>
            <Nav.Link href="/login">ログイン</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {/* ルーティング情報*/}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/" element={<PrivateRoute auth={auth} component={Fruits} />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
