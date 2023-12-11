import React from 'react';
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";

function ActorDetailPage() {
    const { name } = useParams();

    return (
                <>
                        <ActorDetails name={name} />
                </>
    );
}

export default ActorDetailPage;
