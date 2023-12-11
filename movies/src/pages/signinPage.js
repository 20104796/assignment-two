import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// 初始化 Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgyYgF1TGqqTqROwv_oVV4B9mQj_rHlKE",
    authDomain: "film-d5bc5.firebaseapp.com",
    projectId: "film-d5bc5",
    storageBucket: "film-d5bc5.appspot.com",
    messagingSenderId: "594346102482",
    appId: "1:594346102482:web:59d91da28353fe78cf270b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('注册成功！');
        } catch (error) {
            alert('注册失败: ' + error.message);
        }
    };

    return (
        <div>
            <h2>用户注册</h2>
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
        </div>
    );
};

export default RegistrationPage;
