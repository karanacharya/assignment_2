// // import React from 'react'
// // import AuthContext from './authContext'
// // import { useState } from 'react'

// // const AuthContext = (props) => {
      
       
// //   const [user, setUser] = useState(null);
// //   const [error, setError] = useState(null);

// //   const login = async (userData) => {
// //     try {
// //       const response = await axios.post("http://localhost:7000/api/auth/v1/login", userData);
// //       const { token, user } = response.data;
// //       localStorage.setItem("token", token);
// //       setUser(user);
// //       setError(null);
// //       return true;
// //     } catch (err) {
// //       setError(err.response?.data?.message || "An error occurred during login");
// //       return false;
// //     }
// //   };

// //   const value = {
// //     user,
// //     error,
// //     login,
// //   };



// //   return (
// //     <AuthContext.Provider value={value}>
// //         {props.children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export default AuthContext
// import React from 'react'
// import AuthContext from './authContext'
// import { useState } from 'react'

// const AuthState = () => {

//     const handleport =()=>{
          
//     }
    
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AuthState
