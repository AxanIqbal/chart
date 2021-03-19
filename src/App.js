import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Bar, BarChart, Cell, Tooltip, XAxis, YAxis} from "recharts";
import axios from "axios";
import {Card, CardActions, CardContent, CardHeader, Container, IconButton, Paper, Typography} from "@material-ui/core";
import {FaGithub} from "react-icons/all";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: ""
        }
    }

    componentDidMount() {
        const data_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
        axios.get(data_url).then(value => {
            let cord = value.data.data.map(value1 => {
                return ({x: value1[0].split('-')[0], y: value1[1]})
            })
            this.setState({data: cord})
        })
    }


    render() {


        function CustomTooltip({ active, payload, label }) {
            if (active && payload && payload.length) {
                        return (
                            <Paper id={"tooltip"} data-date={label} sx={{
                                padding: 1
                            }}>
                                <Typography variant={"h6"}>{`${label}`}</Typography>
                                <Typography variant={"p"}>{`$${payload[0].value} Billions`}</Typography>
                            </Paper>
                        );
                    }

                    return null;
        }

        return <React.Fragment>
            <CssBaseline/>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100vh"
            }}>
                <Card variant={"outlined"} sx={{
                    maxWidth: "-moz-fit-content",
                }}>
                    <CardHeader id={"title"} title={"United States GDP"} sx={{fontWeight:"bold"}}/>

                    <CardContent>
                        <BarChart width={750} height={500} data={this.state.data}>
                            <XAxis dataKey="x"/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip/>} />
                            <Bar dataKey="y" barSize={2} fill="#8884d8"/>
                        </BarChart>
                    </CardContent>
                    <CardActions sx={{
                        justifyContent: "center",
                    }}>
                        <IconButton href={"https://github.com/AxanIqbal/chart"}>
                            <FaGithub/>
                        </IconButton>
                        <Typography variant={"body2"}>By Ahsan Iqbal</Typography>
                    </CardActions>
                </Card>
            </Container>

        </React.Fragment>
            ;
    }
}

export default App;
