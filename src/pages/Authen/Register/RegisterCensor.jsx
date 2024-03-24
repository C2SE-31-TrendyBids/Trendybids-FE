import React, { useState } from 'react'
import logo from "../../../public/images/logoTrendy1.jpg"
import Link from '@mui/material/Link';
import * as censorApi from '../../../services/censor'
import CircularProgress from '@mui/material/CircularProgress';
import { IoCloudUploadSharp } from "react-icons/io5";
import { toast } from "sonner";
const RegisterCensor = () => {
    const [nameOrganization, setNameOrganization] = useState('');
    const [founding, setFounding] = useState('');
    const [placeTaxCode, setPlaceTaxCode] = useState('');
    const [dateTaxCode, setDateTaxCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [taxCode, setTaxCode] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const accessToken = localStorage.getItem('access-token');

    const handleFileChange = (e) => {
        const newImage = e.target.files[0];
        newImage["id"] = Math.random();
        setSelectedFile(newImage);
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (isCheck) {
                if (nameOrganization.trim() === '' || nameOrganization.length < 5 || nameOrganization > 100) {
                    toast.error('Please enter organization name , 5 < name organization < 100');
                    return
                }
                if (founding.trim() === '') {
                    toast.error('Please enter founding date');
                    return
                }
                if (placeTaxCode.trim() === '' || placeTaxCode < 10 || placeTaxCode > 200) {
                    toast.error('Please enter place of tax code issuance , 10 < place tax code < 200');
                    return
                }
                if (dateTaxCode.trim() === '') {
                    toast.error('Please enter tax code issuance date');
                    return
                }
                if (phoneNumber.trim() === '' || phoneNumber.length < 10 || phoneNumber.length > 20) {
                    toast.error('Please enter phone number , 9 < phone number < 20 ');
                    return
                }
                if (taxCode.trim() === '' || taxCode.length < 8 || taxCode.length > 30) {
                    toast.error('Please enter company tax code , 8 < tax code < 30');
                    return
                }
                if (address.trim() === '' || address.length < 10 || address.length > 200) {
                    toast.error('Please enter business address , 10 < address < 200');
                    return
                }
                if (position.trim() === '' || position.length < 1 || position.length > 50) {
                    toast.error('Please enter position , 1 < possition < 50');
                    return
                }

                const censorReq = await censorApi.registerCensor(accessToken, nameOrganization, phoneNumber, founding, address, taxCode, dateTaxCode, position, placeTaxCode, selectedFile)
                if (censorReq.statusCode === 201) {
                    toast.success(censorReq.message);
                    resetAll()
                }
                else {
                    alert(censorReq.message);
                }
            }
            else {
                alert("You have not agreed to our terms")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }
    const resetAll = () => {
        selectedFile(null)
        setAddress('')
        setDateTaxCode('')
        setFounding('')
        setIsCheck(false)
        setNameOrganization('')
        setPosition('')
        setTaxCode('')
        setPhoneNumber('')
        setPlaceTaxCode('')


    }

    return (
        <div className='max-w-[1230px] px-[30px] mx-auto mt-4'>
            <div className='border shadow-lg rounded-lg bg-white h-auto'>
                <form action="" className='flex items-center justify-center' onSubmit={submitRegister}>
                    <div className='w-4/5'>
                        <div className='flex items-center justify-center'>
                            <img src={logo} alt="" />
                        </div>
                        <div className='text-center mb-6'>
                            <span className='text-2xl text-black font-semibold'>Register Auction Organization</span>
                        </div>

                        <div className='my-2'>
                            <span className='text-base text-blue-800'>Organization Name</span>
                            <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setNameOrganization(e.target.value)} />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Founding : </span>
                                    <input type="date" className='w-full border p-2 rounded-md my-2' onChange={(e) => setFounding(e.target.value)} />
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Place of issuance of tax code : </span>
                                    <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setPlaceTaxCode(e.target.value)} />
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Tax code issuance date : </span>
                                    <input type="date" className='w-full border p-2 rounded-md my-2' onChange={(e) => setDateTaxCode(e.target.value)} />
                                </div>
                                <div className='my-2'>
                                    <span className='text-base text-blue-800'>Representative Name :  </span>
                                    <input type="text" className='w-full border p-2 rounded-md my-2' />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='my-2'>
                                        <span className='text-base text-blue-800'>Phone Number :  </span>
                                        <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className='my-2'>

                                        <span className='text-base text-blue-800'>Company tax code :  </span>
                                        <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setTaxCode(e.target.value)} />
                                    </div>
                                    <div className='my-2'>

                                        <span className='text-base text-blue-800'>Business address :  </span>
                                        <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className='my-2'>

                                        <span className='block text-base text-blue-800'>Position :  </span>
                                        <input type="text" className='w-full border p-2 rounded-md my-2' onChange={(e) => setPosition(e.target.value)} />
                                    </div>
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
                                    <div class="flex flex-col items-center justify-center pb-6 pt-5">
                                        <IoCloudUploadSharp className='text-5xl text-gray-500' />
                                        <p className="mb-2 text-sm text-gray-500 text-center">
                                            <span className="font-semibold">Click to upload or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center justify-center">SVG, PNG, JPG or GIF</p>
                                    </div>

                                )}
                                <input id="fileInput" type='file' class="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div>
                            <div className='flex'>
                                <input type="checkbox" className='border p-2 m-2 h-3 w-5' onClick={(e) => setIsCheck(e.target.checked)} />
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
