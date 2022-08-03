import * as React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Card, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

// Clickable post that displays modal with more info such as html diff
export default function ProjectPost({ change, displayWikiInfo, displayUserInfo }) {
    const showWikiInfo = displayWikiInfo ? "block" : "none"
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className='project-post'>

            <Button variant="light" onClick={handleShow}>
                <Card>
                    {displayWikiInfo &&
                        <Card.Title>
                            <Link to={"/wiki/" + change.wikiID}>
                                {change.wikiTitle}
                            </Link>
                        </Card.Title>
                    }
                    <Card.Body>
                        <Link to={"/account/" + change.userID}>
                            {change.user_name}
                        </Link>
                        <span style={{ display: showWikiInfo }}>
                            {" "}made a change to{" "}
                            <Link to={"/wiki/" + change.wikiID}>
                                Wiki: {change.wikiTitle}
                            </Link>
                            {" "}project.
                            Change:  </span>
                        {change.change}
                    </Card.Body>
                </Card>
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Link to={"/wiki/" + change.wikiID}>
                            {change.wikiTitle}
                        </Link>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        <Link to={"/account/" + change.userID}>
                            {change.user_name}
                        </Link>
                        {" "}made a change to{" "}
                        <Link to={"/wiki/" + change.wikiID}>
                            Wiki: {change.wikiTitle}
                        </Link>
                        {" "}project.
                        Change: {change.change}
                    </Card.Body>
                </Modal.Body>
                <Card>
                    <Card.Body>
                        <div dangerouslySetInnerHTML={{ __html: change.htmlDiff }} />
                    </Card.Body>
                </Card>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}