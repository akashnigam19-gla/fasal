import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import {Container, Row, Col, Button} from 'reactstrap';
import Movies from '../components/movies';

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <Container>
        <h3>User: {authUser.email}</h3>
        {
          loading ?
            <Row>
              <Col>Loading....</Col>
            </Row> :
            <>
              <Row>
                <Col>
                  <Button onClick={() => {
                    signOut();
                    router.push('/');
                  }}>Sign out</Button>
                  
                  <span> | </span>
                  <Button onClick={() => router.push('/myPlaylist')}>My Playlist</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  { authUser && <Movies /> }
                </Col>
              </Row>
            </>
        }
    </Container>
  )
}

export default LoggedIn;
