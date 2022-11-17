import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPovider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [data, setData] = useState('');

    const {signIn} =useContext(AuthContext);
    const [loginError, setLoginError] =useState('');

    const [loginUserEmail, setLoginUserEmail]= useState('');
    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const navigate= useNavigate();

    const from = location.state?.from?.pathname ||'/'

    if(token){
        navigate(from,{replace:true});
    }
    
    const handleLogin=(data)=>{
        console.log(data);
        setLoginError('')
        signIn(data.email,data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setLoginUserEmail(data.email);
            toast('user successfully login');
            
        })
        .catch(error =>{ 
            console.log(error);
            setLoginError(error.message)
        });
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-4xl'>login</h2>
                <form onSubmit={handleSubmit((handleLogin))}>
                     
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span> </label>
                            <input type="text" 
                            {...register("email",{
                                required: "Email Address is required" 
                            })} 
                            className='input input-bordered w-full' />
                            {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Password</span></label>
                           <input type="password" {...register('password',{
                                required: "Password is required" ,
                                minLength:{value:6, message:'plz put at lest 6 characters'}
                           })} 
                           className='input input-bordered w-full' />
                           {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                        </div>
                        
                    </div>
                        <br />

                    <button className="btn">Login</button>
                </form>
                <p>New to Doctors portal <Link to='/signup' className='text-primary'>create a New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;