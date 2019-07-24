import React, { useState } from "react";
import Navigation from "../Navigation/navigation.jsx";
import { Input, Form, FormGroup, Button, Label, Container } from "reactstrap";
import axios from "axios";

// class CreateTeam extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       team: "",
//       open: false
//     };
//   }
//   handleSubmit() {
//     console.log(this.state);
//   }
//   render() {
//     return (
//       <div>
//         <Navigation />
//         <Container className="mt-5">
//           <Form>
//             <FormGroup>
//               <Input
//                 type="text"
//                 id="team"
//                 placeholder="Enter Teamname"
//                 onChange={e => {
//                   this.setState({ team: e.target.value });
//                 }}
//                 name="team"
//               />
//             </FormGroup>
//             <FormGroup>
//               <Input
//                 type="text"
//                 id="team"
//                 placeholder="Enter Teamname"
//                 onChange={e => {
//                   this.setState({ team: e.target.value });
//                 }}
//                 name="team"
//               />
//             </FormGroup>
//             <FormGroup check>
//               <Label check>
//                 <Input type="checkbox" onChange={() => this.setState({open: !this.state.open})} /> CHECK
//                 BOX IF CHANNEL IS CLOSED TO SELECT EMAILS
//               </Label>
//             </FormGroup>
//             <Button block className="mt-3" id="submit" onClick={this.handleSubmit.bind(this)}>
//               Submit
//             </Button>
//           </Form>
//         </Container>
//       </div>
//     );
//   }
// }

function CreateTeam() {
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState("");
  const [confirmTeam, setConfirmTeam] = useState("");
  const handleSubmit = evt => {
    evt.preventDefault();
    axios
      .post("http://localhost:3000/team/create", {
        team: team,
        open: open
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navigation />
      <Container className="mt-5">
        <Form>
          <FormGroup>
            <Input
              type="text"
              id="team"
              placeholder="Enter Teamname"
              onChange={e => setTeam(e.target.value)}
              name="team"
            />
          </FormGroup>
          <FormGroup>
            <Input type = "text"
            id = "confirmTeam"
            placeholder = "Confirm Teamname"
            onChange = {e => setConfirmTeam(e.target.value)}
            name = "confirmTeam" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={() => setOpen(!open)} /> CHECK BOX
              IF CHANNEL IS CLOSED TO SELECT EMAILS
            </Label>
          </FormGroup>
          <Button block className="mt-3" id="submit" onClick={handleSubmit} disabled = {confirmTeam !== team}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateTeam;
