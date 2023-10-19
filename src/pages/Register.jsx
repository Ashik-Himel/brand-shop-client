import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import googleIcon from "../assets/images/google.png";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { UserContext } from "../ContextProvider";
import toast from "react-hot-toast";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const {setUser} = useContext(UserContext);

  const handleRegister = e => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        updateProfile(auth.currentUser, {displayName, photoURL})
          .then(() => {
            setUser(result.user);
            e.target.reset();
            toast.success('Registration Successful !!!');
          })
          .catch(error => {
            toast.error(error.code);
          })
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") setErrorMsg("Already have an account with this email!")
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
        toast.success('Login Successful !!!');
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
        <title>Register - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-primary bg-opacity-10 dark:bg-secondary dark:bg-opacity-10 dark:text-white p-6 rounded-md max-w-[600px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
                <div className="w-full">
                  <label className="block font-medium mb-2" htmlFor="name">Name</label>
                  <input className="input border-gray-300 w-full" type="name" name="name" id="name" placeholder="Enter your name" required />
                </div>
                <div className="w-full">
                  <label className="block font-medium mb-2" htmlFor="photo">Photo URL</label>
                  <input className="input border-gray-300 w-full" type="text" name="photo" id="photo" placeholder="Enter your photo URL" required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
                <div className="w-full">
                  <label className="block font-medium mb-2" htmlFor="email">Email Address</label>
                  <input className="input border-gray-300 w-full" type="email" name="email" id="email" placeholder="Enter email address" required />
                </div>
                <div className="w-full">
                  <label className="block font-medium mb-2" htmlFor="password">Password</label>
                  <div className="relative">
                    <input className="input border-gray-300 w-full" onChange={handlePassValidation} type={showPass ? "text" : "password"} name="password" id="password" placeholder="Enter your password" required />
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)}>
                      {
                        showPass ? <AiFillEyeInvisible /> : <AiFillEye />
                      }
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-red-600 font-medium mt-2">{errorMsg}</p>
              <input className="btn btn-primary btn-block mt-4 dark:disabled:bg-primary dark:disabled:text-white dark:disabled:bg-opacity-20" type="submit" value="Register" disabled={submitDisabled ? 'disabled' : ''} />
            </form>

            <p className="font-medium mt-4">Already have an account? <Link to='/login' className="text-primary" onClick={() => scrollTo(0, 0)}>Login</Link> here.</p>

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

export default Register;