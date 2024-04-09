import React, { useState } from 'react'
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import * as censorApi from '../../../services/censor'
import CircularProgress from '@mui/material/CircularProgress';
import { IoCloudUploadSharp } from "react-icons/io5";
import { toast } from "sonner";
import { useForm } from "react-hook-form"

const RegisterCensor = () => {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const accessToken = localStorage.getItem('access-token');
    const user = JSON.parse(localStorage.getItem('auth'))
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            isCheck: false, taxCode: '', nameOrganization: '', phoneNumber: '', founding: '', address: "", dateTaxCode: '', position: '', placeTaxCode: '',
        }
    });
    const handleFileChange = (e) => {
        const newImage = e.target.files[0];
        newImage["id"] = Math.random();
        setSelectedFile(newImage);
    };
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const censorReq = await censorApi.registerCensor(accessToken, data.nameOrganization, data.phoneNumber, data.founding, data.address, data.taxCode, data.dateTaxCode, data.position, data.placeTaxCode, selectedFile)
            if (censorReq.statusCode === 201) {
                toast.success(censorReq.message);
                reset({
                    isCheck: false, taxCode: '', nameOrganization: '', phoneNumber: '', founding: '', address: "", dateTaxCode: '', position: '', placeTaxCode: ''
                });
                setSelectedFile(null)
            }
            else {
                toast(censorReq.message);
            }
        } catch (error) {
            toast(error)
        } finally {
            setLoading(false);
        }
    }
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    };
    return (
        <div className='max-w-[1230px] px-[30px] mx-auto mt-4'>
            <div className='border shadow-lg rounded-lg bg-white h-auto'>
                <form action="" className='flex items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-4/5'>
                        <div className='flex items-center justify-center'>
                            <img src={logo} alt="" />
                        </div>
                        <div className='text-center mb-6'>
                            <span className='text-2xl text-black font-semibold'>Register Auction Organization</span>
                        </div>

                        <div className='my-2'>
                            <span className='text-base text-blue-800'>Organization Name</span>
                            <input {...register("nameOrganization", { require: true, minLength: { value: 5, message: "Please enter organization name > 5 " }, maxLength: { value: 100, message: "Please enter organization name  < 100" } })}
                                type="text" className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                            <span className='text-red-500 text-xs'>{errors?.orgabizationName?.message}</span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Founding : </span>
                                    <input {...register("founding", { required: "Please enter the founding date." })}
                                        type="date" className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                                    <span className='text-red-500 text-xs'>{errors?.founding?.message}</span>

                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Company Tax Code : </span>
                                    <input {...register("taxCode", { require: true, minLength: { value: 8, message: "taxcode length > 8" }, maxLength: { value: 30, message: "taxcode length < 30" } })}
                                        type="text" className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                                    <span className='text-red-500 text-xs'>{errors?.taxCode?.message}</span>
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Tax code issuance date : </span>
                                    <input {...register("dateTaxCode", { required: "Please enter the Tax code issuance date." })}
                                        type="date" className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                                    <span className='text-red-500 text-xs'>{errors?.dateTaxCode?.message}</span>
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Representative Name :  </span>
                                    <input type="text" className='w-full border p-2 rounded-md my-2 text-black font-semibold' value={user?.username} disabled />
                                </div>
                            </div>

                            <div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Phone Number :  </span>
                                    <input {...register("phoneNumber", { required: "Phone number is required", minLength: { value: 10, message: "Please enter phone number > 9 " }, maxLength: { value: 11, message: "Please enter phone number  < 12" } })}
                                        type="tel" className='w-full border p-2 rounded-md my-2 text-black font-semibold' onChange={handlePhoneNumberChange} />
                                    <span className='text-red-500 text-xs'>{errors?.phoneNumber?.message}</span>
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Place of issuance of tax code :  </span>
                                    <input {...register("placeTaxCode", { required: true, minLength: { value: 10, message: "Place tax code should be at least 10 characters" }, maxLength: { value: 200, message: "Place tax code should be at most 200 characters" } })}
                                        type="text"
                                        className='w-full border p-2 rounded-md my-2 text-black font-semibold'
                                    />
                                    {errors.placeTaxCode && <span className='text-red-500 text-xs'>{errors.placeTaxCode.message}</span>}
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Business address :  </span>
                                    <input  {...register("address", { required: true, minLength: { value: 10, message: "Address should be at least 10 characters" }, maxLength: { value: 200, message: "Address should be at most 200 characters" } })}
                                        type="text"
                                        className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                                    {errors.address && <span className='text-red-500 text-xs'>{errors.address.message}</span>}
                                </div>
                                <div className='my-2'>
                                    <span className='block text-base text-blue-800'>Position :  </span>
                                    <input
                                        {...register("position", { required: true, minLength: { value: 1, message: "Position should not be empty" }, maxLength: { value: 50, message: "Position should be at most 50 characters" } })}
                                        type="text" className='w-full border p-2 rounded-md my-2 text-black font-semibold' />
                                    {errors.position && <span className='text-red-500 text-xs'>{errors.position.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <span className='text-base text-blue-800'>Image of the auction organization</span>
                            <label for="fileInput" className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                                {selectedFile ? (
                                    <div className='flex items-center justify-center'>
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Uploaded File"
                                            className="max-h-64 max-w-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <IoCloudUploadSharp className='text-5xl text-gray-500' />
                                        <p className="mb-2 text-sm text-gray-500 text-center">
                                            <span className="font-semibold">Click to upload or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center justify-center">SVG, PNG, JPG or GIF</p>
                                    </div>

                                )}
                                <input id="fileInput" type='file' className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div>
                            <div className='flex'>
                                <input
                                    {...register("isCheck", { required: true })}
                                    type="checkbox"
                                    className='border p-2 m-2 h-3 w-5'
                                />
                                <div className='max-sm:text-sm'>
                                    <span>I commit to comply with </span>
                                    <Link href="#" underline="always">
                                        {'the Rights and Responsibilities'}
                                    </Link>
                                    <span> of Auction Participants
                                        (Regulations according to auction assets), Customer information security policy, Dispute resolution mechanism,
                                        Operational regulations at the online auction website. online TrendyBids.vn
                                    </span>
                                </div>
                            </div>
                            {errors.isCheck && <span className='text-red-500 text-xs'>Please check the box to proceed</span>}
                        </div>
                        <div className='text-center my-4'>
                            <button className='border py-2 px-10 rounded-md bg-[#38B6FF] text-white font-semibold'>
                                {loading ? (
                                    <div>
                                        <CircularProgress color="secondary" />
                                    </div>
                                ) : (
                                    <span>
                                        SUBMIT
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterCensor
