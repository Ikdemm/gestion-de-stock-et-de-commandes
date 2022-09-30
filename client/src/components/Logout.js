import axios from '../Services/instance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await axios.get('/logout', {
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            if(res.status === 401 || !res ){
                window.alert("Veuillez se déconnecter ultérieurement");
            }else
            {
                
                navigate('/login');
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        logout();
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default Logout;