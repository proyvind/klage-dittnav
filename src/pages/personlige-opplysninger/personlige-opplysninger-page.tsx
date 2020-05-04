import React, {useEffect} from 'react';
import PersonligeOpplysninger from '../../components/personlige-opplysninger/personlige-opplysninger';
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store/reducer";
import {checkAuth} from "../../store/actions";
import NavFrontendSpinner from "nav-frontend-spinner";

const PersonligeOpplysningerPage = () => {
    const dispatch = useDispatch();
    const { loading, person } = useSelector((state: Store) => state);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        return <NavFrontendSpinner type={'XL'} />;
    }

    return <PersonligeOpplysninger person={person} />;
};

export default PersonligeOpplysningerPage;
