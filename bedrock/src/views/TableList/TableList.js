import React, {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { cold } from 'react-hot-loader';  

class TableList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      buttonsState: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
      matchedFunds: []
    };
    const styles = {
      cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
          color: "rgba(255,255,255,.62)",
          margin: "0",
          fontSize: "14px",
          marginTop: "0",
          marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
          color: "#FFFFFF"
        }
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "#777",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1"
        }
      },
      cardTitleBlack: {
        color: "black",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "black",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1"
        }
      }

    };
    const useStyles = makeStyles(styles);
    this.classes = cold(useStyles);
  }

  buttonPressed = (p,s,e) => {
 
    var buttonsState=this.state.buttonsState
    buttonsState[p][s]=1
    buttonsState[p][Math.abs((s%2)-1)]=0
    this.setState({
      buttonsState:buttonsState
    })
  }

  submitChanges = async (e) => {
    var allStates={}
    for (var i = 1; i < this.state.buttonsState.length+1; i++) {
      if(this.state.buttonsState[i-1][0]===1){
        allStates[""+i]=0
      }
      else{
        allStates[""+i]=1
      }
      
    }

    var oldThis = this
    const response = await fetch(' https://us-central1-bedrock-2019.cloudfunctions.net/SurveyResponses?id=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({allStates}),
    }).then( res => {oldThis.updateTable(res)})
  }

  updateTable = async (input) => {
    let response2 = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/GetFundsMatchOpinion?id=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"E":input[1]["E"],"C":input[1]["C"],"G":input[1]["G"],"S":2}),
    })

    let b= await response2.json()
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
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={this.classes.cardTitleWhite}>Environment</h4>
              <p className={this.classes.cardCategoryWhite}>
                How much do you care about issues like climate change?
              </p>
            </CardHeader>
            <CardBody>
              <p>
                Do you think enough is being done to combat climate change?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,0,0)} color={this.state.buttonsState[0][0]==1 ? "success" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,0,1)} color={this.state.buttonsState[0][1]==1 ? "success" : "#666636"}>Yes</Button>
                </GridContainer>
              <p>
                Do you think fossil fuels are neccessary in the 21st Century?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,1,0)} color={this.state.buttonsState[1][0]==1 ? "success" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,1,1)} color={this.state.buttonsState[1][1]==1 ? "success" : "#666636"}>Yes</Button>
                </GridContainer>          
              <p>
                Do you think all firms should be forced to be carbon neutral?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,2,0)} color={this.state.buttonsState[2][0]==1 ? "success" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,2,1)} color={this.state.buttonsState[2][1]==1 ? "success" : "#666636"}>Yes</Button>
                </GridContainer>
              </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.classes.cardTitleWhite}>Social</h4>
              <p className={this.classes.cardCategoryWhite}>
                How much do issues like diversity in the workplace and promoting wellbeing influence your investment?
              </p>
            </CardHeader>
            <CardBody>
              <p>
                Do you think it should be mandatory for all companies to release gender pay gaps?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,3,0)} color={this.state.buttonsState[3][0]==1 ? "primary" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,3,1)} color={this.state.buttonsState[3][1]==1 ? "primary" : "#666636"}>Yes</Button>
                </GridContainer>
              <p>
                Do you think more opportunities should be made available for minorities?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,4,0)} color={this.state.buttonsState[4][0]==1 ? "primary" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,4,1)} color={this.state.buttonsState[4][1]==1 ? "primary" : "#666636"}>Yes</Button>
                </GridContainer>
              <p>
                Do you think the company should reflect your personal values?
              </p>
                <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,5,0)} color={this.state.buttonsState[5][0]==1 ? "primary" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,5,1)} color={this.state.buttonsState[5][1]==1 ? "primary" : "#666636"}>Yes</Button>
                </GridContainer>
           </CardBody>
          </Card>
          <Card>
            <CardHeader color="danger">
              <h4 className={this.classes.cardTitleWhite}>Governance</h4>
              <p className={this.classes.cardCategoryWhite}>
                How much do issues concerning administration and regulation affect your investment?
              </p>
            </CardHeader>
            <CardBody>
              <p>
                Do you think there needs to be more regulation on large companies?
              </p>
              <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,6,0)} color={this.state.buttonsState[6][0]==1 ? "danger" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,6,1)} color={this.state.buttonsState[6][1]==1 ? "danger" : "#666636"}>Yes</Button>
                </GridContainer>
              <p>
                Do you believe that the free market is generally best for consumers?
              </p>
              <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,7,0)} color={this.state.buttonsState[7][0]==1 ? "danger" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,7,1)} color={this.state.buttonsState[7][1]==1 ? "danger" : "#666636"}>Yes</Button>
                </GridContainer>
              <p>
                Should there be greater fines on companies who find tax loopholes?
              </p>
              <GridContainer xs={12} justify="center">
                  <Button onClick={this.buttonPressed.bind(this,8,0)} color={this.state.buttonsState[8][0]==1 ? "danger" : "#666636"}>No</Button>
                  <Button onClick={this.buttonPressed.bind(this,8,1)} color={this.state.buttonsState[8][1]==1 ? "danger" : "#666636"}>Yes</Button>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridContainer xs={12} justify="center">
          <Button onClick={this.submitChanges} color="info">Update Profile</Button>
        </GridContainer>

        <GridContainer xs={12} justify="center">
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={this.classes.cardTitleWhite}>Your Portfolio</h4>
                  <p className={this.classes.cardCategoryWhite}>
                    Information about funds that match your investment profile
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Name", "MSRating", "12 Month Return","Total Annual Return","Volatility","E/S/G"]}
                    tableData={this.state.matchedFunds}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

      </GridContainer>
    );
  }
}

export default TableList
