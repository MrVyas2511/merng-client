import React  from 'react'
import { Card    } from 'semantic-ui-react'
 import { FETCH_USER_QUERY   } from '../../util/graphql';
import { useQuery } from '@apollo/client';
 
 
function UserProfile({userId}) {

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: {
          userId
        }
    })


    
    if (loading) return "Loading..."
    console.log(data);

    return (
      <Card
        image={data.getUser.profilePhoto}
        header={data.getUser.username}
        meta={data.getUser.gender}
        description={data.getUser.about}
        extra={data.getUser.email}
      />
    );
}

export default UserProfile