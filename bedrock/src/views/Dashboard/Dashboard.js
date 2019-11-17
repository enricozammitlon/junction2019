import React, {Component} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import BallotIcon from "@material-ui/icons/Ballot";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { cold } from 'react-hot-loader';  

import {
  totalEarningsChart,
  fundsPerformanceChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    const useStyles = makeStyles(styles);
    this.state={balance:0,funds:[]}
    this.classes = cold(useStyles);
  }

  async componentWillMount(){
    let response = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/profile?id=1', {
    method: 'GET'
    })
    let a= await response.json()
    let response2 = await fetch('https://us-central1-bedrock-2019.cloudfunctions.net/GetFundsMatchOpinion?id=1', {
    method: 'GET'
    })
    let b= await response2.json()
    console.log(b)
    this.setState({
      balance:a['Balance'],
      funds:b
    })
    
  }

  render(){
    return (
      <div>
        <GridContainer justify="center"  alignItems="center">

          <GridItem xs={1} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={this.classes.cardCategory}>Current Balance</p>
                <h3 className={this.classes.cardTitle}>${this.state.balance}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={this.classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={3} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={this.classes.cardCategorySmaller}>Number of Funds</p>
                <h3 className={this.classes.cardTitle}>
                  12
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={this.classes.stats}>
                  {/*<BallotIcon />*/}
                  <Update />
                  Funds in Portfolio
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={1} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={this.classes.cardCategory}>Next Milestone</p>
                <h3 className={this.classes.cardTitle}>$50,000</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={this.classes.stats}>
                  <Update />
                  Due in 6 months
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>


        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={totalEarningsChart.data}
                  type="Line"
                  options={totalEarningsChart.options}
                  listener={totalEarningsChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={this.classes.cardTitle}>Your Total earnings</h4>
                <p className={this.classes.cardCategory}>
                  <span className={this.classes.successText}>
                    <ArrowUpward className={this.classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase from initial investment.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={this.classes.stats}>
                  <AccessTime /> Updated 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={this.classes.cardTitle}>Completed Tasks</h4>
                <p className={this.classes.cardCategory}>Last Campaign Performance</p>
              </CardBody>
              <CardFooter chart>
                <div className={this.classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>

        <GridContainer>

        <GridItem xs={4} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={fundsPerformanceChart.data}
                  type="Bar"
                  options={fundsPerformanceChart.options}
                  responsiveOptions={fundsPerformanceChart.responsiveOptions}
                  listener={fundsPerformanceChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={this.classes.cardTitle}>Funds Performance</h4>
                <p className={this.classes.cardCategory}>Current vs Expected Yearly Returns</p>
              </CardBody>
              <CardFooter chart>
                <div className={this.classes.stats}>
                  <AccessTime /> Updated 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={this.classes.cardTitleWhite}>Your Portfolio</h4>
                <p className={this.classes.cardCategoryWhite}>
                  Information about funds in you personalised portfolio
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Name", "Amount Invested", "12 Month Return","Total Annual Return","Volatility","E/S/G"]}
                  tableData={[
                    ["ABC", "$36,738", "1%","3%","Low","E"],
                    ["DEF", "$40,738", "6%","2%","Low","ES"],
                    ["GHI", "$3,538", "4%","3%","Medium","ESG"],
                    ["JKL", "$6,332", "1%","1%","Low","EG"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}



export default Dashboard
  
