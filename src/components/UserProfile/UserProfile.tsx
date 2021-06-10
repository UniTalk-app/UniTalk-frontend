import * as React from "react";
import {
    Box,
    Grid,
    makeStyles,
    createStyles,
    Theme,
    Divider,
    Badge,
    Avatar,
    TextField,
    Button,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AvatarService from "../../services/avatar.service";

interface State {
    amount: string;
    confirmPassword: string,
    changePassword: string,
    weight: string;
    weightRange: string;
    showConfirmPassword: boolean,
    showChangePassword: boolean,
  }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            height: theme.spacing(8),
            width:  theme.spacing(8),
        },
        avatarButton: {
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
            },
        },
        margin: {
            margin: "auto"
        },
        width: {
            width: "100%"
        },
        color: {
            color: "#FFFFFF",
        }
    }),
);

type UserProfileProps = {
    avatarURL: string;
    changedAvatar: () => void;
};

const UserProfile : React.FC<UserProfileProps> = (props) => {
    const {avatarURL, changedAvatar } = props;

    const classes = useStyles();
    
    const [values, setValues] = React.useState<State>({
        amount: "",
        confirmPassword: "",
        changePassword: "",
        weight: "",
        weightRange: "",
        showConfirmPassword: false,
        showChangePassword: false,
    });
    
    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleClickShowChangePassword = () => {
        setValues({ ...values, showChangePassword: !values.showChangePassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box p={8}>
            <Grid container spacing={2}>
                <Grid 
                    item
                    xs={12}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Button className={classes.avatarButton} variant="contained" component="label">
                        <input accept=".jpg,.png,.jpeg" onChange={(e) => {
                            (avatarURL=="")?
                                AvatarService.postAvatar(e.target.files, changedAvatar) : AvatarService.putAvatar(e.target.files, changedAvatar);
                        }} type="file" hidden/>
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={<PhotoCameraIcon/>}
                        >                        
                            <Avatar src={avatarURL} className={classes.avatar}>a</Avatar>
                            
                        </Badge>
                    </Button>
                </Grid>
                <Grid item xs={12}> 
                    <Divider/>
                </Grid>
                <Grid item xs={6}>
                    <TextField           
                        className={classes.width}
                        id="outlined-required"
                        label="First name"
                        defaultValue="Rafael"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.width}
                        id="outlined-required"
                        label="Last name"
                        defaultValue="Picasso"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl 
                        className={classes.width} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showChangePassword ? "text" : "password"}
                            value={values.changePassword}
                            onChange={handleChange("changePassword")}
                            endAdornment={
                                <InputAdornment position="end" className={classes.color}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowChangePassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showChangePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Change password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl 
                        className={classes.width} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showConfirmPassword ? "text" : "password"}
                            value={values.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button disabled type="submit" variant="contained" color="primary">
                        save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;
