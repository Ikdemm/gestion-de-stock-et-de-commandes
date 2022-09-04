import { createContext, useState } from 'react';



export const LoginContext = createContext(

    {
        seConnecter: () => { },
        estConnecte: false,
        seDeconnecter: () => { },
        verifierConnecte: () => { }

    }
)

function LoginContextProvider(props) {
    const [isLogged, setIsLogged] = useState(false);
        //let token = localStorage.getItem('token');
    function seConnecter(user) {
        return fetch('/api/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        // if (token)
       // localStorage.setItem('token', token);
    }



    function seDeconnecter() {
        localStorage.removeItem('token');
        setIsLogged(false)
    }

    function verifyConnecte() {
        let token = localStorage.getItem('token');
        if (token)
            setIsLogged(true);
        else
            setIsLogged(false);
    }

    const context = {
        estConnecte: isLogged,
        seConnecter: seConnecter,
        seDeconnecter: seDeconnecter,
        verifierConnecte: verifyConnecte,
    }


    return <LoginContext.Provider value={context}>
        {props.children}
    </LoginContext.Provider>
}

export default LoginContextProvider;