import * as React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

// Clickable post that displays modal with more info such as html diff
export default function ProjectPost({
  change,
  displayWikiInfo,
  displayUserInfo,
}) {
  const showWikiInfo = displayWikiInfo ? "" : "none";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeColor =
    change.change == "added to project"
      ? "text-green-400"
      : change.change == "deleted from project"
      ? "text-red-400"
      : "text-amber-400";

  return (
    <div className="project-post">
      <Button variant="light" onClick={handleShow}>
        <Card className="border-2">
          {displayWikiInfo && (
            <Card.Title>
              <Link to={"/wiki/" + change.wikiID} className="pt-2 underline">
                {change.wikiTitle}
              </Link>

            </Card.Title>
          )}
          <Card.Title>
          <div className="text-sm">
                {change?.date} {change?.time}
            </div>
          </Card.Title>
          <Card.Body>
            <Link to={"/account/" + change.userID} className="underline">
              {change.user_name}
            </Link>
            <span style={{ display: showWikiInfo }}>
              {" "}
              made a change to{" "}
              <Link to={"/wiki/" + change.wikiID} className="underline">
                Wiki: {change.wikiTitle}
              </Link>{" "}
              project.
            </span>{" "}
            Change: <span className={changeColor}>{change.change}</span>
          </Card.Body>
        </Card>
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>
            <Link to={"/wiki/" + change.wikiID} className="underline">
              {change.wikiTitle}
            </Link>
            <div className="text-sm">
              {change?.date} {change?.time}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body>
            <Link to={"/account/" + change.userID} className="underline">
              {change.user_name}
            </Link>{" "}
            made a change to{" "}
            <Link to={"/wiki/" + change.wikiID} className="underline">
              Wiki: {change.wikiTitle}
            </Link>{" "}
            project. Change: {change.change}
          </Card.Body>
        </Modal.Body>
        {change.postDesc && (
          <Modal.Body>
            <Card>
              <Card.Title className="m-1 pl-2">Description:</Card.Title>
              <Card.Body>{change?.postDesc}</Card.Body>
            </Card>
          </Modal.Body>
        )}
        <Modal.Body>
          <Card>
            <Card.Title className="p-2">See wiki diff:</Card.Title>
            <hr />
            <Card.Body className="prose prose-stone">
              <div dangerouslySetInnerHTML={{ __html: change.htmlDiff }} />
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            <AiFillCloseCircle />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
