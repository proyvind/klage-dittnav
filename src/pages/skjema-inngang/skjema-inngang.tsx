import React, { useEffect, useState } from 'react';
import InngangInfoBox from '../../components/skjema-inngang/inngang-info-box';
import { Margin80TopContainer } from '../../styled-components/main-styled-components';
import queryString from 'query-string';
import { getBruker } from '../../services/userService';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import WithLoading from '../../components/general/loading/withLoading';
import { setReferrer } from '../../services/klageService';

const SkjemaInngang = (props: RouteComponentProps) => {
    const history = useHistory();
    const query = queryString.parse(props.location.search);
    const [loading, setLoading] = useState<boolean>(true);

    getBruker()
        .then(() => {
            history.push(`/klage${props.location.search}`);
        })
        .catch(err => {
            console.log('User is not logged in');
            setLoading(false);
        });

    useEffect(() => {
        setReferrer(document.referrer);
    }, []);

    return (
        <Margin80TopContainer>
            <WithLoading loading={loading}>
                <InngangInfoBox query={query} />
            </WithLoading>
        </Margin80TopContainer>
    );
};

export default SkjemaInngang;
