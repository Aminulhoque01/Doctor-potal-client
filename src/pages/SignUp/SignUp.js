import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthPovider/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
   const {createUser,updateUser} = useContext(AuthContext)
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const [createUserEmail, setCreateUserEmail] = useState('');

    const [token]= useToken(createUserEmail);

    if(token){
        navigate('/');
    }
   
    const handleSign=(data)=>{
        console.log(data);
        setSignupError('')
        createUser(data.email, data.password)
       
        .then(result=>{
            const user = result.user;
            console.log(user);
            toast('user create a successfully')
            const userInfo ={
                displayName : data.name,
            }
            updateUser(userInfo)
            .then(()=>{
                saveUser(data.name, data.email);
            })
            .catch(err=>console.log(err));
        })
        .catch(error=>{ 
            console.log(error)
            setSignupError(error.message)
        });
    }

    const saveUser = (name,email)=>{
        const user = {name, email};
        
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('save user', data);
            setCreateUserEmail(email)
        })

    }

    // const getUserToken = email=>{
    //     fetch(``)
    // }
    

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-4xl'>Signup</h2>
                <form onSubmit={handleSubmit((handleSign))}>
                    {/* <input {...register("firstName")} /> */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span> </label>
                            <input type="text" 
                            {...register("name",{
                                required:true,
                                
                            })} 
                            className='input input-bordered w-full' />
                            
                    </div>           
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span> </label>
                            <input type="text" 
                            {...register("email",{
                                required: "Email Address is required" 
                            })} 
                            className='input input-bordered w-full' />
                            {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                    </div>           
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Password</span></label>
                           <input type="password" {...register('password',{
                                required: "Password is required" ,
                                minLength:{value:6, message:'plz put at lest 6 characters'},
                                pattern:{value:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message:'password must be strong upperCase and special character'}
                           })} 
                           className='input input-bordered w-full' />
                           {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        
                        {signupError && <p className='text red-600'>{signupError}</p>}
                    
                        <br />

                    <button className="btn">Login</button>
                </form>
                <p>New to Doctors portal <Link to='/login' className='text-primary'>YOU Have An Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;