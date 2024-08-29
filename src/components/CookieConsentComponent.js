import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consentCookie = Cookies.get('cookie-consent');
    if (!consentCookie) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 }); // Cookie expires in 365 days
    setShowConsent(false);
  };

  return (
    <>
      {showConsent && (
        <Container fluid className="cookie-consent-container" style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#343a40', color: '#fff', padding: '10px' }}>
          <Row>
            <Col>
              <p>
                We use cookies to improve your experience on our site. By continuing to use our site, you accept our use of cookies.
              </p>
            </Col>
            <Col xs="auto">
              <Form inline>
                <Button variant="primary" onClick={handleAccept}>
                  Accept
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CookieConsent;
