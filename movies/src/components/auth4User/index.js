import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert('注册成功！');
        } catch (error) {
            alert('注册失败: ' + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert('登录成功！');
        } catch (error) {
            alert('登录失败: ' + error.message);
        }
    };

    return (
        <div>
            <h2>用户注册和登录</h2>
            <input
                type="email"
                placeholder="邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>注册</button>
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};

export default Auth;
