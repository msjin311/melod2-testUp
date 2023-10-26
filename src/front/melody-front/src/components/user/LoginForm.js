"use client"

import "./LoginForm.css";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";

import Link from "next/link";

const LoginForm = () => {
    const { userState, userDispatch } = useContext(UserContext);
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');

    const loginRequest = {
        accountId,
        password,
    }

    useEffect(() => {
        console.log("isAuthenticated : " + userState.isAuthenticated);

    }, [userState.isAuthenticated]);

    useEffect(() => {
        console.log("user : " + userState.user);

    }, [userState.user]);

    //탈퇴 회원 확인 함수정의
    const getUserInfo = async (accountId) => {
        try{
            const response = await fetch(`/api/userInfo?accountId=${accountId}`);
            console.log(accountId);
            if(response.ok) {
                return await response.json();
            }else {
                return null;
            }
        }catch (error){
            console.log('error : ', error);
            return null;
        }
    }

    const handleLogin = async () => {
        try {
            // 탈퇴 회원 확인
            const userInfo = await getUserInfo(accountId);
            if(userInfo !== null){
                if(userInfo.isWithdraw === 1){
                    alert('탈퇴한 회원입니다.');
                    console.log(userInfo)
                }else{
                    // Perform an HTTP POST request to your Spring Boot login endpoint
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginRequest), // Replace with actual user input
                    });

                    if (response.ok) {
                        // Login successful
                        const userData = await response.json();
                        console.log(userData);
                        userDispatch({ type: 'LOGIN', payload: userData });
                        console.log(userState.isAuthenticated);
                    } else {
                        // Handle login error (e.g., show an error message)
                        console.error('Login failed');
                    }
                }
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred', error);
        }
    };

    const handleLogout = () => {
        // Replace this with your logout logic
        userDispatch({ type: 'LOGOUT' });
    };


    return (
        <div className="py-8">
            {userState.isAuthenticated ? (
                <>
                    <p>Welcome, {userState.user.name}!</p>
                    <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
                    <Link href="../UserEdit">MyPage</Link>
                </>
            ) : (
                <>
                    <div className="login-Inner">
                        <h1>Login</h1>
                        <div className="input-inner">
                            <span>AccountId</span>
                            <input type="text" placeholder="AccountId" onChange={(e) => setAccountId(e.target.value)}/>
                        </div>

                        <div className="input-inner">
                            <span>PassWord</span>
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="loginSaveBtn">
                            <div>
                                <label><input type="checkbox"/><span>아이디 저장</span></label>
                                <a href="#">ID/PW 찾기</a>
                            </div>
                        </div>
                        <div className="loginBtn">
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginForm;
