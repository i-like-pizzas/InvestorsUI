import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getInvestors } from '../stores/investorListStore';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loader from './common/Loader';
import { Table } from 'reactstrap';
//import { useNavigate } from "react-router-dom";

const InvestorList: React.FC = () => {

    const dispatch = useAppDispatch();
    const investorState = useSelector((state: RootState) => state.investorList);

    useEffect(() => {
        dispatch(getInvestors());
    }, [dispatch]);

    return (
        <>
            <h2>Investors</h2>

            {investorState.loading ? <Loader></Loader> : investorState.error ? <span>investorState.error</span> :
                <Table responsive bordered className='clickable'>
                    <thead>
                        <tr>
                            <th>Firm Id</th>
                            <th>Firm Name</th>
                            <th>Type</th>
                            <th>Date Added</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {investorState.investors?.map((investor, key) => {
                            return <tr key={key}>
                                <td>{investor.firm_id}</td>
                                <td>{investor.firm_name}</td>
                                <td>{investor.firm_type}</td>
                                <td>{new Date(investor.date_added).toLocaleDateString()}</td>
                                <td>{investor.address}</td>
                            </tr>
                        })}

                    </tbody>
                </Table>
            }
        </>
    );
}



export default InvestorList;