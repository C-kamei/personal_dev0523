import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const authString = `Basic ${btoa(`${username}:${password}`)}`;
    // ここで認証処理を行う（例: APIリクエストを送信して認証情報を検証する）

    // ダミーの認証処理（実際の認証処理に置き換える）
    if (username === 'user' && password === 'password') {
      setAuth(authString);
      navigate('/fruits');
    } else {
      alert('ログインに失敗しました。正しいユーザー名とパスワードを入力してください。');
    }
  };

  // ログインフォームを表示
  return (
    <div>
      <h2>ログイン</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>ユーザー名:</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>パスワード:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          ログイン
        </Button>
      </Form>
    </div>
  );
}

export default Login;
