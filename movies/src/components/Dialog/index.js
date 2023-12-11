import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

const AuthDialog = ({ open, onClose, isRegistration, setUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthentication = async () => {
        if (isRegistration) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Register Success！');
            } catch (error) {
                alert('Register Fail: ' + error.message);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login Success！');
                // 在成功登录后触发 setUserEmail 回调函数
                const e = `Hi `+ email
                setUserEmail(e);
            } catch (error) {
                alert('Login Fail: ' + error.message);
            }
            onClose(); // 关闭对话框
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isRegistration ? 'User Register' : 'User Login'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {isRegistration && (
                    <Button onClick={() => onClose(false)}>Sign In</Button>
                )}
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAuthentication} color="primary">
                    {isRegistration ? 'Register' : 'Login'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthDialog;