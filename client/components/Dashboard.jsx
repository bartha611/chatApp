import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../state/ducks/messages";

import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import BoardNavigation from "./BoardNavigation";
import Chat from "./Chat";
import Footer from "./Footer";
import AddChannel from "./AddChannel";
import AddTeamMembers from "./AddTeamMember";
import MemberList from "./MemberList";
import EditProfile from "./EditProfile";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { team, channel } = useParams();
  const [addChannel, setAddChannel] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (channel) {
      dispatch(
        fetchMessages(`/api/channels/${channel}/messages`, "GET", "READ")
      );
      dispatch({ type: "STORE_JOIN", channel });
    }
  }, [team, channel]);

  return (
    <div className="h-screen">
      <Navigation />
      <div className="h-dashboard">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <div className="flex flex-row h-full">
          <Sidebar
            setChannel={setAddChannel}
            setMember={setAddMember}
            team={team}
          />
          <div className="flex flex-col w-dashboard pl-4">
            <BoardNavigation setIsOpen={setIsOpen} />
            <Chat setIsEdit={setIsEdit} />
            <Footer channel={channel} />
          </div>
        </div>
        {isOpen && <MemberList isOpen={isOpen} setIsOpen={setIsOpen} />}
        {isEdit && <EditProfile isOpen={isEdit} setIsOpen={setIsEdit} />}
        <Modal
          isOpen={addMember}
          toggle={() => setAddMember(!addMember)}
          className="w-96 mt-24"
        >
          <ModalHeader toggle={() => setAddMember(!addMember)}>
            Add Team Member
          </ModalHeader>
          <ModalBody>
            <AddTeamMembers
              setMember={setAddMember}
              team={team}
              channel={channel}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={addChannel}
          toggle={() => setAddChannel(!addChannel)}
          className="w-96 mt-24"
        >
          <ModalHeader toggle={() => setAddChannel(!addChannel)}>
            Add Channels
          </ModalHeader>
          <ModalBody>
            <AddChannel team={team} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
