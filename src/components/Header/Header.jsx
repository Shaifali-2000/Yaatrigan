import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import useStyles from "./styles"
import Lottie from "lottie-react"
import travel from "./travel.json"

const Header = ({ setCoordinates }) => {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => setAutocomplete(autoC)

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({ lat, lng })
    }

    const cursive = {
        "font-family": "'Smooch', cursive",
        "font-size": "4vw",
        "display": "inline-block",
        "up": "2px",
        "position": "absolute"
    };

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <span style={{ whiteSpace: "no-wrap" }}>
                    <Lottie className="lg:m-8 md:m-8 m-6" animationData={travel} style={{ height: "75px", width: "75px", display: "inline-block" }} loop={true} />
                    <a href="https://spheron.infura-ipfs.io/ipfs/QmYjvAzC5uqdA6iXPcQhLadB9BVHsz9veBjXqD1nF9Zktj/">
                        <Typography variant="h5" className={classes.title} style={cursive}>
                            Yaatrigan
                        </Typography>
                    </a>
                </span>

                <Box display="flex">
                    <Typography variant="h6" className="classes.title" >
                        Explore New places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
