import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../sheard/loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imagbb_key;

    const navigate= useNavigate();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = (data) => {
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                   

                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url,
                    }

                    //save doctor information to the data base

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body:JSON.stringify(doctor)
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        toast.success(`${data.name} is added successfully`);
                        navigate('/dashboard/manage_doctor')
                    })
                }




            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <form onSubmit={handleSubmit((handleAddDoctor))}>
                {/* <input {...register("firstName")} /> */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span> </label>
                    <input type="text"
                        {...register("name", {
                            required: true,

                        })}
                        className='input input-bordered w-full' />

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span> </label>
                    <input type="text"
                        {...register("email", {
                            required: "Email Address is required"
                        })}
                        className='input input-bordered w-full' />
                    {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select
                        {...register('specialty')}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>pick a specialty</option>
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }


                    </select>
                    <label className="label"><span className="label-text">PhotoURL</span> </label>
                    <input type="file"
                        {...register("image", {
                            required: "photo is required",

                        })}
                        className='input input-bordered w-full' />
                    {errors.img && <p role="alert" className='text-red-600'>{errors.img?.message}</p>}
                </div>

                {/* {signupError && <p className='text red-600'>{signupError}</p>} */}

                <br />

                <button className="btn">Add Doctor</button>
            </form>
        </div>
    );
};

export default AddDoctor;