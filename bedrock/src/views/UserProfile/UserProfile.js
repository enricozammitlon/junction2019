import React , {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

import avatar from "assets/img/new_logo.png";
import { cold } from 'react-hot-loader';  





class UserProfile extends Component {

  constructor(props) {
    super(props);
    const styles = {
      cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      }
    };

    const useStyles = makeStyles(styles);

    this.state={milestones:[]}

    this.classes = cold(useStyles);

    this.handleChange = this.handleChange.bind(this);

  }

  async componentWillMount(){
    let response2 = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/getMilestones?id=1', {
    method: 'GET'
    })

    let b= await response2.json()
    console.log(b)
  }


  handleChange(event){
    var name= event.target.id
    this.setState({
      [name] : event.target.value
    })
  }


  findFunds = async (e) => {
    let response = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/GetInterest?id=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({Initial:this.state.initialbal,YTT:this.state.year,Cont:this.state.yearlycont,Target:this.state.projectedbalance}),
    })
    let a= await response.json()
    console.log(a)

    let response2 = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/GetFundsMatchReturns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({perms:1,interest:a.interest}),
    })

    let b= await response2.json()
    console.log(b)
    b=b['MatchFunds']
    var c=[]
    for (var i = 0; i <b.length; i++) {
      c.push([b[i]['Name'],b[i]['MSRating'],b[i]['12mReturns'],b[i]['TotRet'],b[i]['Risk'],b[i]['E']+'/'+b[i]['S']+'/'+b[i]['G']])
    }
    console.log(c)
    this.setState({
      matchedFunds:c
    })
    
  }

  render(){
    return (
      <div>

        <GridContainer xs={12} justify="center">
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={this.classes.cardTitleWhite}>Your Milestones</h4>
                  <p className={this.classes.cardCategoryWhite}>
                    Information about the milestones you already have
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Name", "Year of Planned Completion", "Milestone Balance","Yearly Contribution"]}
                    tableData={[]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.classes.cardTitleWhite}>New Milestone</h4>
                <p className={this.classes.cardCategoryWhite}>Set your new milestone here</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                  <InputLabel
                    className={this.classes.labelRoot}
                  >
                    Name of Milestone
                  </InputLabel>
                    <Input
                      id="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <InputLabel
                    className={this.classes.labelRoot}
                  >
                    Year of Planned Completion
                  </InputLabel>
                    <Input
                      id="year"
                      value={this.state.year}
                      onChange={this.handleChange}
                    />                    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                   <InputLabel
                    className={this.classes.labelRoot}
                  >
                    Milestone Balance
                  </InputLabel>
                    <Input
                      id="projectedbalance"
                      value={this.state.projectedbalance}
                      onChange={this.handleChange}
                    />  
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <InputLabel
                    className={this.classes.labelRoot}
                  >
                   Yearly Contribution
                  </InputLabel>
                    <Input
                      id="yearlycont"
                      value={this.state.yearlycont}
                      onChange={this.handleChange}
                    />  
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <InputLabel
                    className={this.classes.labelRoot}
                  >
                  Initial Balance
                  </InputLabel>
                    <Input
                      id="initialbal"
                      value={this.state.initialbal}
                      onChange={this.handleChange}
                    />  
                  </GridItem>
                </GridContainer>

              </CardBody>
            </Card>
          </GridItem>

          <GridContainer xs={12} justify="center">
            <Button onClick={this.findFunds} color="primary">Find me funds</Button>
          </GridContainer>             

        </GridContainer>

      </div>
    );
  }

}

export default UserProfile
