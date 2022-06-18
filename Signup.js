import React from 'react';
import { Form } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {Button} from 'react-bootstrap';
import {FaSignInAlt} from 'react-icons/fa';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup(){
    const{
        register,
        handleSubmit,
        formState:{errors}
    }=useForm();

    const navigate=useNavigate()
    
    const onFormSubmit=(userObj)=>{
        axios.post("http://localhost:4000/user-api/create-user",userObj)
        .then(response=>{
            alert(response.data.message);
            if(response.data.message=="user created successfully"){
                navigate('/login');
            }
        })
        .catch(error=>alert("Something went wrong in creating user"))
    }
    return(
        <div>
            <div className='display-5 text-center text-secondary'>Sign up</div>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    {errors.username && <p className='text-danger'>*Username is required</p>}
                    <Form.Control type="text" placeholder="Enter Username" {...register("username",{required:true})} />
                    <Form.Text className="text-muted">
                        We'll never share your information with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password",{required:true})} />
                    {errors.password && <p className='text-danger'>Password is required</p>}
                </Form.Group>
                
                <Form.Group className='mb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder='Email' {...register("email",{required:true})}></Form.Control>
                    {errors.email && <p className='text-danger'>Email is required</p>}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City' {...register("city",{required:true})}></Form.Control>
                    {errors.city && <p>City name is reqired</p>}

                </Form.Group>
                <Button variant="primary" type="submit">
                    Signup <FaSignInAlt/>
                </Button>
            </Form>

        </div>
    )
}

export default Signup;