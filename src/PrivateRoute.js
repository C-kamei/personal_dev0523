import React from 'react';
import { Route, Navigate } from 'react-router-dom';

//認証が必要なページにアクセスするためのコンポーネント
//認証情報がある場合はコンポーネントを表示し、ない場合はログインページにリダイレクトする
function PrivateRoute({ auth, component: Component }) {
  return auth ? <Component auth={auth} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
