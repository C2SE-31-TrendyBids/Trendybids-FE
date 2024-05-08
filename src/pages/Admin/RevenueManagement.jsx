import {LineChartRevenueAdmin} from "../../components/Chart/ChartLine/LineChartRevenueAdmin";
import SummaryAdmin from "../../components/SummaryAdmin/SummaryAdmin";
import {PieChartAdmin} from "../../components/SummaryAdmin/PieChartAdmin";
import TransactionHistory from "../../components/SummaryAdmin/TransactionHistory";
import HeaderAdmin from "../../components/Header/HeaderAdmin";

const RevenueManagement = () => {

    return (
        <div className="px-4 mt-2 mb-4">
            <HeaderAdmin pageName={"Dashboard"}/>
            {/*summary info*/}
            <SummaryAdmin/>
            {/* chart*/}
            <div className="grid grid-cols-8 gap-2 mt-2">
                <div className="col-span-5 bg-white p-2 rounded-lg">
                    <LineChartRevenueAdmin/>
                </div>
                <div className="col-span-3 bg-white p-2 rounded-lg">
                    <PieChartAdmin/>
                </div>
                {/*Transaction History*/}
                <div className="col-span-8 sm:col-span-6 md:col-span-5 lg:col-span-4 bg-white p-2 rounded-lg">
                    <TransactionHistory/>
                </div>
            </div>
        </div>
    )
}

export default RevenueManagement