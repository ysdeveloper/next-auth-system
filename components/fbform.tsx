import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {Auth} from '../firebase'



// =========== COMPONENT: CUSTOM INPUT =========== //
export function CustomInput(props) {
  // Initialize States Value
  const [input, setInput] = useState({
    name: '',
    error: false,
    errorMessage: '',
    showPass: false 
  });

  // Events
  const handleblur = (e) => {
    let val = e.target.value
    let type = e.target.type
    let pattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (val === '') {
        setInput(input => ({...input, error: true, errorMessage: "Field shouldn't be empty"}))
    } else if (val !== '' && type === "email") {
        pattern.test(val) ? setInput(input => ({...input, errorMessage : "email is valid", error : false})) : setInput(input => ({...input, errorMessage : "email is Invalid", error : true}))
    } else {
        setInput(input => ({...input, error: false}))
    }
  }

  const handleChange = (e) => {
    let val = e.target.value
    let type = e.target.type
    let pattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (type === "email") {
      pattern.test(val) ? setInput(input => ({...input, errorMessage : "email is valid", error : false})) : setInput(input => ({...input, errorMessage : "email is Invalid", error : true}))
    }
    props.onChange && props.onChange(e)
  }

  const handleEyeClick = () => setInput(input => ({...input, showPass: !input.showPass}))

  return (
    <div className={`input-wrapper ${props.className ? props.className : ''} ${input.error ? 'error' : ''}`}>
        {props.label && <label htmlFor={props.id} className="form-label h-6">{props.label}</label>}
        <input 
        id={props.id}
        type={props.eyeIcon ? input.showPass ? 'text' : props.type : props.type}
        required={props.required} 
        name={props.name} 
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={handleblur} />
        <span className="searchborder"></span>
        { props.eyeIcon && <i className={`${input.showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'} eye-icon`} onClick={handleEyeClick}></i> }
        <motion.span className='message' initial={{opacity: 0}} animate={input.error ? {opacity: 1} : {opacity: 0}}>{input.errorMessage}</motion.span>
    </div>
  );
}
// =========== =========== =========== =========== =========== //


// =========== COMPONENT: REGISTRATION FORM =========== //
export function RegistrationForm(props) {

  // Get Email and Password value from the input
  const [inputs, setInputs] = useState({
    name : '',
    submitBtn: false
  });

  const [user, setUser] = useState('');

  useEffect(() => {
    Auth.onAuthStateChanged(user => setUser(JSON.stringify(user)))
    props.onSuccessfull(user)
  }, [])

  const handleChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }

  // Submit Function ==> Validate Form => Register ID With Firebase
  const handleSubmit = async (e) => {
      e.preventDefault()
      setInputs(inputs => ({...inputs, submitBtn : true}))
      try {
        await Auth.createUserWithEmailAndPassword(inputs.email, inputs.password);
        setInputs(inputs => ({...inputs, submitBtn: false}))
      } catch(error) {
        // alert(error.message);
      }
  }

  return (
    <div className="form-wrapper">
      <h3 className="title text-center text-lg-start">Registration</h3>
      <small className="mb-5 w-100 text-center text-lg-start mt-1">
        Already have an account?
        <Link href="/login"><a className="h-6 small ms-2 d-block d-lg-inline-block fw-bold" >Login</a></Link>
      </small>
      <form className="row align-items-start" onSubmit={handleSubmit}>
        <CustomInput className="col-12 mb-4" type="text" id="name" name="name" required={true} label="Name" onChange={handleChange} />
        <CustomInput className="col-12 mb-4" type="email" id="email" name="email" required={true} label="Email" onChange={handleChange} />
        <CustomInput className="mb-4 col-md-6 col-12" type="password" id="password" name="password" required={true} label="Password" eyeIcon={true} onChange={handleChange} />
        <CustomInput className="mb-4 col-md-6 col-12" type="password" id="confirmpass" name="confirmpass" required={true} label="Confirm Password" eyeIcon={true} onChange={handleChange} />
        <div className="col-auto">
          <button disabled={inputs.submitBtn} type="submit" className="col btn btn-login">Submit</button>
        </div>
      </form>
    </div>
  );
}
// =========== =========== =========== =========== =========== //


// =========== COMPONENT: LOGIN FORM =========== //
export function LoginForm(props) {

  // Get Email and Password value from the input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit Function ==> Validate Form ==> Authenticate Credentials
  const handleSubmit = () => {
      
  }

  return (
    <div className="form-wrapper">
      <h3 className="title text-center text-lg-start">Login</h3>
      <small className="mb-5 w-100 text-center text-lg-start mt-1">
        Don't have an account?
        <Link href="/registration"><a className="h-6 small ms-2 d-block d-lg-inline-block fw-bold">Register an account</a></Link>
      </small>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="input-style-1">
            <label htmlFor="email" className="form-label h-6">Email address</label>
            <input type="email" required className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
            <span className="searchborder"></span>
          </div>
          <small id="emailHelp">We'll never share your email with anyone else.</small>
        </div>
        <div className="mb-4 input-style-1">
          <div className="input-style-1">
            <label htmlFor="password" className="form-label h-6">Password</label>
            <input type="password" required className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <span className="searchborder"></span>
          </div>
        </div>
        <button type="submit" className="btn btn-login">Submit</button>
      </form>
    </div>
  );
}
// =========== =========== =========== =========== =========== //