import React , {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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
                    <CustomInput
                      labelText="Name of Milestone"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Year of Planned Completion"
                      id="year"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Milestone Balance"
                      id="projected-balance"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Yearly Contribution"
                      id="yearly-cont"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
            </Card>
          </GridItem>

          <GridContainer xs={12} justify="center">
            <Button color="primary">Find me funds</Button>
          </GridContainer>             

        </GridContainer>

      </div>
    );
  }

}

export default UserProfile
