import HeaderAdmin from "../../components/Header/HeaderAdmin";
import React, {useState, useEffect} from "react";
import {FaCircleDot} from "react-icons/fa6";
import {LuClipboardEdit} from "react-icons/lu";
import {IoMdAdd} from "react-icons/io";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import emptyRule from "../../assets/images/empty_products.svg";
import UpdateRuleModel from "../../components/ModelAdmin/UpdateRuleModel";
import {useDispatch, useSelector} from "react-redux";
import {fetchRulesThunk} from "../../redux/slices/rule";
import DeleteModel from "../../components/ModelAdmin/DeleteModel";
import CreateModel from "../../components/ModelAdmin/CreateModel";
import {MdFormatListBulletedAdd} from "react-icons/md";
const RuleManagement = () => {

    const [ruleDetail, setRuleDetail] = useState({})
    const [openModelUpdate, setOpenModelUpdate] = useState(false);
    const {rules ,statusChange} = useSelector((state) => state.rule)
    const dispatch = useDispatch()
    const [openModelAdd, setOpenModelAdd] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token')
        const fetchRules = async () => {
            dispatch(fetchRulesThunk({accessToken}));
        }
        accessToken && fetchRules()
    }, [statusChange]);

    const handleAddNewRule = async () => {

        const maxRuleNumber = rules.reduce((max, rule) => {
            const ruleNum = parseInt(rule.ruleNumber, 10);
            return ruleNum > max ? ruleNum : max;
        }, 0);

        await setRuleDetail({ruleNumber:maxRuleNumber + 1});
        await setOpenModelAdd(true);
    }

    return (
        <div className="px-4 h-screen">
            <HeaderAdmin pageName={"Rules"}/>
            {/*    */}
            <div className="flex items-center justify-between my-2">
                <div>
                    <h1 className="text-xl font-semibold text-gray-700">Rules</h1>
                </div>
                <button  className="flex items-center gap-1 px-6 py-2 text-sm rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
                    onClick={handleAddNewRule}
                >
                    New Rule
                    <IoMdAdd size={20} />
                </button>
            </div>
            <div className="w-full mt-2">
                <table className="w-full">
                    <thead className="rounded-lg">
                    <tr className="w-full grid grid-cols-12 gap-2 place-items-center bg-white rounded">
                        <th className="w-full text-center col-span-2 px-4 py-3 text-md font-semibold text-gray-700">
                            Rule Number
                        </th>
                        <th className="w-full text-center col-span-8 px-4 py-3 text-md font-semibold text-gray-700">
                            Description
                        </th>
                        <th className="w-full text-center col-span-2 px-4 py-3 text-md font-semibold text-gray-700">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rules.length > 0 ?
                            rules.map(rule => {
                                    return (
                                        <tr key={rule?.ruleNumber} className="w-full grid grid-cols-12 gap-2 place-items-center bg-white border-t-[1px] border-gray-400">
                                            <th className="w-full text-center col-span-2 px-4 py-3 text-md font-semibold text-gray-700">
                                                Rule {rule?.ruleNumber}
                                            </th>
                                            <th className="w-full h-auto text-center col-span-8 py-3 text-md font-semibold text-gray-700 text-wrap">
                                                {rule?.ruleItems?.map((item, index) => {
                                                    return (
                                                        <div key={item?.id} className="px-2 mt-2">
                                                            <p className="w-auto pl-2 text-sm text-wrap text-left flex justify-start items-center break-all">
                                                                <FaCircleDot className="block mx-1" size={6}/>
                                                                {item?.description}
                                                            </p>
                                                        </div>
                                                    )
                                                })}
                                            </th>
                                            <th className="w-full col-span-2 px-4 py-3 text-left text-md font-semibold text-gray-700">
                                                <div className="flex items-center justify-center gap-3 ">
                                                    <LuClipboardEdit className="hover:cursor-pointer text-green-500"
                                                                     onClick={() => {
                                                                         setRuleDetail(rule)
                                                                         setOpenModelUpdate(true)
                                                                     }}
                                                                     size={18}/>
                                                    <IoMdAdd className="hover:cursor-pointer text-blue-500"
                                                             onClick={() => {
                                                                 setRuleDetail(rule)
                                                                 setOpenModelAdd(true)
                                                             }}
                                                             size={20}/>
                                                </div>
                                            </th>
                                        </tr>
                                    )
                                }
                            )
                            :
                            <div className="flex items-center justify-center gap-4 mt-20">
                                <img className="w-40 h-40" src={emptyRule} alt="No Rules"/>
                                <Button
                                    sx={{fontWeight: 700}}
                                    variant="outlined" startIcon={<AddIcon/>}
                                >
                                    Add Rule
                                </Button>
                            </div>
                    }
                    </tbody>
                </table>
                {
                    openModelUpdate &&
                    <UpdateRuleModel open={openModelUpdate} setOpen={setOpenModelUpdate} rule={ruleDetail}/>
                }
                {
                    openModelAdd && <CreateModel open={openModelAdd} setOpen={setOpenModelAdd} rule={ruleDetail} />
                }
            </div>
        </div>
    )
}

export default RuleManagement;