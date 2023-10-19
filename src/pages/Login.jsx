import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import googleIcon from "../assets/images/google.png";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserContext } from "../ContextProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const {setUser} = useContext(UserContext);

  const handleLogIn = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        e.target.reset();
        toast.success('Login Successful !!!');
      })
      .catch(error => {
        if (error.code === "auth/invalid-login-credentials") setErrorMsg("Incorrect Email or Password!")
        else {
          toast.error(error.code);
        }
      })
  }
  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        const email = result.user.email;
        fetch(`https://brand-shop-server.vercel.app/users/${email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({email})
        })
          .then(res => res.json())
          .then(data => {
            if (data.acknowledged) {
              toast.success('Login Successful !!!');
            }
          })
      })
      .catch(error => {
        toast.error(error.code);
      })
  }
  const handlePassValidation = e => {
    setErrorMsg("");
    setSubmitDisabled(true)

    const password = e.target.value;
    if (password.length < 6) {
      return setErrorMsg("Password should have at least 6 characters!");
    }
    else if (!/[A-Z]/.test(password)) {
      return setErrorMsg("Password should contain uppercase letter!");
    }
    else if (!/[^A-Za-z0-9]/.test(password)) {
      return setErrorMsg("Password should contain special character!");
    }
    setErrorMsg("");
    setSubmitDisabled(false)
  }

  return (
    <main className="my-12">
      <Helmet>
        <title>Login - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-primary bg-opacity-10 dark:bg-secondary dark:bg-opacity-10 dark:text-white p-6 rounded-md max-w-[600px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Login</h2>
            <form onSubmit={handleLogIn}>
              <label className="block font-medium mb-2" htmlFor="email">Email Address</label>
              <input className="input border-gray-300 w-full mb-4" type="email" name="email" id="email" placeholder="Enter email address" required />

              <label className="block font-medium mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <input className="input border-gray-300 w-full" onChange={handlePassValidation} type={showPass ? "text" : "password"} name="password" id="password" placeholder="Enter your password" required />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)}>
                  {
                    showPass ? <AiFillEyeInvisible /> : <AiFillEye />
                  }
                </div>
              </div>

              <p className="text-red-600 font-medium mt-2">{errorMsg}</p>
              <input className="btn btn-primary btn-block mt-4 dark:disabled:bg-primary dark:disabled:text-white dark:disabled:bg-opacity-20" type="submit" value="Login" disabled={submitDisabled ? 'disabled' : ''} />
            </form>

            <p className="font-medium mt-4">Don&apos;t have an account? <Link to='/register' className="text-primary" onClick={() => scrollTo(0, 0)}>Register</Link> here.</p>

            <div className="flex justify-stretch items-center gap-6 my-6 w-4/5 mx-auto">
              <span className="h-[2px] bg-black flex-1"></span>
              <span className="text-[18px] font-medium">Or</span>
              <span className="h-[2px] bg-black flex-1"></span>
            </div>

            <button className="flex justify-center items-center gap-2 border-2 border-black px-4 py-2 rounded-full w-full font-medium" onClick={googleLogin}>
              <img className="w-6" src={googleIcon} alt="Google Icon" /> Login in with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;