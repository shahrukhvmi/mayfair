import React, { useState, useEffect } from 'react';
import { TextField, Box, Container, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useChangePasswordMutation } from '../../store/services/Auth/authApi';
import PasswordStrengthBar from 'react-password-strength-bar';

const ChangeForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    // ChangePassword Api here 👇👇
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        mode: 'onChange',
    });
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');
        const emailParam = params.get('email');

        if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);
        } else {
            toast.error('Invalid or missing token and email.');
            navigate('/forgot-password/');
        }
    }, [location, navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await changePassword({
                email,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
                token,
            }).unwrap();

            toast.success(response.message || 'Password changed successfully!');
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.errors?.reset_password);
        }
    };

    // Toggle visibility for password and confirm password fields
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Watch values for password and confirm password
    const password = watch('password');
    const passwordConfirmation = watch('passwordConfirmation');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#DACFFF] px-4 pt-6">
            <div className="">
                <div className="bg-white p-6 w-96 rounded-lg mb-10">
                    <h2 className="text-xl font-semibold text-center text-[#1C1C29] mb-4">Change Your Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                        {/* Password Field */}
                        <TextField
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            })}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <PasswordStrengthBar
                            password={password}
                            className="w-[90%] mt-2 rounded-2xl"
                        />

                        {/* Confirm Password Field */}
                        <TextField
                            {...register('passwordConfirmation', {
                                required: 'Password confirmation is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={!!errors.passwordConfirmation}
                            helperText={errors.passwordConfirmation?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                            {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <PasswordStrengthBar
                            password={passwordConfirmation}
                            className="w-[90%] mt-2 rounded-2xl"
                        />

                        {/* Submit Button */}
                        <div className="text-center my-3">
                            <div className="text-center my-3">
                                <button disabled={!isValid || password !== passwordConfirmation || isLoading} type="submit" className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-violet-700 disabled:cursor-not-allowed bg-violet-700 border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-violet-700 focus:bg-bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 transition ease-in-out duration-150">
                                    {isLoading ? 'Changing Password...' : 'Change Password'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangeForgotPassword;
