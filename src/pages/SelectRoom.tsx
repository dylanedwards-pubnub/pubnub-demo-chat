import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SelectRoom = () => {
  const [shouldRedirectToRoom, setShouldRedirect] = useState(false);
  const [screenName, setScreenName] = useState<string>("");
  const [chatroomName, setChatroomName] = useState<string>("");

  interface IRedirectProps {
    to: string;
    username: string;
    chatroomName: string;
  }

  function Redirect(props: IRedirectProps) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(props.to, {
        state: {
          username: props.username,
          chatroomName: props.chatroomName,
          userUuid: nanoid(),
        },
      });
    });
    return null;
  }

  const closeModal = () => {
    if (screenName && chatroomName) {
      setShouldRedirect(true);
    }
  };

  return (
    <>
      {shouldRedirectToRoom && (
        <Redirect
          to={`/chatroom/${chatroomName}`}
          username={screenName}
          chatroomName={chatroomName}
        />
      )}
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Screen Name and Chat to Join</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close until you choose a name and chatroom
          <br />
          <br />
          <Form.Group className="mb-3">
            <Form.Label>Screen Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="screen name"
              value={screenName}
              onChange={(e) => {
                setScreenName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Chatroom Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="chatroom name"
              value={chatroomName}
              onChange={(e) => {
                setChatroomName(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={() => closeModal()}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectRoom;
