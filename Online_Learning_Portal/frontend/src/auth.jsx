import{createContext,useContext,useEffect,useState}from"react";import api from"./api";
const C=createContext(null);
export function AuthProvider({children}){
 const[user,setUser]=useState(()=>JSON.parse(localStorage.getItem("portal_user")||"null"));
 const[loading,setLoading]=useState(true);
 useEffect(()=>{async function check(){if(localStorage.getItem("portal_token")){try{const r=await api.get("/auth/me");setUser(r.data.user);localStorage.setItem("portal_user",JSON.stringify(r.data.user));}catch{logout();}}setLoading(false);}check();},[]);
 function login(data){localStorage.setItem("portal_token",data.token);localStorage.setItem("portal_user",JSON.stringify(data.user));setUser(data.user);}
 function logout(){localStorage.removeItem("portal_token");localStorage.removeItem("portal_user");setUser(null);}
 return <C.Provider value={{user,loading,login,logout}}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
